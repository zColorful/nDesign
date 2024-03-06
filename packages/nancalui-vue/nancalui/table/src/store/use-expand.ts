import { getCurrentInstance, ref } from 'vue';
import type { Ref } from 'vue';
import { DefaultRow, ITable } from '../table-types';
import { UseExpand } from './store-types';
import { getRowIdentity, getRowKeysMap, toggleRowExpandStatus, toggleRowVisible } from '../utils';

export function useExpand(dataSource: Ref<DefaultRow[]>, table: ITable<DefaultRow>): UseExpand {
  const tableInstance = getCurrentInstance() as ITable<DefaultRow>;
  const rowKey = tableInstance.props.rowKey || '';
  const defaultExpandAll = ref(tableInstance.props.defaultExpandAll);
  const _expandedRows: Ref<DefaultRow[]> = ref([]);

  const updateExpandRows = () => {
    if (defaultExpandAll.value) {
      _expandedRows.value = dataSource.value.slice();
    } else {
      _expandedRows.value = [];
    }
  };

  const setExpandRows = (rowKeys: string[]) => {
    const data = dataSource.value || [];
    const rowKeysMap = getRowKeysMap(data, rowKey);
    _expandedRows.value = rowKeys.reduce((pre: DefaultRow[], cur: string) => {
      const currentRow = rowKeysMap[cur];
      if (currentRow) {
        pre.push(currentRow.row);
      }
      return pre;
    }, []);
  };

  const isRowExpanded = (row: DefaultRow): boolean => {
    return _expandedRows.value.includes(row);
  };

  const doToggleRowVisible = (expand: boolean, row: DefaultRow, count = 0) => {
    // console.log(expand, isRowExpanded(row), 'isRowExpanded(row)');
    const key = getRowIdentity(row, rowKey);
    if (expand && count > 0) {
      toggleRowVisible(true, table, key);
    } else if (!expand && count > 0) {
      toggleRowVisible(false, table, key);
      if (row.children) {
        toggleRowExpansion(row, false);
      }
    }
    if ((row.children?.length && count === 0) || (row.children?.length && !expand)) {
      count++;
      row.children.forEach((child: DefaultRow) => {
        doToggleRowVisible(Boolean(expand), child, count);
      });
    }
  };

  const toggleRowExpansion = (row: DefaultRow, expanded?: boolean) => {
    const isChanged = toggleRowExpandStatus(_expandedRows.value, row, expanded);
    if (isChanged) {
      tableInstance.emit('expand-change', row, _expandedRows.value.slice());
    }
    // 暂不支持展开行(column的type==expand)和树形表格同时使用，展开行优先级高
    if (!table.store.states.flatColumns.value.some((column) => column.type === 'expand')) {
      console.log(isRowExpanded(row));
      doToggleRowVisible(isRowExpanded(row), row);
    }
  };

  return {
    isRowExpanded,
    updateExpandRows,
    setExpandRows,
    toggleRowExpansion,
  };
}
