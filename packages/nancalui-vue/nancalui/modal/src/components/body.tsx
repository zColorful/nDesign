import { computed, defineComponent, toRefs } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { ModalBodyProps } from '../modal-types';

export default defineComponent({
  name: 'NModalBody',
  props: {
    maxHeight: {
      //  设置body的最大高度
      type: [String, Number],
      required: false,
    },
  },
  setup(props: ModalBodyProps, { slots }) {
    const ns = useNamespace('modal');
    const { maxHeight } = toRefs(props);

    const h = computed(() => {
      if (typeof maxHeight?.value === 'number') {
        return `${maxHeight?.value}px`;
      } else {
        return maxHeight?.value;
      }
    });

    return () => (
      <div class={ns.e('body')} style={{ maxHeight: h.value }}>
        {slots.default?.()}
      </div>
    );
  },
});
