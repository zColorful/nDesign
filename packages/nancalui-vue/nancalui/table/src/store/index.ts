import { watch, Ref, ref, computed, unref } from 'vue';
import type { SetupContext } from 'vue';
import { isBoolean } from '../../../shared/utils';
import type { Column, LevelColumn } from '../components/column/column-types';
import type { DefaultRow, ITable, RowKeyType } from '../table-types';
import type { TableStore } from './store-types';
import { useExpand } from './use-expand';
import { useEditTableCell } from './use-edit-table-cell';
import { getRowIdentity } from '../utils';
import { useSort } from '../composables/use-sort';

function replaceColumn(array: LevelColumn[], column: LevelColumn) {
  return array.map((item) => {
    if (item.id === column.id) {
      return column;
    } else if (item.children?.length) {
      item.children = replaceColumn(item.children, column);
    }
    return item;
  });
}

function doFlattenColumns(columns: LevelColumn[]) {
  const result: LevelColumn[] = [];
  columns.forEach((column: LevelColumn) => {
    if (column.children) {
      // eslint-disable-next-line prefer-spread
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });

  return result;
}

function createColumnGenerator() {
  const _columns: Ref<Column[]> = ref([]);
  const flatColumns: Ref<Column[]> = ref([]);

  const sortColumn = () => {
    _columns.value.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const insertColumn = (column: LevelColumn, parent: LevelColumn) => {
    const array = unref(_columns);
    let newColumns = [];
    if (!parent) {
      array.push(column);
      newColumns = array;
    } else {
      if (parent && !parent.children) {
        parent.children = [];
      }
      parent?.children?.push(column);
      newColumns = replaceColumn(array, parent);
    }
    sortColumn();
    _columns.value = newColumns;
  };

  const removeColumn = (column: Column) => {
    const i = _columns.value.findIndex((v) => v === column);
    if (i === -1) {
      return;
    }
    _columns.value.splice(i, 1);
  };

  const updateColumns = () => {
    flatColumns.value = ([] as LevelColumn[]).concat(doFlattenColumns(_columns.value));
  };

  return {
    _columns,
    flatColumns,
    insertColumn,
    removeColumn,
    sortColumn,
    updateColumns,
  };
}

function doFlattenRows<T extends Record<string, unknown>>(
  dataList: T[],
  level: number,
  rowKey: RowKeyType,
  rowLevelMap: Ref<Record<string, number>>,
  hiddenRowKeys: Ref<string[]>
) {
  const result: T[] = [];
  dataList.forEach((data: T) => {
    result.push(data);
    if (level > 0) {
      const key = getRowIdentity(data as Record<string, unknown>, rowKey);
      rowLevelMap.value[key] = level;
      hiddenRowKeys.value.push(key);
    }
    if ((data as Record<string, unknown>).children) {
      rowLevelMap.value[getRowIdentity(data as Record<string, unknown>, rowKey)] = level;
      // eslint-disable-next-line prefer-spread
      result.push.apply(result, doFlattenRows<T>(data.children as T[], level + 1, rowKey, rowLevelMap, hiddenRowKeys));
    }
  });
  return result;
}
const allFlatRows = ref({}); // 所有加载过的数据
const activePageRows = ref({}); // 当前页面数据
function createRowGenerator<T extends Record<string, unknown>>(
  dataSource: Ref<T[]>,
  rowKey: RowKeyType,
  flatColumns: Ref<Column[]>,
  uid: any
) {
  const flatRows: Ref<T[]> = ref([]);

  const hiddenRowKeys: Ref<string[]> = ref([]);
  const lightRowKey: Ref<string> = ref('');

  const rowLevelMap: Ref<Record<string, number>> = ref({});
  const firstDefaultColumn: Ref<string> = ref('');
  const updatedataSource = (data: []) => {
    dataSource.value = data;
  };
  const setRowHighLight = (key: string)=>{
    lightRowKey.value = key;
  };
  const updateRows = () => {
    // 暂不支持展开行(column的type==expand)和树形表格同时使用，展开行优先级高
    const hasExpand = flatColumns.value.some((column) => column.type === 'expand');
    const result = hasExpand ? dataSource.value : doFlattenRows<T>(dataSource.value, 0, rowKey, rowLevelMap, hiddenRowKeys);
    flatRows.value = ([] as T[]).concat(result);

    // 每次分页拉取数据放历史数据
    if (allFlatRows.value[uid]?.length) {
      const hasRowKeys = allFlatRows.value[uid].map((item) => item[rowKey]);
      result.forEach((item) => {
        if (!hasRowKeys.includes(item[rowKey])) {
          allFlatRows.value[uid].push(item);
        }
      });
      // 通过 new Set排除重复项
      // allFlatRows.value[uid].push(...result);
      // allFlatRows.value[uid] = [...new Set(allFlatRows.value[uid].map((item) => JSON.stringify(item)))].map((i) => JSON.parse(i));
    } else {
      allFlatRows.value[uid] = [];
      allFlatRows.value[uid].push(...result);
    }
    if (activePageRows.value[uid]?.length) {
      activePageRows.value[uid] = result;
    } else {
      activePageRows.value[uid] = result;
    }
  };

  const updateFirstDefaultColumn = () => {
    const index = flatColumns.value.findIndex((column) => column.type === '');
    firstDefaultColumn.value = index !== -1 ? flatColumns.value[index].id : '';
  };

  return {
    updatedataSource,
    flatRows,
    allFlatRows,
    hiddenRowKeys,
    lightRowKey,
    setRowHighLight,
    rowLevelMap,
    updateRows,
    firstDefaultColumn,
    updateFirstDefaultColumn,
  };
}

function createSelection<T extends Record<string, unknown>>(dataSource: Ref<T[]>, rowKey: RowKeyType, uid) {
  const _checkSet: Ref<Set<string>> = ref(new Set());
  const checkRow = (toggle: boolean, row: T, index: number) => {
    const key = getRowIdentity(row as Record<string, unknown>, rowKey, index);
    if (toggle) {
      _checkSet.value.add(key);
    } else {
      _checkSet.value.delete(key);
    }
  };

  const toggleRowSelection = (row: T, checked?: boolean, index?: number) => {
    const key = getRowIdentity(row as Record<string, unknown>, rowKey, index);
    const isIncluded = _checkSet.value.has(key);

    const addRow = () => {
      _checkSet.value.add(key);
    };

    const deleteRow = () => {
      _checkSet.value.delete(key);
    };

    if (isBoolean(checked)) {
      if (checked && !isIncluded) {
        addRow();
      } else if (!checked && isIncluded) {
        deleteRow();
      }
    } else {
      if (isIncluded) {
        deleteRow();
      } else {
        addRow();
      }
    }
  };

  const isRowChecked = (row: T, index: number) => {
    return _checkSet.value.has(getRowIdentity(row as Record<string, unknown>, rowKey, index));
  };

  const getCheckedRows = (): T[] => {
    return allFlatRows.value[uid]?.filter((item, index) => isRowChecked(item, index));
  };
  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      let _index = 0;

      const _dataSource = dataSource.value.filter((item) => {
        return item.disabledThisRow !== true;
      });
      _dataSource.forEach((item, index) => {
        _index++;
        checkRow(val, item, index);
      });
      if (_index > 0) {
        _checkAllRecord.value = val;
      }
    },
  });
  const _halfChecked = ref(false);

  const clearSelection = () => {
    dataSource.value.forEach((item, index) => {
      toggleRowSelection(item, false, index);
      _checkAllRecord.value = false;
      _halfChecked.value = false;
    });
  };

  const setScrollTop = (height: number) => {
    const scrollBody = document.getElementById('scroll-body');
    const scrollHeader = document.getElementById('scroll-header');
    scrollBody &&
      scrollBody.scrollTo({
        top: height,
        behavior: 'smooth', // 平滑滚动
      });
    scrollHeader &&
      scrollHeader.scrollTo({
        top: height,
        behavior: 'smooth', // 平滑滚动
      });
  };

  watch(
    _checkSet,
    (set) => {
      // if (set.size === 0) {
      //   return;
      // }

      let allTrue = true;
      let allFalse = true;

      const items = activePageRows.value[uid] || [];

      for (let i = 0; i < items.length; i++) {
        const checked = isRowChecked(items[i], i);
        allTrue &&= checked;
        allFalse &&= !checked;
      }

      if (!items.length) {
        allTrue = false;
      }
      _checkAllRecord.value = allTrue;

      _halfChecked.value = !(allFalse || allTrue);
    },
    { immediate: true, deep: true }
  );

  watch(dataSource, (value) => {
    _checkAllRecord.value = value.length ? value.findIndex((item, index) => !isRowChecked(item, index)) === -1 : false;
    const hasCheckedData = getCheckedRows(); // 获取已经勾选数据

    if (!_checkAllRecord.value) {
      if (hasCheckedData?.length) {
        _halfChecked.value = true;
      } else {
        _halfChecked.value = false;
      }
    } else {
      _halfChecked.value = false;
    }
  });

  return {
    _checkSet,
    _checkAll,
    _halfChecked,
    getCheckedRows,
    checkRow,
    isRowChecked,
    toggleRowSelection,
    clearSelection,
    setScrollTop,
  };
}

