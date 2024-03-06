import { defineComponent, SetupContext } from 'vue';
import { descriptionsProps } from './descriptions-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NDescriptions',
  props: descriptionsProps,
  setup(props: descriptionsProps, ctx: SetupContext) {
    const ns = useNamespace('descriptions');
    return () => (
      <div class={ns.b()}>
        {ctx.slots.default?.()}
      </div>
    );
  },
});
