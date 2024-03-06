/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define */
import { ref, SetupContext, toRef, reactive, provide, watch, onMounted, toRefs, computed } from 'vue';
import { cloneDeep, debounce, isFunction, isNull, isUndefined } from 'lodash';
import type { CascaderProps } from '../src/cascader-types';
import { popupHandles } from './use-cascader-popup';
import { useRootStyle } from './use-cascader-style';
import { useRootClassName } from './use-cascader-class';
import { useFormItem } from '../../shared/_utils/use-form-item';
import { CascaderOption, CascaderOptionInfo } from '../src/interface';
import { BaseType, UnionType } from '../../shared/_utils/types';
import {
  getCheckedStatus,
  getLeafOptionInfos,
  getLeafOptionKeys,
  getOptionInfos,
  getOptionLabel,
  getValidValues,
  getValueKey,
} from '../src/utils';
import { useSelectedPath } from './use-selected-path';
import { cascaderInjectionKey } from '../src/context';
import { getKeyDownHandler, KEYBOARD_KEY } from '../../shared/_utils/keyboard';

export const useCascader = (props: CascaderProps, ctx: SetupContext) => {
  const origin = ref<HTMLElement>();
  const overlayRef = ref<HTMLElement>();
  const multiple = toRef(props, 'multiple');
  const inputValue = ref('');
  const rootStyle = useRootStyle(props);
  const showClearable = ref(false);
  const position = ref(['bottom-start', 'top-start']);
  const { emit, slots } = ctx;
  const { disabled, modelValue, options, trigger, loadMore, formatLabel, checkStrictly, valueKey, expandChild } = toRefs(props);

  const _value = ref();
  const _inputValue = ref();

  const { mergedDisabled } = useFormItem({ disabled });
  const computedInputValue = computed(() => props.inputValue ?? _inputValue.value);
  const computedPopupVisible = computed(() => props.popupVisible ?? menuShow.value);
  // popup弹出层
  const { menuShow, menuOpenClass, openPopup } = popupHandles(props, overlayRef, origin);
  // 配置class
  const rootClasses = useRootClassName(props, computedPopupVisible as any);

  watch(modelValue, (value) => {
    if (isUndefined(value) || isNull(value)) {
      _value.value = props.multiple ? [] : undefined;
    }
  });

  const optionInfos = ref<CascaderOptionInfo[]>([]);
  const totalLevel = ref(1);

  const optionMap = reactive(new Map<string, CascaderOptionInfo>());
  const leafOptionMap = reactive(new Map<string, CascaderOptionInfo>());
  const leafOptionValueMap = reactive(new Map<BaseType, string>());
  const leafOptionSet = reactive(new Set<CascaderOptionInfo>());

  const lazyLoadOptions = reactive<Record<string, CascaderOption[]>>({});

  const addLazyLoadOptions = (children: CascaderOption[], key: string) => {
    lazyLoadOptions[key] = children;
  };

  const DEFAULT_FIELD_NAMES = {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
    children: 'children',
    render: 'render',
    isLeaf: 'isLeaf',
  };

  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...props.fieldNames,
  }));

  //  选项变化直接重新生成map信息
  watch(
    [options, lazyLoadOptions, mergedFieldNames],
    ([_options, _lazyLoadOptions, _fieldNames]) => {
      optionMap.clear();
      leafOptionMap.clear();
      leafOptionValueMap.clear();
      leafOptionSet.clear();

      optionInfos.value = getOptionInfos(_options ?? [], {
        enabledLazyLoad: Boolean(props.loadMore),
        lazyLoadOptions,
        optionMap,
        leafOptionSet,
        leafOptionMap,
        leafOptionValueMap,
        totalLevel,
        checkStrictly,
        valueKey,
        fieldNames: _fieldNames,
      });
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const computedValueMap = computed(() => {
    const values = getValidValues(props.modelValue ?? _value.value, {
      multiple: props.multiple,
      pathMode: props.pathMode,
    });
    return new Map(
      values.map((value) => [
        getValueKey(value, {
          valueKey: props.valueKey,
          leafOptionValueMap,
        }),
        value,
      ])
    );
  });

  const getFilteredStatus = (label: string) => {
    return label?.toLocaleLowerCase().includes(computedInputValue.value?.toLocaleLowerCase());
  };

  const filteredLeafOptions = computed(() => {
    let _a;
    (_a = overlayRef.value) == null ? void 0 : _a.updatePosition();
    const opts = props.checkStrictly ? Array.from(optionMap.values()) : Array.from(leafOptionSet);

    return opts.filter((item) => {
      if (isFunction(props.filterOption)) {
        let _query = '';
        _query = computedInputValue.value.replace(/\\|'/g, '');
        return props.filterOption(_query, item);
      }
      if (props.checkStrictly) {
        return getFilteredStatus(item.label);
      }
      return item.path?.find((leaf) => getFilteredStatus(leaf.label));
    });
    // if (isFunction(props.filterOption)) {
    //   let _query = '';
    //   _query = computedInputValue.value.replace(/\\|'/g, '');
    //   return props.filterOption(_query, opts);
    // } else {
    //   return opts.filter((item) => {
    //     if (props.checkStrictly) {
    //       return getFilteredStatus(item.label);
    //     }
    //     return item.path?.find((leaf) => getFilteredStatus(leaf.label));
    //   });
    // }
  });
  const updateValue = (values: UnionType[] | UnionType[][]) => {
    const value = props.multiple ? values : values[0] ?? '';
    if (values.length === 0) {
      setSelectedPath();
      setActiveKey();
    }

    _value.value = value;
    emit('update:modelValue', value);
    emit('change', value);
  };

  const handlePopupVisibleChange = (visible: boolean): void => {
    if (computedPopupVisible.value !== visible) {
      menuShow.value = visible;
      emit('popupVisibleChange', visible);
    }
  };

  const handleRemove = (key: string) => {
    if (props.multiple) {
      const option = leafOptionMap.get(key);
      if (option) {
        selectMultiple(option, false);
      } else {
        const values: any[] = [];
        computedValueMap.value.forEach((value, _key) => {
          if (_key !== key) {
            values.push(value);
          }
        });
        updateValue(values);
      }
    }
  };

  const selectSingle = (option: CascaderOptionInfo) => {
    updateValue([props.pathMode ? option.pathValue : option.value]);
    handlePopupVisibleChange(false);
  };

  const selectMultiple = (option: CascaderOptionInfo, checked: boolean) => {
    if (checked) {
      const leafOptionInfos = props.checkStrictly ? [option] : getLeafOptionInfos(option);

      updateValue([
        ...computedValueMap.value.values(),
        ...leafOptionInfos
          .filter((item) => !computedValueMap.value.has(item.key))
          .map((item) => {
            return props.pathMode ? item.pathValue : item.value;
          }),
      ]);
    } else {
      const leafOptionKeys = props.checkStrictly ? [option.key] : getLeafOptionKeys(option);
      const values: any[] = [];
      computedValueMap.value.forEach((value, key) => {
        if (!leafOptionKeys.includes(key)) {
          values.push(value);
        }
      });
      updateValue(values);
    }

    handleInputValueChange('', 'optionChecked');
  };

  const handleClickOption = (option: CascaderOptionInfo, checked?: boolean) => {
    if (props.multiple) {
      selectMultiple(option, checked ?? true);
    } else {
      selectSingle(option);
    }
  };

  const handleSearch = debounce((value: string) => {
    emit('search', value);
  }, props.debounce);

  const handleInputValueChange = (value: string, reason: string): void => {
    if (value !== computedInputValue.value) {
      if (reason === 'manual' && !computedPopupVisible.value) {
        menuShow.value = true;
        emit('popupVisibleChange', true);
      }

      _inputValue.value = value;
      emit('inputValueChange', value);

      if (props.filterable) {
        handleSearch(value);
      }
    }
  };

  watch(computedPopupVisible, (value) => {
    if (value) {
      if (computedValueMap.value.size > 0) {
        const keys = Array.from(computedValueMap.value.keys());
        const lastKey = keys[keys.length - 1];
        const option = leafOptionMap.get(lastKey);
        if (option && option.key !== activeKey.value) {
          setSelectedPath(option.key);
          setActiveKey(option.key);
        }
      }
    } else {
      if (computedValueMap.value.size === 0) {
        setSelectedPath();
        setActiveKey();
      }
      handleInputValueChange('', 'optionListHide');
    }
  });

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    if (props.multiple) {
      // 保留已经被选中但被disabled的选项值
      const newValues: any[] = [];
      computedValueMap.value.forEach((value, key) => {
        const option = leafOptionMap.get(key);
        if (option?.disabled) {
          newValues.push(props.pathMode ? option.pathValue : option.value);
        }
      });
      updateValue(newValues);
    } else {
      updateValue([]);
    }
    handleInputValueChange('', 'manual');
    emit('clear');
  };

  const showSearchPanel = computed(() => props.filterable && computedInputValue.value?.length > 0);

  const handleFocus = (e: FocusEvent) => {
    emit('focus', e);
  };
  const handleBlur = (e: FocusEvent) => {
    emit('blur', e);
  };

  const { activeKey, activeOption, selectedPath, displayColumns, setActiveKey, setSelectedPath, getNextActiveNode } = useSelectedPath(
    optionInfos,
    {
      optionMap,
      filteredLeafOptions,
      showSearchPanel,
      expandChild,
    }
  );

  const handleKeyDown = getKeyDownHandler(
    new Map([
      [
        KEYBOARD_KEY.ENTER,
        (ev: Event) => {
          if (computedPopupVisible.value) {
            if (activeOption.value) {
              let checked: boolean;
              if (props.checkStrictly || activeOption.value.isLeaf) {
                checked = !computedValueMap.value.has(activeOption.value.key);
              } else {
                checked = !getCheckedStatus(activeOption.value, computedValueMap.value).checked;
              }
              setSelectedPath(activeOption.value.key);
              handleClickOption(activeOption.value, checked);
            }
          } else {
            handlePopupVisibleChange(true);
          }
        },
      ],
      [
        KEYBOARD_KEY.ESC,
        (ev: Event) => {
          handlePopupVisibleChange(false);
        },
      ],
      [
        KEYBOARD_KEY.ARROW_DOWN,
        (ev: Event) => {
          ev.preventDefault();
          const activeNode = getNextActiveNode('next');
          setActiveKey(activeNode?.key);
        },
      ],
      [
        KEYBOARD_KEY.ARROW_UP,
        (ev: Event) => {
          ev.preventDefault();
          const activeNode = getNextActiveNode('preview');
          setActiveKey(activeNode?.key);
        },
      ],
      [
        KEYBOARD_KEY.ARROW_RIGHT,
        (ev: Event) => {
          if (!showSearchPanel.value) {
            ev.preventDefault();
            if (activeOption.value?.children) {
              setSelectedPath(activeOption.value.key);
              setActiveKey(activeOption.value.children[0]?.key);
            }
          }
        },
      ],
      [
        KEYBOARD_KEY.ARROW_LEFT,
        (ev: Event) => {
          if (!showSearchPanel.value) {
            ev.preventDefault();
            if (activeOption.value?.parent) {
              setSelectedPath(activeOption.value.parent.key);
              setActiveKey(activeOption.value.parent.key);
            }
          }
        },
      ],
    ])
  );

  const selectViewValue = computed(() => {
    const result: any[] = [];
    computedValueMap.value.forEach((value, key) => {
      const option = leafOptionMap.get(key);
      if (option) {
        result.push({
          value: key,
          option,
          label: props.formatLabel?.(option.path.map((item) => item.raw)) ?? getOptionLabel(option),
          closable: !option.disabled,
          tagProps: option.tagProps,
        });
      }
    });
    return result;
  });

  const showClear = () => {
    if (props.disabled) {
      return;
    }
    showClearable.value = true;
  };
  const hideClear = () => {
    showClearable.value = false;
  };

  onMounted(() => {
    origin.value?.addEventListener('click', openPopup);
  });

  provide(
    cascaderInjectionKey,
    //  @ts-ignore
    reactive({
      onClickOption: handleClickOption,
      setActiveKey,
      setSelectedPath,
      loadMore,
      addLazyLoadOptions,
      formatLabel,
      expandTrigger: trigger,
      slots,
      valueMap: computedValueMap,
    })
  );

  return {
    origin,
    overlayRef,
    menuShow,
    rootClasses,
    menuOpenClass,
    inputValue,
    openPopup,
    rootStyle,
    showClearable,
    position,
    showClear,
    hideClear,
    multiple,

    optionInfos,
    filteredLeafOptions,
    selectedPath,
    activeKey,
    displayColumns,
    computedInputValue,
    computedPopupVisible,
    handleClear,
    selectViewValue,
    handleInputValueChange,
    showSearchPanel,
    handlePopupVisibleChange,
    handleFocus,
    handleBlur,
    handleRemove,
    mergedDisabled,
    totalLevel,
  };
};
