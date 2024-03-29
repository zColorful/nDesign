import { defineComponent, toRefs, inject } from 'vue';
import type { SetupContext } from 'vue';
import { bodyTdProps, BodyTdProps } from './body-td-types';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../../table-types';
import { Tooltip } from '../../../../tooltip';
import { useFixedColumn } from '../../composables/use-table';
import { useBodyTd } from './use-body-td';

export default defineComponent({
  name: 'NTableBodyTd',
  inheritAttrs: false,
  props: bodyTdProps,
  emits: ['cellClick', 'cellDbClick'],
  setup(props: BodyTdProps, ctx: SetupContext) {
    const { column, rowspan, colspan } = toRefs(props);
    const table = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const { stickyClass, stickyStyle } = useFixedColumn(column);
    const { tdRef, isShowTooltip, tooltipContent, cellMode, onCellClick } = useBodyTd(props, ctx);

    const dbClick = (data: any) => {
      // console.log(data);
      // ctx.emit('cellDbClick');
    };
    return () => {
      return (
        <Tooltip content={tooltipContent.value} disabled={isShowTooltip.value ? !tooltipContent.value : true}>
          <td
            ref={tdRef}
            class={[stickyClass.value, column.value.cellClass]}
            style={stickyStyle.value}
            {...ctx.attrs}
            rowspan={rowspan?.value}
            colspan={colspan?.value}
            onClick={onCellClick}
            onDblclick={dbClick}>
            {props.column.renderCell?.(props.row, props.column, table.store, props.index, table.props, cellMode)}
          </td>
        </Tooltip>
      );
    };
  },
});
