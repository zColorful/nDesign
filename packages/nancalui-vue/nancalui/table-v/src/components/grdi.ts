import { isFunction } from '@vue/shared';
import { isNumber, isUndefined } from 'lodash';
import { throwError } from './error';
import createGrid from '../builders/build-grid';

const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
const SCOPE = 'ElDynamicSizeGrid';
// generates cache access key via type
const ACCESS_LAST_VISITED_KEY_MAP = {
  column: 'lastVisitedColumnIndex',
  row: 'lastVisitedRowIndex',
};
// generates props access key via type
const ACCESS_SIZER_KEY_MAP = {
  column: 'columnWidth',
  row: 'rowHeight',
};

const { min, max, floor } = Math;

export const AUTO_ALIGNMENT = 'auto';
export const SMART_ALIGNMENT = 'smart';
export const START_ALIGNMENT = 'start';
export const CENTERED_ALIGNMENT = 'center';
export const END_ALIGNMENT = 'end';

const getItemFromCache = (props: any, index: number, gridCache: any, type: any) => {
  const [cachedItems, sizer, lastVisited] = [
    gridCache[type],
    props[ACCESS_SIZER_KEY_MAP[type]],
    gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]],
  ] as [Record<string, any>, any, number];

  if (index > lastVisited) {
    let offset = 0;
    if (lastVisited >= 0) {
      const item = cachedItems[lastVisited];
      offset = item.offset + item.size;
    }

    for (let i = lastVisited + 1; i <= index; i++) {
      // console.log(i, sizer(i))
      const size = sizer(i);

      cachedItems[i] = {
        offset,
        size,
      };

      offset += size;
    }

    gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]] = index;
  }

  return cachedItems[index];
};

const bs = (props: any, gridCache: any, low: number, high: number, offset: number, type: any) => {
  while (low <= high) {
    const mid = low + floor((high - low) / 2);
    const currentOffset = getItemFromCache(props, mid, gridCache, type).offset;

    if (currentOffset === offset) {
      return mid;
    } else if (currentOffset < offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return max(0, low - 1);
};

const es = (props: any, gridCache: any, idx: number, offset: number, type: any) => {
  const total = type === 'column' ? props.totalColumn : props.totalRow;
  let exponent = 1;

  while (idx < total && getItemFromCache(props, idx, gridCache, type).offset < offset) {
    idx += exponent;
    exponent *= 2;
  }

  return bs(props, gridCache, floor(idx / 2), min(idx, total - 1), offset, type);
};

const findItem = (props: any, gridCache: any, offset: number, type: any) => {
  const [cache, lastVisitedIndex] = [gridCache[type], gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]] as [Record<string, any>, number];

  const lastVisitedItemOffset = lastVisitedIndex > 0 ? cache[lastVisitedIndex].offset : 0;

  if (lastVisitedItemOffset >= offset) {
    return bs(props, gridCache, 0, lastVisitedIndex, offset, type);
  }

  return es(props, gridCache, max(0, lastVisitedIndex), offset, type);
};

const getEstimatedTotalHeight = ({ totalRow }: any, { estimatedRowHeight, lastVisitedRowIndex, row }: GridCache) => {
  let sizeOfVisitedRows = 0;

  if (lastVisitedRowIndex >= totalRow) {
    lastVisitedRowIndex = totalRow - 1;
  }

  if (lastVisitedRowIndex >= 0) {
    const item = row[lastVisitedRowIndex];
    sizeOfVisitedRows = item.offset + item.size;
  }

  const unvisitedItems = totalRow - lastVisitedRowIndex - 1;
  const sizeOfUnvisitedItems = unvisitedItems * estimatedRowHeight;

  return sizeOfVisitedRows + sizeOfUnvisitedItems;
};
const getEstimatedTotalWidth = ({ totalColumn }: any, { column, estimatedColumnWidth, lastVisitedColumnIndex }: any) => {
  let sizeOfVisitedColumns = 0;

  if (lastVisitedColumnIndex > totalColumn) {
    lastVisitedColumnIndex = totalColumn - 1;
  }

  if (lastVisitedColumnIndex >= 0) {
    const item = column[lastVisitedColumnIndex];
    sizeOfVisitedColumns = item.offset + item.size;
  }

  const unvisitedItems = totalColumn - lastVisitedColumnIndex - 1;
  const sizeOfUnvisitedItems = unvisitedItems * estimatedColumnWidth;

  return sizeOfVisitedColumns + sizeOfUnvisitedItems;
};

const ACCESS_ESTIMATED_SIZE_KEY_MAP = {
  column: getEstimatedTotalWidth,
  row: getEstimatedTotalHeight,
};

const getOffset = (props: any, index: number, alignment: any, scrollOffset: number, cache: any, type: any, scrollBarWidth: number) => {
  const [size, estimatedSizeAssociates] = [type === 'row' ? props.height : props.width, ACCESS_ESTIMATED_SIZE_KEY_MAP[type]] as [
    number,
    (props: any, cache: any) => number
  ];
  const item = getItemFromCache(props, index, cache, type);

  const estimatedSize = estimatedSizeAssociates(props, cache);

  const maxOffset = max(0, min(estimatedSize - size, item.offset));
  const minOffset = max(0, item.offset - size + scrollBarWidth + item.size);

  if (alignment === SMART_ALIGNMENT) {
    if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
      alignment = AUTO_ALIGNMENT;
    } else {
      alignment = CENTERED_ALIGNMENT;
    }
  }

  switch (alignment) {
  case START_ALIGNMENT: {
    return maxOffset;
  }
  case END_ALIGNMENT: {
    return minOffset;
  }
  case CENTERED_ALIGNMENT: {
    return Math.round(minOffset + (maxOffset - minOffset) / 2);
  }
  case AUTO_ALIGNMENT:
  default: {
    if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
      return scrollOffset;
    } else if (minOffset > maxOffset) {
      return minOffset;
    } else if (scrollOffset < minOffset) {
      return minOffset;
    } else {
      return maxOffset;
    }
  }
  }
};

