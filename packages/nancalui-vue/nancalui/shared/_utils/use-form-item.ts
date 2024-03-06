import { computed, inject, Ref, toRef } from 'vue';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';
import { Size } from '../_utils/constant';

export const useFormItem = ({
  size,
  disabled,
  error,
  uninject,
}: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
  // private
  uninject?: boolean;
} = {}) => {
  const formItemCtx: any = !uninject ? inject(FORM_TOKEN, {}) : {};

  const mergedSize = computed(() => size?.value ?? formItemCtx.size);

  const mergedDisabled = computed(() => disabled?.value || formItemCtx.disabled);

  const mergedError = computed(() => error?.value || formItemCtx.error);

  const feedback = toRef(formItemCtx, 'feedback');
  const eventHandlers = toRef(formItemCtx, 'eventHandlers');

  return {
    formItemCtx,
    mergedSize,
    mergedDisabled,
    mergedError,
    feedback,
    eventHandlers,
  };
};
