import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './footer.scss';

export default defineComponent({
  name: 'NFooter',
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => <div class={ns.e('footer')}>{slots.default?.()}</div>;
  },
});
