import { computed, unref } from 'vue';
import { isNumber, isString } from 'lodash';
import { enforceUnit, sum } from '../utils';

const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) {
    return '';
  }
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  // debugWarn(SCOPE, 'binding value must be a string or number');
}

import type { CSSProperties } from 'vue';
import type { TableV2Props } from '../table';
import type { UseColumnsReturn } from './use-columns';
import type { UseDataReturn } from './use-data';

type UseStyleProps = {
  columnsTotalWidth: UseColumnsReturn['columnsTotalWidth'];
  data: UseDataReturn['data'];
  fixedColumnsOnLeft: UseColumnsReturn['fixedColumnsOnLeft'];
  fixedColumnsOnRight: UseColumnsReturn['fixedColumnsOnRight'];
};

export const useStyles = (props: TableV2Props, { columnsTotalWidth, data, fixedColumnsOnLeft, fixedColumnsOnRight }: UseStyleProps) => {
  const bodyWidth = computed(() => {
    const { fixed, width, vScrollbarSize } = props;
    const ret = width - vScrollbarSize;
    return fixed ? Math.max(Math.round(unref(columnsTotalWidth)), ret) : ret;
  });
  const headerHeight = computed(() => sum(props.headerHeight));

  const headerWidth = computed(() => unref(bodyWidth) + (props.fixed ? props.vScrollbarSize : 0));

  const fixedRowsHeight = computed(() => {
    return (props.fixedData?.length || 0) * props.rowHeight;
  });

  const rowsHeight = computed(() => {
    const { rowHeight, estimatedRowHeight } = props;
    const _data = unref(data);
    if (isNumber(estimatedRowHeight)) {
      return _data?.length * estimatedRowHeight;
    }

    return _data?.length * rowHeight;
  });

  const mainTableHeight = computed(() => {
    const { height = 0, maxHeight = 0, footerHeight, hScrollbarSize } = props;

    if (maxHeight > 0) {
      const _fixedRowsHeight = unref(fixedRowsHeight);
      const _rowsHeight = unref(rowsHeight);
      const _headerHeight = unref(headerHeight);
      const total = _headerHeight + _fixedRowsHeight + _rowsHeight + hScrollbarSize;

      return Math.min(total, maxHeight - footerHeight);
    }

    return height - footerHeight;
  });

  const fixedTableHeight = computed(() => {
    const { maxHeight } = props;
    const tableHeight = unref(mainTableHeight);
    if (isNumber(maxHeight) && maxHeight > 0) {
      return tableHeight;
    }

    const totalHeight = unref(rowsHeight) + unref(headerHeight) + unref(fixedRowsHeight);

    return Math.min(tableHeight, totalHeight);
  });

  const mapColumn = (column: TableV2Props['columns'][number]) => column.width;

  const leftTableWidth = computed(() => sum(unref(fixedColumnsOnLeft).map(mapColumn)));

  const rightTableWidth = computed(() => sum(unref(fixedColumnsOnRight).map(mapColumn)));

  const windowHeight = computed(() => {
    return unref(mainTableHeight) - unref(headerHeight) - unref(fixedRowsHeight);
  });

  const rootStyle = computed<CSSProperties>(() => {
    const { style = {}, height, width } = props;
    return enforceUnit({
      ...style,
      height,
      width,
    });
  });

  const footerHeight = computed(() => enforceUnit({ height: props.footerHeight }));

  const emptyStyle = computed<CSSProperties>(() => ({
    top: addUnit(unref(headerHeight)),
    bottom: addUnit(props.footerHeight),
    width: addUnit(props.width),
  }));

  return {
    bodyWidth,
    fixedTableHeight,
    mainTableHeight,
    leftTableWidth,
    rightTableWidth,
    headerWidth,
    rowsHeight,
    windowHeight,
    footerHeight,
    emptyStyle,
    rootStyle,
    headerHeight,
  };
};

export type UseStyleReturn = ReturnType<typeof useStyles>;
