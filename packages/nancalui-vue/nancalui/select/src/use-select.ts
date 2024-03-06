import { ref, computed, Ref, inject, watch } from 'vue';
import type { SetupContext } from 'vue';
import { SelectProps, OptionObjectItem, UseSelectReturnType } from './select-types';
import { className, KeyType } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { onClickOutside } from '@vueuse/core';
import { isFunction, debounce } from 'lodash';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';

export default function useSelect(
  props: SelectProps,
  selectRef: Ref<HTMLElement | undefined>,
  ctx: SetupContext,
  focus: () => void,
  blur: () => void,
  isSelectFocus: Ref<boolean>,
  t: (path: string) => unknown
): UseSelectReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const ns = useNamespace('select');
  const dropdownRef = ref();
  const selectDisabled = computed(() => formContext?.disabled || props.disabled);
  const selectDisabledBorder = computed(() => formContext?.noborder || props.noborder);
  const selectSize = computed(() => formContext?.size || props.size);
  const isObjectOption = ref(false);
  const modelName = ref('');
  const originRef = ref<HTMLElement>();

  // 筛选后重置选项
  const filterFn = () => {
    if (isFunction(props.filter)) {
      // replaceAll("'", '') 目的兼容微软中文输入时候中间的'号
      props.filter(modelName.value.replaceAll("'", ''));
    }
  };
  // 控制弹窗开合
  const isOpen = ref<boolean>(false);
  const toggleChange = (bool: boolean) => {
    if (selectDisabled.value) {
      return;
    }
    if (isOpen.value !== bool) {
      // select 有打开和关闭的请求
      setTimeout(() => {
        // 等modelValue变后再搜索 和远程搜索节流
        filterFn();
      }, 100);
    }
    isOpen.value = bool;
    ctx.emit('toggle-change', bool);
  };
  onClickOutside(
    dropdownRef,
    () => {
      toggleChange(false);
    },
    { ignore: [selectRef] }
  );

  const dropdownMenuMultipleNs = useNamespace('dropdown-menu-multiple');
  const selectCls = computed(() => {
    return className(ns.b(), {
      [ns.m('open')]: isOpen.value,
      [dropdownMenuMultipleNs.b()]: props.multiple,
      [ns.m('lg')]: selectSize.value === 'lg',
      [ns.m('sm')]: selectSize.value === 'sm',
      [ns.m('underlined')]: props.overview === 'underlined',
      [ns.m('border-none')]: props.overview === 'none',
      [ns.m('disabled')]: selectDisabled.value,
      [ns.m('noborder')]: selectDisabledBorder.value,
      [ns.m('focus')]: isSelectFocus.value,
    });
  });

  // 这里对n-select组件options做统一处理,此options只用作渲染option列表
  const cacheOptions = new Map();
  const mergeOptions = computed(() => {
    const { multiple, modelValue } = props;
    return props.options.map((item) => {
      let option: OptionObjectItem;
      if (typeof item === 'object') {
        option = {
          name: item.name ? item.name : item.value + '',
          _checked: false,
          ...item,
        };
      } else {
        option = {
          name: item + '',
          value: item,
          _checked: false,
        };
      }
      if (multiple) {
        /**
         * TODO: 这里mergeOptions依赖了modelValue
         * 但是下面点击item更新的时候modelValue又是根据mergeOptions来算出来的
         * 因此可能会多更新一次，后续优化
         */
        if (Array.isArray(modelValue)) {
          option._checked = modelValue.includes(option.value);
        } else {
          option._checked = false;
        }
      }
      cacheOptions.set(option.value, option);
      return option;
    });
  });

  // 缓存options，用value来获取对应的optionItem
  const getValuesOption = (values: KeyType<OptionObjectItem, 'value'>[]) => values.map((value) => cacheOptions.get(value));

  // 这里处理n-option组件生成的Options
  const injectOptions = ref(new Map());
  const updateInjectOptions = (item: Record<string, unknown>, operation: string, isObject: boolean) => {
    if (operation === 'add') {
      injectOptions.value.set(item.value, item);
    } else if (operation === 'delete') {
      if (injectOptions.value.get(item.value)) {
        injectOptions.value.delete(item.value);
      }
    }
    isObjectOption.value = isObject;
  };

  const updateInjectOptionsStatus = () => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      for (const child of injectOptions.value.values()) {
        if (props.modelValue.includes(child.value)) {
          child._checked = true;
        } else {
          child._checked = false;
        }
      }
    }
  };

  const getInjectOptions = (values: KeyType<OptionObjectItem, 'value'>[]) => {
    return values.map((value) => {
      if (props.multiple && props.allowCreate) {
        const option = injectOptions.value.get(value);
        if (option) {
          return option;
        }
        const newOption = {
          name: value,
          value: value,
          _checked: true,
        };
        return value ? newOption : option;
      } else {
        return injectOptions.value.get(value);
      }
    });
  };

  const filterQuery = ref('');

  // 当前选中的项
  const selectedOptions = computed<OptionObjectItem[]>(() => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      return getInjectOptions(props.modelValue).filter((item) => (item ? true : false));
    } else if (!Array.isArray(props.modelValue)) {
      return getInjectOptions([props.modelValue]).filter((item) => (item ? true : false));
    }
    return [];
  });

  const isSupportFilter = computed(() => isFunction(props.filter) || (typeof props.filter === 'boolean' && props.filter));

  const getMultipleSelected = (items: (string | number)[]) => {
    if (mergeOptions.value.length) {
      ctx.emit(
        'value-change',
        getValuesOption(items).filter((item) => (item ? true : false))
      );
    } else if (isObjectOption.value) {
      const selectItems = getInjectOptions(items).filter((item) => (item ? true : false));
      ctx.emit('value-change', selectItems);
    } else {
      ctx.emit('value-change', items);
    }
  };

  const getSingleSelected = (item: OptionObjectItem) => {
    if (mergeOptions.value.length) {
      ctx.emit('value-change', getValuesOption([item.value])[0]);
    } else if (isObjectOption.value) {
      ctx.emit('value-change', item);
    } else {
      ctx.emit('value-change', item.value);
    }
  };

  const valueChange = (item: OptionObjectItem) => {
    const { multiple } = props;
    let { modelValue } = props;

    if (multiple) {
      const checkedItems = Array.isArray(modelValue) ? modelValue.slice() : [];
      const index = checkedItems.indexOf(item.value);
      const option = getInjectOptions([item.value])[0];
      if (option) {
        option._checked = !option._checked;
      }
      const mergeOption = getValuesOption([item.value])[0];
      if (mergeOption) {
        mergeOption._checked = !mergeOption._checked;
      }
      if (index > -1) {
        checkedItems.splice(index, 1);
      } else {
        checkedItems.push(item.value);
      }
      modelValue = checkedItems;
      ctx.emit('update:modelValue', modelValue);
      if (item.create) {
        filterQuery.value = '';
      }
      if (isSupportFilter.value) {
        focus();
      }
      getMultipleSelected(checkedItems);
    } else {
      ctx.emit('update:modelValue', item.value);
      getSingleSelected(item);
      toggleChange(false);
    }
  };

  const handleClose = () => {
    isOpen.value = false;
    ctx.emit('toggle-change', false);
  };

  const handleClear = () => {
    if (props.multiple) {
      ctx.emit('update:modelValue', []);
      ctx.emit('value-change', []);
    } else {
      ctx.emit('update:modelValue', '');
      ctx.emit('value-change', '');
    }
    modelName.value = '';
    ctx.emit('clear');
    if (isOpen.value) {
      handleClose();
      blur();
    }
  };

  const tagDelete = (data: OptionObjectItem) => {
    let { modelValue } = props;
    const checkedItems = [];
    for (const child of selectedOptions.value) {
      child._checked = true;
      if (data.value === child.value) {
        child._checked = false;
      }
      if (child._checked) {
        checkedItems.push(child.value);
      }
    }
    modelValue = checkedItems;
    ctx.emit('update:modelValue', modelValue);
    ctx.emit('remove-tag', data.value);
    getMultipleSelected(checkedItems);
  };

  const queryChange = (query: string) => {
    filterQuery.value = query;
    // 搜索完全相同的放最前面
    mergeOptions.value.forEach((item, index) => {
      if (item.name === query) {
        mergeOptions.value.unshift(mergeOptions.value.splice(index, 1)[0]);
      }
    });
  };

  const isLoading = computed(() => typeof props.loading === 'boolean' && props.loading);
  const debounceTime = computed(() => (props.remote ? 300 : 0));

  const handlerQueryFunc = (query: string) => {
    if (isFunction(props.filter)) {
      // replaceAll("'", '') 目的兼容微软中文输入时候中间的'号
      props.filter(query.replaceAll("'", ''));
    } else {
      queryChange(query);
      dropdownRef.value?.updatePosition();
    }
  };

  const debounceQueryFilter = debounce((query: string) => {
    handlerQueryFunc(query);
  }, debounceTime.value);

  // allow-create
  const injectOptionsArray = computed(() => Array.from(injectOptions.value.values()));
  const isShowCreateOption = computed(() => {
    const hasCommonOption = injectOptionsArray.value.filter((item) => !item.create).some((item) => item.name === filterQuery.value);
    return typeof props.filter === 'boolean' && props.filter && props.allowCreate && !!filterQuery.value && !hasCommonOption;
  });
  watch(isShowCreateOption, () => {
    dropdownRef.value?.updatePosition();
  });

  // no-data-text
  const emptyText = computed(() => {
    const visibleOptionsCount = injectOptionsArray.value.filter((item) => {
      const label = item.name || item.value;
      return label.toString().toLocaleLowerCase().includes(filterQuery.value.toLocaleLowerCase().trim());
    }).length;
    if (isLoading.value) {
      return props.loadingText || (t('loadingText') as string);
    }
    if (isSupportFilter.value && filterQuery.value && injectOptionsArray.value.length > 0 && visibleOptionsCount === 0) {
      return props.noMatchText || (t('noMatchText') as string);
    }
    if (injectOptionsArray.value.length === 0) {
      return props.noDataText || (t('noDataText') as string);
    }
    return '';
  });

  const isShowEmptyText = computed(() => {
    return !!emptyText.value && (!props.allowCreate || isLoading.value || (props.allowCreate && injectOptionsArray.value.length === 0));
  });

  const isDisabled = (item: OptionObjectItem): boolean => {
    const checkOptionDisabledKey = props.optionDisabledKey ? !!item[props.optionDisabledKey] : false;
    if (!props.multiple) {
      return checkOptionDisabledKey;
    } else {
      let tempModelValue = [];
      tempModelValue = props.modelValue as Array<number | string>;
      return (
        checkOptionDisabledKey ||
        (!!props.multipleLimit && props.multipleLimit <= tempModelValue.length && !tempModelValue.includes(item.value))
      );
    }
  };

  const onFocus = (e: FocusEvent) => {
    ctx.emit('focus', e);
    if (!selectDisabled.value) {
      isSelectFocus.value = true;
    }
    filterQuery.value = '';
  };

  const onBlur = (e: FocusEvent, callBack: (arg0: string) => void) => {
    callBack(modelName.value);
    ctx.emit('blur', e);
    if (!selectDisabled.value) {
      isSelectFocus.value = false;
    }
  };
  // 设置选中项的name
  const setPropsModelName = (newOptions: any[]) => {
    // if (props.modelValue || props.modelValue===0) {
    if (newOptions) {
      const _activeOptions = newOptions.filter((item: { value: ModelValue }) => item.value === props.modelValue);
      modelName.value = _activeOptions[0]?.name || modelName.value;
    }
    // }
  };

  watch(
    () => props.modelValue,
    (oval, nval) => {
      if (nval !== undefined) {
        // 初次进入不校验
        formItemContext?.validate('change').catch((err) => console.warn(err));
      }
      updateInjectOptionsStatus();

      if (props.options) {
        setPropsModelName(props.options);
      }
    },
    { deep: true, immediate: true }
  );
  watch(
    () => props.options,
    (a, b) => {
      const c = b ? b : a;
      setPropsModelName(c);
    },
    { deep: true, immediate: true }
  );
  watch(
    injectOptions,
    () => {
      if (isOpen.value) {
        dropdownRef.value?.updatePosition();
      }
    },
    { deep: true }
  );

  watch(
    isOpen,
    (val) => {
      if (val) {
        dropdownRef.value?.updatePosition();
      }
    },
    { flush: 'post' }
  );

  return {
    selectDisabled,
    selectDisabledBorder,
    selectSize,
    originRef,
    dropdownRef,
    isOpen,
    selectCls,
    mergeOptions,
    selectedOptions,
    filterQuery,
    emptyText,
    isLoading,
    isShowEmptyText,
    handleClear,
    valueChange,
    handleClose,
    updateInjectOptions,
    tagDelete,
    onFocus,
    onBlur,
    isDisabled,
    toggleChange,
    debounceQueryFilter,
    isShowCreateOption,
  };
}
