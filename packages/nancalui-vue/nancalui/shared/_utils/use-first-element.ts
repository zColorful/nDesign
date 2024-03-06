import { onMounted, onUpdated, ref } from 'vue';
import { SlotChildren } from './types';
import { getFirstElementFromChildren } from './vue-utils';

export const useFirstElement = () => {
  // only save VNodes reference, not use ref
  const children: SlotChildren = {};
  const firstElement = ref<HTMLElement>();

  const getFirstElement = () => {
    const element = getFirstElementFromChildren(children.value);
    if (element !== firstElement.value) {
      firstElement.value = element;
    }
  };

  onMounted(() => getFirstElement());

  onUpdated(() => getFirstElement());

  return {
    children,
    firstElement,
  };
};
