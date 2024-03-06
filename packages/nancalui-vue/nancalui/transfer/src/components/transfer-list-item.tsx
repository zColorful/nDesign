import { computed, defineComponent, inject, PropType } from 'vue';
import { Checkbox } from '../../../checkbox';
import { Icon } from '../../../icon';
import { TransferItem } from '../interface';
import { transferInjectionKey } from '../context';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'TransferListItem',
  props: {
    type: {
      type: String as PropType<'source' | 'target'>,
    },
    data: {
      type: Object as PropType<TransferItem>,
      required: true,
    },
    allowClear: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    draggable: {
      type: Boolean,
    },
    simple: Boolean,
  },
  setup(props) {
    const ns = useNamespace('transfer-item');
    const transferCtx = inject(transferInjectionKey, undefined);

    const handleClick = () => {
      if (!props.simple) {
        return;
      }

      transferCtx?.moveTo([props.data.value], props.type === 'target' ? 'source' : 'target');
    };

    const cls = computed(() => [
      ns.b(),
      {
        [ns.e('disabled')]: props.disabled,
        [ns.e('draggable')]: props.draggable,
      },
    ]);

    const handleRemove = () => {
      transferCtx?.moveTo([props.data.value], 'source');
    };

    return () => (
      <div class={cls.value} onClick={handleClick}>
        {props.allowClear || props.simple ? (
          <span class={ns.e('content')}>
            {transferCtx?.slots.item?.({
              label: props.data.label,
              value: props.data.value,
            }) ?? props.data.label}
          </span>
        ) : (
          <Checkbox class={[ns.e('content'), ns.e('checkbox')]} value={props.data.value} disabled={props.disabled}>
            {transferCtx?.slots.item?.({
              label: props.data.label,
              value: props.data.value,
            }) ?? props.data.label}
          </Checkbox>
        )}
        {props.allowClear && !props.disabled && <Icon class={ns.e('remove-btn')} name="close" onClick={handleRemove}></Icon>}
      </div>
    );
  },
});
