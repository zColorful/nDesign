import { ref } from 'vue';
import { TreeSelectProps, TreeItem } from '../src/tree-select-types';

export default function useToggle(props: TreeSelectProps) {
  const visible = ref<boolean>(false);

  const selectToggle = (val: boolean) => {
    if (props.disabled) {
      return;
    }
    if (val) {
      visible.value = val;
    } else {
      visible.value = !visible.value;
    }
  };

  const treeToggle = (e: MouseEvent, item: TreeItem) => {
    e.preventDefault();
    e.stopPropagation();
    item.expanded = !item.expanded;
  };

  return {
    visible,
    selectToggle,
    treeToggle,
  };
}
