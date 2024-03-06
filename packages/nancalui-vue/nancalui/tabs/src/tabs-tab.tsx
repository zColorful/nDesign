import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import type { TabData } from './interface';
import { TabsContext, tabsInjectionKey } from './context';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'Tab',
  props: {
    tab: {
      type: Object as PropType<TabData>,
      required: true,
    },
    customWidth: {
      type: String,
      required: false,
    },
    active: Boolean,
    editable: Boolean,
  },
  emits: ['click', 'delete'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('tabs-tab');
    const prefixCls = ns.b();
    const tabsCtx = inject<Partial<TabsContext>>(tabsInjectionKey, {});
    const handleClick = (e: Event) => {
      if (!props.tab.disabled) {
        emit('click', props.tab, e);
      }
    };

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        handleClick(ev);
      }
    };

    const eventHandlers = computed(() => {
      return Object.assign(tabsCtx.trigger === 'click' ? { onClick: handleClick } : { onMouseover: handleClick }, { onKeydown: onKeyDown });
    });

    const handleDelete = (e: Event) => {
      e.stopPropagation();

      if (!props.tab.disabled) {
        emit('delete', props.tab, e);
      }
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.active,
        [`${prefixCls}-closable`]: props.editable && props.tab.closable,
        [`${prefixCls}-disabled`]: props.tab.disabled,
      },
    ]);

    return () => (
      <div tabindex="0" class={cls.value} {...eventHandlers.value} style={{ width: props.customWidth }}>
        <span class={`${prefixCls}-title`}>{slots.default?.()}</span>
        {props.editable && props.tab.closable ? <n-icon name="close" class={`${prefixCls}-close-btn`} onClick={handleDelete} /> : null}
      </div>
    );
  },
});
