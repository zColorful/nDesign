import { computed, defineComponent, getCurrentInstance, h, nextTick, onMounted, ref, resolveDynamicComponent, unref } from 'vue';
import { hasOwn } from '@vue/shared';
import { isClient } from '@vueuse/core';
import { isNumber, isString, memoize } from 'lodash';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import Scrollbar, { cAF, rAF } from '../components/scrollbar';
import { virtualizedGridProps } from '../props';
import {
  AUTO_ALIGNMENT,
  BACKWARD,
  FORWARD,
  ITEM_RENDER_EVT,
  RTL,
  RTL_OFFSET_NAG,
  RTL_OFFSET_POS_ASC,
  RTL_OFFSET_POS_DESC,
  SCROLL_EVT,
} from '../defaults';
import type { CSSProperties, Ref, StyleValue, UnwrapRef, VNode, VNodeChild } from 'vue';
import memoOne from 'memoize-one';

export const useCache = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const props = vm.proxy!.$props as any;

  return computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _getItemStyleCache = (_: any, __: any, ___: any) => ({});
    return props.perfMode ? memoize(_getItemStyleCache) : memoOne(_getItemStyleCache);
  });
};

const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }: any, onWheelDelta: any) => {
  let frameHandle: number | null = null;
  let xOffset = 0;
  let yOffset = 0;

  const hasReachedEdge = (x: number, y: number) => {
    const xEdgeReached = (x <= 0 && atXStartEdge.value) || (x >= 0 && atXEndEdge.value);
    const yEdgeReached = (y <= 0 && atYStartEdge.value) || (y >= 0 && atYEndEdge.value);
    return xEdgeReached && yEdgeReached;
  };

  const onWheel = (e: WheelEvent) => {
    cAF(frameHandle!);

    let x = e.deltaX;
    let y = e.deltaY;
    // Simulate native behavior when using touch pad/track pad for wheeling.
    if (Math.abs(x) > Math.abs(y)) {
      y = 0;
    } else {
      x = 0;
    }

    // Special case for windows machine with shift key + wheel scrolling
    if (e.shiftKey && y !== 0) {
      x = y;
      y = 0;
    }

    if (hasReachedEdge(xOffset, yOffset) && hasReachedEdge(xOffset + x, yOffset + y)) {
      return;
    }

    xOffset += x;
    yOffset += y;

    e.preventDefault();

    frameHandle = rAF(() => {
      onWheelDelta(xOffset, yOffset);
      xOffset = 0;
      yOffset = 0;
    });
  };

  return {
    hasReachedEdge,
    onWheel,
  };
};

const getScrollDir = (prev: number, cur: number) => (prev < cur ? FORWARD : BACKWARD);

const isRTL = (dir: any) => dir === RTL;

let cachedRTLResult: any | null = null;
function getRTLOffsetType(recalculate = false): any {
  if (cachedRTLResult === null || recalculate) {
    const outerDiv = document.createElement('div');
    const outerStyle = outerDiv.style;
    outerStyle.width = '50px';
    outerStyle.height = '50px';
    outerStyle.overflow = 'scroll';
    outerStyle.direction = 'rtl';

    const innerDiv = document.createElement('div');
    const innerStyle = innerDiv.style;
    innerStyle.width = '100px';
    innerStyle.height = '100px';

    outerDiv.appendChild(innerDiv);

    document.body.appendChild(outerDiv);

    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = RTL_OFFSET_POS_DESC;
    } else {
      outerDiv.scrollLeft = 1;
      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = RTL_OFFSET_NAG;
      } else {
        cachedRTLResult = RTL_OFFSET_POS_ASC;
      }
    }

    document.body.removeChild(outerDiv);

    return cachedRTLResult;
  }

  return cachedRTLResult;
}

