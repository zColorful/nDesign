import { defineComponent, PropType, ref, watch, toRefs, ExtractPropTypes, shallowRef, computed } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const jumpPageProps = {
  goToText: String,
  size: {
    type: String as PropType<'lg' | '' | 'sm'>,
    default: '',
  },
  pageIndex: Number,
  showJumpButton: Boolean,
  totalPages: Number,
  cursor: Number,
  onChangeCursorEmit: Function as PropType<(v: number) => void>,
};

type JumpPageProps = ExtractPropTypes<typeof jumpPageProps>;

export default defineComponent({
  props: jumpPageProps,
  emits: ['changeCursorEmit'],
  setup(props: JumpPageProps, { emit }) {
    const { pageIndex, totalPages, cursor, showJumpButton, size, goToText } = toRefs(props);
    const ns = useNamespace('pagination');
    const timer = shallowRef<number>();
    const curPage = ref<number>();

    // 输入跳转页码
    const inputNum = ref(pageIndex?.value);
    //  当前页码变化，输入框的值等于当前页码
    watch(
      () => pageIndex?.value,
      (val) => {
        inputNum.value = val;
        curPage.value = val;
      }
    );

    //  监听页面输入
    const jumpPageChange = (currentPage: number) => {
      inputNum.value = currentPage;
      curPage.value = +currentPage;
      if (isNaN(currentPage)) {
        clearTimeout(timer.value);
        timer.value = window.setTimeout(() => {
          inputNum.value = curPage?.value;
        }, 300);
      }
    };

    //  纠正跳转的页数
    const jumpPage = (pageNum?: number) => {
      if (totalPages?.value && pageNum) {
        if (pageNum > totalPages.value) {
          emit('changeCursorEmit', totalPages.value);
          inputNum.value = totalPages.value;
        } else if (pageNum < 1) {
          emit('changeCursorEmit', 1);
          inputNum.value = 1;
        } else {
          emit('changeCursorEmit', pageNum);
        }
      } else {
        inputNum.value = curPage?.value;
      }
    };

    // 跳转指定页码
    const jump = (e: KeyboardEvent | 'btn') => {
      if ((e === 'btn' || e.key === 'Enter') && cursor?.value !== curPage?.value) {
        jumpPage(curPage?.value);
      }
    };

    //  如果没有强制使用跳转按钮的情况下，在input onChange时就触发事件
    const onInputChange = () => {
      if (!showJumpButton.value && cursor?.value !== curPage?.value) {
        jumpPage(curPage?.value);
      }
    };

    return () => (
      <div class={ns.e('jump-container')}>
        {goToText?.value}
        <n-input
          class={[ns.e('input'), size.value ? ns.em('input', size.value) : '']}
          size={size.value}
          modelValue={String(inputNum.value)}
          onInput={jumpPageChange}
          onKeydown={jump}
          onChange={onInputChange}
        />
        {
          // TODO 加入国际化后，替换为当前语言为中文的时候加上 '页'
          goToText?.value === '跳至' && '页'
        }
        {showJumpButton.value && (
          <div
            class={[ns.e('jump-button'), size.value ? ns.em('jump-size', size.value) : ns.em('jump-size', 'default')]}
            onClick={jump('btn')}
            title={goToText?.value}>
            <div class={ns.e('go')}></div>
          </div>
        )}
      </div>
    );
  },
});
