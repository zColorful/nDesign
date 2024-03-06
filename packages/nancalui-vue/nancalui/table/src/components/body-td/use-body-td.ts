import { onBeforeMount, onMounted, ref, inject, computed, onUpdated, watch, nextTick } from 'vue';
import type { SetupContext } from 'vue';
import { BodyTdProps, UseBodyTd } from './body-td-types';
import { inBrowser } from '../../../../shared/utils';
import { TABLE_TOKEN, ITable } from '../../table-types';
import { getRowIdentity } from '../../utils';

export function useBodyTd(props: BodyTdProps, ctx: SetupContext): UseBodyTd {
  const tooltipContent = ref();
  const isShowTooltip = ref(false);
  const tdRef = ref<HTMLElement>();
  let observer: ResizeObserver;
  const table = inject(TABLE_TOKEN) as ITable;
  function getTooltipContent() {
    const res = props?.row[props?.column?.field] || tdRef.value?.innerText || tdRef.value?.textContent;
    if (!res || res === '--') {
      return false;
    }
    return res;
  }

  function shouldShowTooltip() {
    if (!tdRef.value) {
      return;
    }
    // const range = document.createRange();
    // range.setStart(tdRef.value, 0);
    // range.setEnd(tdRef.value, tdRef.value.childNodes.length);
    // const rangeWidth = range.getBoundingClientRect().width;
    // const padding =
    //   parseInt(window.getComputedStyle(tdRef.value)['paddingLeft'], 0)
    //  + parseInt(window.getComputedStyle(tdRef.value)['paddingRight'], 0);
    const node: HTMLHtmlElement = tdRef.value.childNodes[0];
    // console.log(node.scrollWidth, 'node.scrollWidth');
    // console.log(node.offsetWidth, 'node.offsetWidth');
    isShowTooltip.value = !!(props.column.showOverflowTooltip && node.scrollWidth > node.offsetWidth);
  }

  //  数据更新重新计算
  watch(
    () => props?.row,
    () => {
      tooltipContent.value = getTooltipContent();
      nextTick(() => {
        shouldShowTooltip();
      });
    },
    {
      immediate: true,
      deep: true,
    }
  );

  onMounted(() => {
    if (inBrowser && window.ResizeObserver && props.column.showOverflowTooltip) {
      const innerObserver = new window.ResizeObserver(shouldShowTooltip);
      tdRef.value && innerObserver.observe(tdRef.value);
    }
    tooltipContent.value = getTooltipContent();
  });

  onBeforeMount(() => {
    tdRef.value && observer.unobserve(tdRef.value);
  });

  onUpdated(() => {
    const modeMap = table.store.states.tableCellModeMap.value;
    for (const child of modeMap.keys()) {
      modeMap.set(child, 'readonly');
    }
  });

  const getCellKsy = () => {
    return `${getRowIdentity(props.row, table.props.rowKey, props.index)}-${props.column.field}-cell`;
  };

  const cellMode = computed(() => {
    const cellKey = getCellKsy();
    const mode = table.store.states.tableCellModeMap.value.get(cellKey);
    return mode || 'readonly';
  });

  const onCellClick = () => {
    // 先将其它单元格置为非编辑态
    const modeMap = table.store.states.tableCellModeMap.value;
    const cellKey = getCellKsy();
    for (const child of modeMap.keys()) {
      modeMap.set(child, 'readonly');
    }
    // 如果已经时edit状态，无需再更改状态
    if (props.column.type === 'editable' && modeMap.get(cellKey) === 'edit') {
      return;
    }
    ctx.emit('cellClick');
  };

  return { tdRef, isShowTooltip, tooltipContent, cellMode, onCellClick };
}
