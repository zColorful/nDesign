import { ref } from 'vue';
import { TreeSelectProps, TreeItem } from '../src/tree-select-types';

export default function useSelect(props: TreeSelectProps, ctx: SetupContext): unknown {
  let { label, value, children } = props.prop;
  label = label ? label : 'label';
  value = value ? value : 'value';
  children = children ? children : 'children';
  const inputValue = ref<TreeItem | Array<TreeItem>>([]); // 选中的label值
  const selectedValue = ref<unknown | Array<unknown>>([]); // 选中的value值
  const selectedCache = new Set();
  const selectedValueCache = new Set();
  const useCache = (item: TreeItem) => {
    // item.checked === true ? selectedCache.add(item.label) : selectedCache.has(item.label) && selectedCache.delete(item.label);
    if (item.checked === true) {
      selectedCache.add(item);
      selectedValueCache.add(item[value]);
    } else {
      selectedCache.has(item) && selectedCache.delete(item);
      selectedValueCache.has(item[value]) && selectedValueCache.delete(item[value]);
    }
  };
  const searchUp = (item: TreeItem) => {
    if (!item.parent) {
      return;
    }
    let state = '';
    const checkedArr = item.parent.children.filter((el) => el.checked === true);
    switch (checkedArr.length) {
      case 0:
        state = 'none';
        break;
      case item.parent.children.length:
        state = 'checked';
        break;
      default:
        state = 'halfchecked';
        break;
    }

    if (state === 'checked') {
      item.parent.checked = true;
      item.parent.halfchecked = false;
    } else if (state === 'halfchecked') {
      item.parent.halfchecked = true;
      item.parent.checked = false;
    } else {
      item.parent.checked = false;
      item.parent.halfchecked = false;
    }

    useCache(item.parent);
    searchUp(item.parent);
  };
  const clearSelect = () => {
    if (!props.multiple) {
      selectedValue.value = undefined;
      inputValue.value = '';
    } else {
      selectedValue.value = [];
      inputValue.value = [];
    }
    selectedCache.clear();
    selectedValueCache.clear();
  };
  const searchDown = (item: TreeItem) => {
    if (!item.children) {
      return;
    }
    item.children.forEach((el) => {
      el.checked = item.checked;
      useCache(el);
      searchDown(el);
    });
  };

  const selectValue = (item: TreeItem, bloodSearch: boolean) => {
    // bloodSearch 是否在初始化选中节点
    if (!props.multiple) {
      selectedValue.value = item[value];
      inputValue.value = item[label];
    } else {
      if (!bloodSearch) {
        item.checked = !item.checked;
      } else {
        if (!item.checked) {
          item.checked = !item.checked;
        }
      }
      if (item.halfchecked) {
        item.halfchecked = false;
      }
      useCache(item);
      searchUp(item);
      searchDown(item);

      // if (selectedCache.size > 0) {
      inputValue.value = [...selectedCache] as string[];
      // }
      // if (selectedValueCache.size > 0) {
      selectedValue.value = [...selectedValueCache];
      // }
    }
    if (!bloodSearch) {
      ctx.emit('update:modelValue', selectedValue.value);
      ctx.emit('valueChange', { data: selectedValue.value, node: item });
    }
  };
  const clearSelected = (data: Array<TreeItem>) => {
    for (const item of data) {
      item.checked = false;
      item.selected = false;
      if (item[children]?.length) {
        clearSelected(item[children]);
      }
    }
  };
  const handleClearAll = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearSelect();
    clearSelected(props.treeData);
    ctx.emit('valueChange', { data: '' });
    ctx.emit('update:modelValue', '');
  };
  const handleClearItem = (e: MouseEvent, item?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.multiple) {
      const index = inputValue.value?.findIndex((row: TreeItem) => row[value] === item[value]);
      inputValue.value.splice(index, 1);
      selectedValue.value.splice(selectedValue.value.indexOf(item[value]), 1);
    } else {
      inputValue.value = '';
      selectedValue.value = '';
    }
    ctx.emit('valueChange', { data: selectedValue.value, node: item });
    ctx.emit('update:modelValue', selectedValue.value);
  };

  return {
    inputValue,
    selectValue,
    clearSelect,
    selectedValue,
    handleClearAll,
    handleClearItem,
  };
}
