import { defineComponent, SetupContext } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './icon-group.scss';

export default defineComponent({
  name: 'NIconGroup',
  setup(_, ctx: SetupContext) {
    const ns = useNamespace('icon-group');
    return () => <div class={ns.b()}>{ctx.slots.default?.()}</div>;
  },
});