let scrollBarWidth: number;
export const getScrollBarWidth = (namespace: string): number => {
  if (!isClient) {
    return 0;
  }
  if (scrollBarWidth !== undefined) {
    return scrollBarWidth;
  }

  const outer = document.createElement('div');
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createGrid = ({
  name,
  clearCache,
  getColumnPosition,
  getColumnStartIndexForOffset,
  getColumnStopIndexForStartIndex,
  getEstimatedTotalHeight,
  getEstimatedTotalWidth,
  getColumnOffset,
  getRowOffset,
  getRowPosition,
  getRowStartIndexForOffset,
  getRowStopIndexForStartIndex,

  initCache,
  injectToInstance,
  validateProps,
}: any) => {
  return defineComponent({
    name: name ?? 'ElVirtualList',
    props: virtualizedGridProps,
    emits: [ITEM_RENDER_EVT, SCROLL_EVT],
    setup(props, { emit, expose, slots }) {
      const ns = useNamespace('vl');

      validateProps(props);
      const instance = getCurrentInstance()!;
      const cache = ref(initCache(props, instance));
      injectToInstance?.(instance, cache);
      // refs
      // here windowRef and innerRef can be type of HTMLElement
      // or user defined component type, depends on the type passed
      // by user
      const windowRef = ref<HTMLElement>();
      const hScrollbar = ref<any>();
      const vScrollbar = ref<any>();
      // innerRef is the actual container element which contains all the elements
      const innerRef = ref(null);
      const states = ref({
        isScrolling: false,
        scrollLeft: isNumber(props.initScrollLeft) ? props.initScrollLeft : 0,
        scrollTop: isNumber(props.initScrollTop) ? props.initScrollTop : 0,
        updateRequested: false,
        xAxisScrollDir: FORWARD,
        yAxisScrollDir: FORWARD,
      });

      const getItemStyleCache = useCache();

      // computed
      const parsedHeight = computed(() => Number.parseInt(`${props.height}`, 10));
      const parsedWidth = computed(() => Number.parseInt(`${props.width}`, 10));
      const columnsToRender = computed(() => {
        const { totalColumn, totalRow, columnCache } = props;
        const { isScrolling, xAxisScrollDir, scrollLeft } = unref(states);

        if (totalColumn === 0 || totalRow === 0) {
          return [0, 0, 0, 0];
        }

        const startIndex = getColumnStartIndexForOffset(props, scrollLeft, unref(cache));
        const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, unref(cache));

        const cacheBackward = !isScrolling || xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
        const cacheForward = !isScrolling || xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;

        return [
          Math.max(0, startIndex - cacheBackward),
          Math.max(0, Math.min(totalColumn! - 1, stopIndex + cacheForward)),
          startIndex,
          stopIndex,
        ];
      });

      const rowsToRender = computed(() => {
        const { totalColumn, totalRow, rowCache } = props;
        const { isScrolling, yAxisScrollDir, scrollTop } = unref(states);

        if (totalColumn === 0 || totalRow === 0) {
          return [0, 0, 0, 0];
        }

        const startIndex = getRowStartIndexForOffset(props, scrollTop, unref(cache));
        const stopIndex = getRowStopIndexForStartIndex(props, startIndex, scrollTop, unref(cache));

        const cacheBackward = !isScrolling || yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
        const cacheForward = !isScrolling || yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;

        return [
          Math.max(0, startIndex - cacheBackward),
          Math.max(0, Math.min(totalRow! - 1, stopIndex + cacheForward)),
          startIndex,
          stopIndex,
        ];
      });

      const estimatedTotalHeight = computed(() => getEstimatedTotalHeight(props, unref(cache)));
      const estimatedTotalWidth = computed(() => getEstimatedTotalWidth(props, unref(cache)));

      const windowStyle = computed<StyleValue>(() => [
        {
          position: 'relative',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
        },
        {
          direction: props.direction,
          height: isNumber(props.height) ? `${props.height}px` : props.height,
          width: isNumber(props.width) ? `${props.width}px` : props.width,
        },
        props.style ?? {},
      ]);

      const innerStyle = computed(() => {
        const width = `${unref(estimatedTotalWidth)}px`;
        const height = `${unref(estimatedTotalHeight)}px`;

        return {
          height,
          pointerEvents: unref(states).isScrolling ? 'none' : undefined,
          width,
        };
      });

      // methods
      const emitEvents = () => {
        const { totalColumn, totalRow } = props;

        if (totalColumn! > 0 && totalRow! > 0) {
          const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = unref(columnsToRender);
          const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = unref(rowsToRender);
          // emit the render item event with
          // [xAxisInvisibleStart, xAxisInvisibleEnd, xAxisVisibleStart, xAxisVisibleEnd]
          // [yAxisInvisibleStart, yAxisInvisibleEnd, yAxisVisibleStart, yAxisVisibleEnd]
          emit(ITEM_RENDER_EVT, {
            columnCacheStart,
            columnCacheEnd,
            rowCacheStart,
            rowCacheEnd,
            columnVisibleStart,
            columnVisibleEnd,
            rowVisibleStart,
            rowVisibleEnd,
          });
        }

        const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = unref(states);
        emit(SCROLL_EVT, {
          xAxisScrollDir,
          scrollLeft,
          yAxisScrollDir,
          scrollTop,
          updateRequested,
        });
      };

      const onScroll = (e: Event) => {
        const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget as HTMLElement;

        const _states = unref(states);

        if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) {
          return;
        }

        let _scrollLeft = scrollLeft;

        if (isRTL(props.direction)) {
          switch (getRTLOffsetType()) {
          case RTL_OFFSET_NAG:
            _scrollLeft = -scrollLeft;
            break;
          case RTL_OFFSET_POS_DESC:
            _scrollLeft = scrollWidth - clientWidth - scrollLeft;
            break;
          }
        }

        states.value = {
          ..._states,
          isScrolling: true,
          scrollLeft: _scrollLeft,
          scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
          updateRequested: true,
          xAxisScrollDir: getScrollDir(_states.scrollLeft, _scrollLeft),
          yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop),
        };

        nextTick(() => resetIsScrolling());

        onUpdated();
        emitEvents();
      };

      const onVerticalScroll = (distance: number, totalSteps: number) => {
        const height = unref(parsedHeight);
        const offset = ((estimatedTotalHeight.value - height) / totalSteps) * distance;
        scrollTo({
          scrollTop: Math.min(estimatedTotalHeight.value - height, offset),
        });
      };

      const onHorizontalScroll = (distance: number, totalSteps: number) => {
        const width = unref(parsedWidth);
        const offset = ((estimatedTotalWidth.value - width) / totalSteps) * distance;
        scrollTo({
          scrollLeft: Math.min(estimatedTotalWidth.value - width, offset),
        });
      };

      const { onWheel } = useGridWheel(
        {
          atXStartEdge: computed(() => states.value.scrollLeft <= 0),
          atXEndEdge: computed(() => states.value.scrollLeft >= estimatedTotalWidth.value - unref(parsedWidth)),
          atYStartEdge: computed(() => states.value.scrollTop <= 0),
          atYEndEdge: computed(() => states.value.scrollTop >= estimatedTotalHeight.value - unref(parsedHeight)),
        },
        (x: number, y: number) => {
          hScrollbar.value?.onMouseUp?.();
          hScrollbar.value?.onMouseUp?.();
          const width = unref(parsedWidth);
          const height = unref(parsedHeight);
          scrollTo({
            scrollLeft: Math.min(states.value.scrollLeft + x, estimatedTotalWidth.value - width),
            scrollTop: Math.min(states.value.scrollTop + y, estimatedTotalHeight.value - height),
          });
        }
      );

      const scrollTo = ({ scrollLeft = states.value.scrollLeft, scrollTop = states.value.scrollTop }: GridScrollOptions) => {
        scrollLeft = Math.max(scrollLeft, 0);
        scrollTop = Math.max(scrollTop, 0);
        const _states = unref(states);
        if (scrollTop === _states.scrollTop && scrollLeft === _states.scrollLeft) {
          return;
        }

        states.value = {
          ..._states,
          xAxisScrollDir: getScrollDir(_states.scrollLeft, scrollLeft),
          yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop),
          scrollLeft,
          scrollTop,
          updateRequested: true,
        };

        nextTick(() => resetIsScrolling());

        onUpdated();
        emitEvents();
      };

      const scrollToItem = (rowIndex = 0, columnIdx = 0, alignment: Alignment = AUTO_ALIGNMENT) => {
        const _states = unref(states);
        columnIdx = Math.max(0, Math.min(columnIdx, props.totalColumn! - 1));
        rowIndex = Math.max(0, Math.min(rowIndex, props.totalRow! - 1));
        const scrollBarWidth1 = getScrollBarWidth(ns?.namespace?.value);

        const _cache = unref(cache);
        const estimatedHeight = getEstimatedTotalHeight(props, _cache);
        const estimatedWidth = getEstimatedTotalWidth(props, _cache);

        scrollTo({
          scrollLeft: getColumnOffset(
            props,
            columnIdx,
            alignment,
            _states.scrollLeft,
            _cache,
            estimatedWidth > props.width! ? scrollBarWidth1 : 0
          ),
          scrollTop: getRowOffset(
            props,
            rowIndex,
            alignment,
            _states.scrollTop,
            _cache,
            estimatedHeight > props.height! ? scrollBarWidth1 : 0
          ),
        });
      };

      const getItemStyle = (rowIndex: number, columnIndex: number): CSSProperties => {
        const { columnWidth, direction, rowHeight } = props;
        const itemStyleCache = getItemStyleCache.value(clearCache && columnWidth, clearCache && rowHeight, clearCache && direction);
        // since there was no need to introduce an nested array into cache object
        // we use row,column to construct the key for indexing the map.
        const key = `${rowIndex},${columnIndex}`;

        if (hasOwn(itemStyleCache, key)) {
          return itemStyleCache[key];
        } else {
          const [, left] = getColumnPosition(props, columnIndex, unref(cache));
          const _cache = unref(cache);

          const rtl = isRTL(direction);
          const [height, top] = getRowPosition(props, rowIndex, _cache);
          const [width] = getColumnPosition(props, columnIndex, _cache);

          itemStyleCache[key] = {
            position: 'absolute',
            left: rtl ? undefined : `${left}px`,
            right: rtl ? `${left}px` : undefined,
            top: `${top}px`,
            height: `${height}px`,
            width: `${width}px`,
          };

          return itemStyleCache[key];
        }
      };

      // TODO: debounce setting is scrolling.

      const resetIsScrolling = () => {
        // timer = null

        states.value.isScrolling = false;
        nextTick(() => {
          getItemStyleCache.value(-1, null, null);
        });
      };

      // life cycles
      onMounted(() => {
        // for SSR
        if (!isClient) {return;}
        const { initScrollLeft, initScrollTop } = props;
        const windowElement = unref(windowRef);
        if (windowElement) {
          if (isNumber(initScrollLeft)) {
            windowElement.scrollLeft = initScrollLeft;
          }
          if (isNumber(initScrollTop)) {
            windowElement.scrollTop = initScrollTop;
          }
        }
        emitEvents();
      });

      const onUpdated = () => {
        const { direction } = props;
        const { scrollLeft, scrollTop, updateRequested } = unref(states);

        const windowElement = unref(windowRef);
        if (updateRequested && windowElement) {
          if (direction === RTL) {
            switch (getRTLOffsetType()) {
            case RTL_OFFSET_NAG: {
              windowElement.scrollLeft = -scrollLeft;
              break;
            }
            case RTL_OFFSET_POS_ASC: {
              windowElement.scrollLeft = scrollLeft;
              break;
            }
            default: {
              const { clientWidth, scrollWidth } = windowElement;
              windowElement.scrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
            }
            }
          } else {
            windowElement.scrollLeft = Math.max(0, scrollLeft);
          }

          windowElement.scrollTop = Math.max(0, scrollTop);
        }
      };

      const { resetAfterColumnIndex, resetAfterRowIndex, resetAfter } = instance.proxy as any;

      expose({
        windowRef,
        innerRef,
        getItemStyleCache,
        scrollTo,
        scrollToItem,
        states,
        resetAfterColumnIndex,
        resetAfterRowIndex,
        resetAfter,
      });

      // rendering part

      const renderScrollbars = () => {
        const { scrollbarAlwaysOn, scrollbarStartGap, scrollbarEndGap, totalColumn, totalRow } = props;

        const width = unref(parsedWidth);
        const height = unref(parsedHeight);
        const estimatedWidth = unref(estimatedTotalWidth);
        const estimatedHeight = unref(estimatedTotalHeight);
        const { scrollLeft, scrollTop } = unref(states);
        const horizontalScrollbar = h(Scrollbar, {
          ref: hScrollbar,
          alwaysOn: scrollbarAlwaysOn,
          startGap: scrollbarStartGap,
          endGap: scrollbarEndGap,
          class: ns.e('horizontal'),
          clientSize: width,
          layout: 'horizontal',
          onScroll: onHorizontalScroll,
          ratio: (width * 100) / estimatedWidth,
          scrollFrom: scrollLeft / (estimatedWidth - width),
          total: totalRow,
          visible: true,
        });

        const verticalScrollbar = h(Scrollbar, {
          ref: vScrollbar,
          alwaysOn: scrollbarAlwaysOn,
          startGap: scrollbarStartGap,
          endGap: scrollbarEndGap,
          class: ns.e('vertical'),
          clientSize: height,
          layout: 'vertical',
          onScroll: onVerticalScroll,
          ratio: (height * 100) / estimatedHeight,
          scrollFrom: scrollTop / (estimatedHeight - height),

          total: totalColumn,
          visible: true,
        });

        return {
          horizontalScrollbar,
          verticalScrollbar,
        };
      };

      const renderItems = () => {
        const [columnStart, columnEnd] = unref(columnsToRender);
        const [rowStart, rowEnd] = unref(rowsToRender);
        const { data, totalColumn, totalRow, useIsScrolling, itemKey } = props;
        const children: VNodeChild[] = [];
        if (totalRow > 0 && totalColumn > 0) {
          for (let row = rowStart; row <= rowEnd; row++) {
            for (let column = columnStart; column <= columnEnd; column++) {
              children.push(
                slots.default?.({
                  columnIndex: column,
                  data,
                  key: itemKey({ columnIndex: column, data, rowIndex: row }),
                  isScrolling: useIsScrolling ? unref(states).isScrolling : undefined,
                  style: getItemStyle(row, column),
                  rowIndex: row,
                })
              );
            }
          }
        }
        return children;
      };

      const renderInner = () => {
        const Inner = resolveDynamicComponent(props.innerElement) as VNode;
        const children = renderItems();
        return [
          h(
            Inner,
            {
              style: unref(innerStyle),
              ref: innerRef,
            },
            !isString(Inner)
              ? {
                default: () => children,
              }
              : children
          ),
        ];
      };

      const renderWindow = () => {
        const Container = resolveDynamicComponent(props.containerElement) as VNode;
        const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();
        const Inner = renderInner();

        return h(
          'div',
          {
            key: 0,
            class: ns.e('wrapper'),
            role: props.role,
          },
          [
            h(
              Container,
              {
                class: props.className,
                style: unref(windowStyle),
                onScroll,
                onWheel,
                ref: windowRef,
              },
              !isString(Container) ? { default: () => Inner } : Inner
            ),
            horizontalScrollbar,
            verticalScrollbar,
          ]
        );
      };

      return renderWindow;
    },
  });
};

export default createGrid;

type Dir = typeof FORWARD | typeof BACKWARD;

export type GridInstance = InstanceType<ReturnType<typeof createGrid>> &
UnwrapRef<{
  windowRef: Ref<HTMLElement>;
  innerRef: Ref<HTMLElement>;
  getItemStyleCache: ReturnType<typeof useCache>;
  scrollTo: (scrollOptions: any) => void;
  scrollToItem: (rowIndex: number, columnIndex: number, alignment: any) => void;
  states: Ref<{
    isScrolling: boolean;
    scrollLeft: number;
    scrollTop: number;
    updateRequested: boolean;
    xAxisScrollDir: Dir;
    yAxisScrollDir: Dir;
  }>;
}>;
