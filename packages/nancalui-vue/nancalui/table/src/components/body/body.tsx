import { defineComponent, inject, ref, watchEffect, watch, Ref } from 'vue';
import { TABLE_TOKEN, DefaultRow, ITableInstanceAndDefaultRow } from '../../table-types';
import { Column } from '../column/column-types';
import { CellClickArg, RowClickArg } from './body-types';
import TD from '../body-td/body-td';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useMergeCell, useBodyRender, useLazyLoad } from './use-body';
import './body.scss';

export default defineComponent({
  name: 'NTableBody',
  props: {
    rowHeight: {
      type: Number,
      default: 40,
    },
  },
  setup(props: { rowHeight: number }) {
    const table = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const { flatColumns, flatRows } = table.store.states;
    const ns = useNamespace('table');
    const { tableSpans, removeCells } = useMergeCell();
    const { getTableRowClass } = useBodyRender();
    const { lazy, lazyFlagRef } = useLazyLoad();
    const onCellClick = (cellClickArg: CellClickArg) => {
      table.emit('cell-click', cellClickArg);
    };
    const onRowClick = (rowClickArg: RowClickArg) => {
      if (table.props.highlightCurrentRow) {
        document.getElementById(table.tableId)?.getElementsByClassName('select-row')[0]?.classList.remove('select-row');
        document.getElementById(rowClickArg.id)?.classList.add('select-row');
      }
      table.emit('row-click', rowClickArg);
    };

    // const onCellDbClick = (cellClickArg: CellClickArg) => {
    //   table.emit('cell-dbclick', cellClickArg);
    // };

    const onDblclick = (rowClickArg: RowClickArg) => {
      table.emit('row-dblclick', rowClickArg);
    };
    const offsetY = inject('getScrollTop') as Ref<number>;
    const scrollOffsetY = ref(0);
    const visibleRowStartIndex = ref(0);
    const visibleRowEndIndex = ref(0);

    const rowCount = ref(0);

    watchEffect(() => {
      if (!table.props.virtualized) {
        return;
      }
      scrollOffsetY.value = Math.min(offsetY.value, flatRows.value.length * props.rowHeight);
      const rowHeight = props.rowHeight;
      const scrollTop = scrollOffsetY.value;
      const startIndex = Math.floor(scrollTop / rowHeight);
      const endIndex = startIndex + rowCount.value;

      visibleRowStartIndex.value = startIndex;
      visibleRowEndIndex.value = endIndex;
    });

    watchEffect(() => {
      if (table.tableRef.value) {
        const containerHeight = (table.props.tableHeight && parseFloat(table.props.tableHeight)) || table.tableRef.value.clientHeight || 0;
        rowCount.value = Math.ceil(containerHeight / props.rowHeight);
      }
    });
    const renderTR = (row: DefaultRow, rowIndex: number, id: string) => {
      return (
        <>
          <tr
            key={rowIndex}
            id={id}
            class={getTableRowClass(row)}
            style={{ height: `${props.rowHeight}px` }}
            onClick={() => onRowClick({ row, rowIndex, id })}
            onDblclick={() =>
              onDblclick({
                row,
                id,
              })
            }>
            {flatColumns.value.map((column: Column, columnIndex: number) => {
              const cellId = `${rowIndex}-${columnIndex}`;
              const [rowspan, colspan] = tableSpans.value[cellId] ?? [1, 1];

              if (removeCells.value.includes(cellId)) {
                return null;
              }
              return (
                <TD
                  column={column}
                  index={rowIndex}
                  row={row}
                  rowspan={rowspan}
                  colspan={colspan}
                  class={{
                    // [ns.m('sticky-right')]: column.fixedRight,
                    [ns.m('last-sticky-left')]: column.fixedLeft && !flatColumns.value[columnIndex + 1]?.fixedLeft,
                    [ns.m('first-sticky-right')]: column.fixedRight && !flatColumns.value[columnIndex - 1]?.fixedRight,
                  }}
                  onCellClick={() => onCellClick({ rowIndex, columnIndex, column, row })}
                  // onCellDbClick={() => onCellDbClick({ rowIndex, columnIndex, column, row })}
                />
              );
            })}
          </tr>
          {flatColumns.value.some((column: Column) => column.type === 'expand') && table.store.isRowExpanded(row) && (
            <tr>
              <td colspan={flatColumns.value.length}>
                {flatColumns.value
                  .filter((column: Column) => column.type === 'expand')?.[0]
                  ?.slots?.default?.({
                    row,
                  })}
              </td>
            </tr>
          )}
        </>
      );
    };
    const renderTBODY = () => {
      const renderFlatRows =
        table.props.virtualized === true ? flatRows.value?.slice(visibleRowStartIndex.value, visibleRowEndIndex.value) : flatRows.value;

      return renderFlatRows?.map((row: DefaultRow, rowIndex: number) => {
        const id = Math.random().toString(36).substring(3);
        return renderTR(row, rowIndex, id);
      });
    };

    return () => (
      <tbody class={ns.e('tbody')} id={table.tableId}>
        {table.props.virtualized && <div style={{ height: `${props.rowHeight * visibleRowStartIndex.value}px` }}></div>}
        {renderTBODY()}
        {lazy && <span ref={lazyFlagRef} class={ns.e('lazy__flag')}></span>}
        {table.props.virtualized && (
          <div style={{ height: `${props.rowHeight * (flatRows.value.length - visibleRowEndIndex.value)}px` }}></div>
        )}
      </tbody>
    );
  },
});
