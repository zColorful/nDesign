import { computed } from 'vue';
import { TreeSelectProps } from '../src/tree-select-types';

export default function useClear(props: TreeSelectProps): unknown {
  const isClearable = computed<boolean>(() => {
    return !props.disabled && props.allowClear;
  });

  return {
    isClearable,
  };
}
