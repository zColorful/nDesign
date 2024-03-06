import { useNamespace } from '../../shared/hooks/use-namespace';
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, onUpdated, reactive, ref, toRefs, watch } from 'vue';
import { TabsContext, tabsInjectionKey } from './context';

export default defineComponent({
  name: 'NTab',
  props: {
    id: {
      type: [String, Number],
      requred: false,
    },
    /**
     * @zh 选项卡的标题
     * @en Title of the tab
     */
    title: {
      type: String,
      requred: false,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许关闭此选项卡（仅在可编辑模式生效）
     * @en Whether to allow this tab to be closed (only effective in editable mode)
     */
    closable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在不显示标签时销毁内容
     * @en Whether to destroy the content when the label is not displayed
     */
    destroyOnHide: {
      type: Boolean,
      default: false,
    },
  },
  /**
   * @zh 选项卡标题
   * @en Tab title
   * @slot title
   */
  setup(props, { slots }) {
    const { title, disabled, closable } = toRefs(props);
    const instance = getCurrentInstance();
    const ns = useNamespace('tabs');
    const prefixCls = ns.b();
    const tabsCtx = inject<Partial<TabsContext>>(tabsInjectionKey, {});

    const itemRef = ref<HTMLDivElement>();
    const key = computed(() => props.id as string | number);
    const active = computed(() => key.value === tabsCtx.activeKey);
    const mounted = ref(tabsCtx.lazyLoad ? active.value : true);

    const data = reactive({
      id: key,
      title,
      disabled,
      closable,
      slots,
    });

    if (instance?.uid) {
      tabsCtx.addItem?.(instance.uid, data);
    }

    onBeforeUnmount(() => {
      if (instance?.uid) {
        tabsCtx.removeItem?.(instance.uid);
      }
    });

    watch(active, (act: boolean) => {
      if (act) {
        if (!mounted.value) {
          mounted.value = true;
        }
      } else if (props.destroyOnHide || tabsCtx.destroyOnHide) {
        mounted.value = false;
      }
    });

    onUpdated(() => {
      data.slots = { ...slots };
    });

    const cls = computed(() => {
      return [`${prefixCls}-content-item`, { [`${prefixCls}-content-item-active`]: active.value }];
    });

    return () => (
      <div ref={itemRef} class={cls.value}>
        {mounted.value ? <div class={`${prefixCls}-pane`}>{slots?.default?.()}</div> : null}
      </div>
    );
  },
});
