import { defineComponent, provide, reactive, toRefs, ref, h } from 'vue';
import { SELECT_TOKEN } from './const';
import { collapseProps, CollapseContext, CollapseActiveData } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './collapse.scss';

export default defineComponent({
  name: 'NCollapse',
  props: collapseProps,
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const activeNames: any = ref(props?.modelValue);
    const ns = useNamespace('collapse');
    const scrollbarNs = useNamespace('scrollbar');
    const getLists = (data: CollapseActiveData) => {
      if (!data && data !== 0) {
        return [];
      }
      return Array.isArray(data) ? data.map((item) => item) : [data];
    };
    const collapseItemClick = (name: string | number) => {
      const activeLists = [...getLists(activeNames.value)];
      const itemIndex = activeLists.indexOf(name);
      if (props.accordion) {
        let activeName = name;
        if ((activeLists[0] || activeLists[0] === 0) && activeLists[0] === name) {
          activeName = '';
        }
        activeNames.value = activeName;
        ctx.emit('update:modelValue', activeName);
        ctx.emit('change', activeName);
      } else {
        if (itemIndex > -1) {
          activeLists.splice(itemIndex, 1);
        } else {
          activeLists.push(name);
        }
        activeNames.value = activeLists;
        ctx.emit('update:modelValue', activeLists);
        ctx.emit('change', activeLists);
      }
    };
    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        activeNames: activeNames,
        collapseItemClick,
      }) as CollapseContext
    );
    return {
      ns,
      scrollbarNs,
      activeNames,
      ctx,
    };
  },
  render() {
    return h('div', { class: [this.ns.b(), this.scrollbarNs.b()] }, this.ctx?.slots?.default?.());
  },
});
