import { defineComponent } from 'vue';
import type { VNode, VNodeTypes } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './layout.scss';

export default defineComponent({
  name: 'NLayout',
  emits: [],
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => {
      const slotDefault = slots.default?.() as VNode[];
      const isAside = slotDefault.some((item) => (item.type as VNodeTypes & { name: string }).name === 'NAside');
      const classNames = `${isAside ? ns.e('aside') : ''} ${ns.b()}`;
      return <div class={classNames}>{slotDefault}</div>;
    };
  },
});
