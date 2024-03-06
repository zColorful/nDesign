import { isBoolean, isFunction, isString } from '../../shared/utils';
import { DefaultRow, ITable, RowKeyType } from './table-types';

export function formatWidth(width: number | string): number | string {
  if (width === '') {
    return width;
  }
  if (typeof width === 'number') {
    return width;
  }

  return parseInt(width, 10) || 80;
}

export function getRowIdentity(row: DefaultRow, rowKey: RowKeyType, index?: number): string {
  if (isFunction(rowKey)) {
    return rowKey(row, index) as string;
  } else if (isString(rowKey)) {
    const paths = rowKey.split('.');
    let obj: Record<string, unknown> | string = row;

    for (const p of paths) {
      obj = obj[p];
    }
    return `${obj}`;
  }
  return '';
}

export function getRowKeysMap(data: DefaultRow[], rowKey: RowKeyType): Record<string, { row: DefaultRow; index: number }> {
  const rowKeyMap: Record<string, { row: DefaultRow; index: number }> = {};
  (data || []).forEach((row: DefaultRow, index: number) => {
    rowKeyMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return rowKeyMap;
}

export function toggleRowExpandStatus(rowsArr: DefaultRow[], row: DefaultRow, status?: boolean): boolean {
  let isChanged = false;
  const index = rowsArr.indexOf(row);
  const isIncluded = index !== -1;

  const addRow = () => {
    rowsArr.push(row);
    isChanged = true;
  };
  const deleteRow = () => {
    rowsArr.splice(index, 1);
    isChanged = true;
  };

  if (isBoolean(status)) {
    if (status && !isIncluded) {
      addRow();
    } else if (!status && isIncluded) {
      deleteRow();
    }
  } else {
    if (isIncluded) {
      deleteRow();
    } else {
      addRow();
    }
  }

  return isChanged;
}

// export function toggleRowVisible(expand: boolean, table: ITable<DefaultRow>, key: string): void {
//   console.log(table?.store.states, key);
//   // 不同rowKey所在的层级
//   const rowLevelMap = table?.store.states.rowLevelMap.value || {};
//   //  所有的rowkey
//   const levelKeys = Object.keys(rowLevelMap);
//   //  所有需要隐藏的rowkey
//   const hiddenRowKeys = table?.store.states.hiddenRowKeys;
//   let start = false;
//   // console.log(rowLevelMap, 'rowLevelMap');
//   // console.log(levelKeys, 'levelKeys');
//   // console.log(hiddenRowKeys, 'hiddenRowKeys');
//   // levelKeys[index] rowkey   rowLevelMap[levelKeys[index]] 子节点层级

//   const targetLevel = rowLevelMap[key];
//   for (let index = 0; index < levelKeys.length; index++) {
//     const rowKey = levelKeys[index];
//     const rowLevel = rowLevelMap[rowKey];
//     //  如果是同层级
//     if (!start && rowLevel === targetLevel) {
//       // 如果找到目标，就开始操作
//       start = rowKey === key;
//     }

//     //  数据存放按层级存放
//     if (start) {
//       // 如果下一个的层级等于本节点加1就是子节点
//       const nextRowKey = levelKeys[index + 1];
//       if (nextRowKey && rowLevelMap[nextRowKey] === targetLevel + 1) {
//         console.log('before', [...hiddenRowKeys.value]);
//         // 父子节点
//         if (expand) {
//           hiddenRowKeys.value = hiddenRowKeys.value.filter((rk) => rk !== nextRowKey);
//         } else {
//           if (!hiddenRowKeys.value.includes(nextRowKey)) {
//             hiddenRowKeys.value.push(nextRowKey);
//           }
//         }
//         console.log('fater', [...hiddenRowKeys.value]);
//       }
//     }
//   }
// }

export function toggleRowVisible(expand: boolean, table: ITable<DefaultRow>, key: string): void {
  // console.log(table?.store.states, key, 'dddddd');
  const rowLevelMap = table?.store.states.rowLevelMap.value || {};
  const levelKeys = Object.keys(rowLevelMap);
  const hiddenRowKeys = table?.store.states.hiddenRowKeys;
  let start = false;
  // console.log(rowLevelMap, 'rowLevelMap');
  // console.log(levelKeys, 'levelKeys');
  // console.log(hiddenRowKeys, 'hiddenRowKeys');
  // levelKeys[index] rowkey   rowLevelMap[levelKeys[index]] 子节点层级
  for (let index = 0; index < levelKeys.length; index++) {
    // 同一层级,比较key
    if (rowLevelMap[levelKeys[index]] === rowLevelMap[key]) {
      start = levelKeys[index] === key;
    }
    if (start) {
      if (expand) {
        hiddenRowKeys.value = hiddenRowKeys.value.filter((rowKey) => rowKey !== key);
      } else {
        if (!hiddenRowKeys.value.includes(key)) {
          hiddenRowKeys.value.push(key);
        }
      }
    }
    // 父子节点
  }
}
