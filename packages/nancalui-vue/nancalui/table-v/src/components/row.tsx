import { computed, defineComponent, inject, nextTick, onMounted, ref, unref } from 'vue';
import { isNumber } from 'lodash';
import { tableV2RowProps } from '../row';
import { TableV2InjectionKey } from '../tokens';
import { placeholderSign } from '../private';

import type { CSSProperties, RendererElement, RendererNode, VNode } from 'vue';
import type { RowEventHandlers, TableV2RowProps } from '../row';

const isFunction = (value: unknown) => {
  return Object.prototype.toString.call(value) === '[object Function]';
};

type CustomizedCellsType = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any;
  }
>[];

type DefaultCellsType = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any;
  }
>[][];

type ColumnCellsType = DefaultCellsType | CustomizedCellsType;

const useTableRow = (props: TableV2RowProps) => {
  const { isScrolling } = inject(TableV2InjectionKey)!;

  const measured = ref(false);
  const rowRef = ref<HTMLElement>();
  const measurable = computed(() => {
    return isNumber(props.estimatedRowHeight) && props.rowIndex >= 0;
  });

  const doMeasure = (isInit = false) => {
    const $rowRef = unref(rowRef);
    if (!$rowRef) {
      return;
    }
    const { columns, onRowHeightChange, rowKey, rowIndex, style } = props;
    const { height } = $rowRef.getBoundingClientRect();
    measured.value = true;

    nextTick(() => {
      if (isInit || height !== Number.parseInt(style?.height as string)) {
        const firstColumn = columns[0];
        const isPlaceholder = firstColumn?.placeholderSign === placeholderSign;
        onRowHeightChange?.({ rowKey, height, rowIndex }, firstColumn && !isPlaceholder && firstColumn.fixed);
      }
    });
  };

  const eventHandlers = computed(() => {
    const { rowData, rowIndex, rowKey, onRowHover } = props;
    const handlers = props.rowEventHandlers || ({} as RowEventHandlers);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const eventHandlersItem = {} as {
      [key in keyof RowEventHandlers]: (e: Event) => void;
    };

    Object.entries(handlers).forEach(([eventName, handler]) => {
      if (isFunction(handler)) {
        eventHandlersItem[eventName as keyof RowEventHandlers] = (event: Event) => {
          handler({
            event,
            rowData,
            rowIndex,
            rowKey,
          });
        };
      }
    });

    if (onRowHover) {
      (
        [
          { name: 'onMouseleave', hovered: false },
          { name: 'onMouseenter', hovered: true },
        ] as const
      ).forEach(({ name, hovered }) => {
        const existedHandler = eventHandlersItem[name];
        eventHandlersItem[name] = ((event: MouseEvent) => {
          onRowHover({
            event,
            hovered,
            rowData,
            rowIndex,
            rowKey,
          });

          existedHandler?.(event);
        }) as any;
      });
    }
    return eventHandlersItem;
  });

  const onExpand = (expanded: boolean) => {
    const { onRowExpand, rowData, rowIndex, rowKey } = props;

    onRowExpand?.({
      expanded,
      rowData,
      rowIndex,
      rowKey,
    });
  };

  onMounted(() => {
    if (unref(measurable)) {
      doMeasure(true);
    }
  });

  return { isScrolling, measurable, measured, rowRef, eventHandlers, onExpand };
};

const COMPONENT_NAME = 'ElTableV2TableRow';

const TableV2Row = defineComponent({
  name: COMPONENT_NAME,
  props: tableV2RowProps,
  setup(props, { expose, slots, attrs }) {
    const {
      eventHandlers,
      isScrolling,
      measurable,
      measured,
      rowRef,

      onExpand,
    } = useTableRow(props);

    expose({
      /**
       * @description manually dispatching expand action on row.
       */
      onExpand,
    });

    return () => {
      const { columns, columnsStyles, expandColumnKey, depth, rowData, rowIndex, style } = props;

      let ColumnCells: ColumnCellsType = columns.map((column: { key: string | number }, columnIndex: any) => {
        const expandable = Array.isArray(rowData.children) && rowData.children.length > 0 && column.key === expandColumnKey;

        return slots.cell?.({
          column,
          columns,
          columnIndex,
          depth,
          style: columnsStyles[column.key],
          rowData,
          rowIndex,
          isScrolling: unref(isScrolling),
          expandIconProps: expandable
            ? {
              rowData,
              rowIndex,
              onExpand,
            }
            : undefined,
        });
      });

      if (slots.row) {
        ColumnCells = slots.row({
          cells: ColumnCells.map((node) => {
            if (Array.isArray(node) && node.length === 1) {
              return node[0];
            }
            return node;
          }),
          style,
          columns,
          depth,
          rowData,
          rowIndex,
          isScrolling: unref(isScrolling),
        });
      }

      if (unref(measurable)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { height, ...exceptHeightStyle } = style || {};
        const _measured = unref(measured);
        return (
          <div
            ref={rowRef}
            class={props.class}
            style={_measured ? style : exceptHeightStyle}
            role="row"
            {...attrs}
            {...unref(eventHandlers)}>
            {ColumnCells}
          </div>
        );
      }

      return (
        <div {...attrs} ref={rowRef} class={props.class} style={style} role="row" {...unref(eventHandlers)}>
          {ColumnCells}
        </div>
      );
    };
  },
});

export default TableV2Row;

export type TableV2RowCellRenderParam = {
  column: TableV2RowProps['columns'][number];
  columns: TableV2RowProps['columns'];
  columnIndex: number;
  depth: number;
  style: CSSProperties;
  rowData: any;
  rowIndex: number;
  isScrolling: boolean;
  expandIconProps?: {
    rowData: any;
    rowIndex: number;
    onExpand: (expand: boolean) => void;
  };
};
