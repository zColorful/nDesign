import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { Direction } from '../../shared/_utils/constant';
import { useNamespace } from '../../shared/hooks/use-namespace';

type ButtonTypes = 'previous' | 'next';

export default defineComponent({
  name: 'TabsButton',
  props: {
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'next',
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(type: ButtonTypes, ev: Event) => void>,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const ns = useNamespace('tabs-nav-button');
    const prefixCls = ns.b();

    const handleClick = (ev: Event) => {
      if (!props.disabled) {
        emit('click', props.type, ev);
      }
    };

    const renderIcon = (disabled: boolean) => {
      if (props.direction === 'horizontal') {
        if (props.type === 'next') {
          return <n-icon name="chevron-right" disabled={disabled} />;
        }
        return <n-icon name="collapse" disabled={disabled} />;
      }
      if (props.type === 'next') {
        return <n-icon name="chevron-down" disabled={disabled} />;
      }
      return <n-icon name="chevron-up" disabled={disabled} />;
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-left`]: props.direction === 'horizontal' && props.type === 'previous',
        [`${prefixCls}-right`]: props.direction === 'horizontal' && props.type === 'next',
        [`${prefixCls}-up`]: props.direction === 'vertical' && props.type === 'previous',
        [`${prefixCls}-down`]: props.direction === 'vertical' && props.type === 'next',
      },
    ]);

    return () => (
      <div class={cls.value} onClick={handleClick}>
        {renderIcon(props.disabled)}
      </div>
    );
  },
});