function createFixedLogic(columns: Ref<Column[]>) {
  const isFixedLeft = computed(() => {
    return columns.value.reduce((prev, current) => prev || !!current.fixedLeft, false);
  });

  return { isFixedLeft };
}

/**
 * 创建 TableStore
 * @param dataSource 数据源
 * @param table 表对象
 * @returns TableStore
 */
export function createStore<T extends Record<string, unknown>>(
  dataSource: Ref<T[]>,
  table: ITable<DefaultRow>,
  ctx: SetupContext
): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  const { _columns, flatColumns, insertColumn, removeColumn, sortColumn, updateColumns } = createColumnGenerator();
  const { flatRows, hiddenRowKeys,lightRowKey, rowLevelMap, updateRows, firstDefaultColumn,
    updateFirstDefaultColumn, updatedataSource, setRowHighLight } =
    createRowGenerator<T>(dataSource, table.props.rowKey as RowKeyType, flatColumns, table.uid);

  const { _checkAll, _checkSet, _halfChecked, getCheckedRows, isRowChecked, checkRow, toggleRowSelection, clearSelection, setScrollTop } =
    createSelection<T>(_data, table.props.rowKey as RowKeyType, table.uid);

  const { thList, collectTh, sortData } = useSort(dataSource, flatRows);

  const { isFixedLeft } = createFixedLogic(_columns);
  const { isRowExpanded, updateExpandRows, setExpandRows, toggleRowExpansion } = useExpand(_data, table);

  const { tableCellModeMap, setCellMode, resetCellMode } = useEditTableCell();

  const emitTableEvent = (eventName: string, ...params: unknown[]) => {
    ctx.emit.apply(ctx, [eventName, ...params]);
  };

  watch(
    dataSource,
    (value: T[]) => {
      _data.value = [...value];
      updateExpandRows();
      rowLevelMap.value = {};
      hiddenRowKeys.value = [];
      lightRowKey.value='';
      doFlattenRows(_data.value, 0, table.props.rowKey, rowLevelMap, hiddenRowKeys);
    },
    { deep: true, immediate: true }
  );

  return {
    states: {
      _data,
      flatRows,
      hiddenRowKeys,
      lightRowKey,
      rowLevelMap,
      _columns,
      flatColumns,
      _checkSet,
      _checkAll,
      _halfChecked,
      isFixedLeft,
      thList,
      firstDefaultColumn,
      tableCellModeMap,
    },
    insertColumn,
    sortColumn,
    removeColumn,
    updateColumns,
    updateRows,
    updatedataSource,
    setRowHighLight,
    getCheckedRows,
    collectTh,
    sortData,
    isRowChecked,
    checkRow,
    isRowExpanded,
    setExpandRows,
    toggleRowExpansion,
    toggleRowSelection,
    clearSelection,
    setScrollTop,
    updateFirstDefaultColumn,
    setCellMode,
    resetCellMode,
    emitTableEvent,
  };
}
