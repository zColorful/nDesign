import { computed, inject, Ref } from 'vue';
import { Size } from '../_utils/constant';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';

export const useSize = (size?: Ref<Size | undefined>, { defaultValue = 'md' }: { defaultValue?: Size } = {}) => {
  const configProviderCtx = inject(FORM_TOKEN, undefined);

  const mergedSize = computed(() => size?.value ?? configProviderCtx?.size ?? defaultValue);

  return {
    mergedSize,
  };
};