const DynamicSizeGrid = createGrid({
  name: 'ElDynamicSizeGrid',
  getColumnPosition: (props: any, idx: any, cache: any) => {
    const item = getItemFromCache(props, idx, cache, 'column');
    return [item.size, item.offset];
  },

  getRowPosition: (props: any, idx: number, cache: any) => {
    const item = getItemFromCache(props, idx, cache, 'row');
    return [item.size, item.offset];
  },

  getColumnOffset: (props: any, columnIndex: any, alignment: any, scrollLeft: any, cache: any, scrollBarWidth: any) =>
    getOffset(props, columnIndex, alignment, scrollLeft, cache, 'column', scrollBarWidth),

  getRowOffset: (props: any, rowIndex: number, alignment: any, scrollTop: number, cache: any, scrollBarWidth: number) =>
    getOffset(props, rowIndex, alignment, scrollTop, cache, 'row', scrollBarWidth),

  getColumnStartIndexForOffset: (props: any, scrollLeft: any, cache: any) => findItem(props, cache, scrollLeft, 'column'),

  getColumnStopIndexForStartIndex: (props: { width: number; totalColumn: number }, startIndex: number, scrollLeft: number, cache: any) => {
    const item = getItemFromCache(props, startIndex, cache, 'column');

    const maxOffset = scrollLeft + (props.width as number);

    let offset = item.offset + item.size;
    let stopIndex = startIndex;
    while (stopIndex < props.totalColumn - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemFromCache(props, startIndex, cache, 'column').size;
    }
    return stopIndex;
  },

  getEstimatedTotalHeight,
  getEstimatedTotalWidth,

  getRowStartIndexForOffset: (props: any, scrollTop: number, cache: any) => findItem(props, cache, scrollTop, 'row'),

  getRowStopIndexForStartIndex: (props: { totalRow: any; height: any }, startIndex: number, scrollTop: number, cache: any) => {
    const { totalRow, height } = props;
    const item = getItemFromCache(props, startIndex, cache, 'row');
    const maxOffset = scrollTop + (height as number);

    let offset = item.size + item.offset;
    let stopIndex = startIndex;

    while (stopIndex < totalRow - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemFromCache(props, stopIndex, cache, 'row').size;
    }

    return stopIndex;
  },
  injectToInstance: (instance: any, cache: any) => {
    const resetAfter = ({ columnIndex, rowIndex }: any, forceUpdate?: boolean) => {
      forceUpdate = isUndefined(forceUpdate) ? true : forceUpdate;

      if (isNumber(columnIndex)) {
        cache.value.lastVisitedColumnIndex = Math.min(cache.value.lastVisitedColumnIndex, columnIndex - 1);
      }

      if (isNumber(rowIndex)) {
        // console.log(rowIndex)
        cache.value.lastVisitedRowIndex = Math.min(cache.value.lastVisitedRowIndex, rowIndex - 1);
      }

      instance.exposed?.getItemStyleCache.value(-1, null, null);

      if (forceUpdate) {
        instance.proxy?.$forceUpdate();
      }
    };

    const resetAfterColumnIndex = (columnIndex: number, forceUpdate: boolean) => {
      resetAfter(
        {
          columnIndex,
        },
        forceUpdate
      );
    };

    const resetAfterRowIndex = (rowIndex: number, forceUpdate: boolean) => {
      resetAfter(
        {
          rowIndex,
        },
        forceUpdate
      );
    };

    Object.assign(instance.proxy, {
      resetAfterColumnIndex,
      resetAfterRowIndex,
      resetAfter,
    });
  },
  initCache: ({ estimatedColumnWidth = DEFAULT_DYNAMIC_LIST_ITEM_SIZE, estimatedRowHeight = DEFAULT_DYNAMIC_LIST_ITEM_SIZE }) => {
    const cache = {
      column: {},
      estimatedColumnWidth,
      estimatedRowHeight,
      lastVisitedColumnIndex: -1,
      lastVisitedRowIndex: -1,
      row: {},
    } as any;

    // TODO: expose methods.
    return cache;
  },

  clearCache: false,

  validateProps: ({ columnWidth, rowHeight }: any) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isFunction(columnWidth)) {
        throwError(
          SCOPE,
          `
            "columnWidth" must be passed as function,
              instead ${typeof columnWidth} was given.
          `
        );
      }

      if (!isFunction(rowHeight)) {
        throwError(
          SCOPE,
          `
            "rowHeight" must be passed as function,
              instead ${typeof rowHeight} was given.
          `
        );
      }
    }
  },
});

export default DynamicSizeGrid;
