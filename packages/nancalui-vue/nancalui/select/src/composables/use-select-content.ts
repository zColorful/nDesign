import { computed, inject, ref, getCurrentInstance } from 'vue';
import { SELECT_TOKEN } from '../const';
import { FORM_ITEM_TOKEN } from '../../../form';
import { OptionObjectItem, UseSelectContentReturnType } from '../select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { className } from '../utils';
import { isFunction } from 'lodash';
import { createI18nTranslate } from '../../../locale/create';

export default function useSelectContent(): UseSelectContentReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);

  const app = getCurrentInstance();
  const t = createI18nTranslate('DSelect', app);

  const searchQuery = ref('');
  const selectedData = computed<OptionObjectItem[]>(() => {
    return select?.selectedOptions || [];
  });
  const modelName = ref('');
  const isSelectDisable = computed<boolean>(() => !!select?.selectDisabled);
  const isSupportCollapseTags = computed<boolean>(() => !!select?.collapseTags);
  const isSupportTagsTooltip = computed<boolean>(() => !!select?.collapseTagsTooltip);
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const isReadOnly = computed<boolean>(() => {
    if (select) {
      return isFunction(select.filter) ? false : !(typeof select.filter === 'boolean' && select.filter);
    } else {
      return true;
    }
  });
  const query = ref('');
  const displayInputValue = computed(() => {
    if (select?.selectedOptions) {
      return select.selectedOptions.length > 1
        ? select.selectedOptions.map((item) => item?.name || item?.value || '').join(',')
        : select.selectedOptions[0]?.name || query.value || '';
      //  select.selectedOptions[0]?.name || select.modelValue || '';
    } else {
      return '';
    }
  });

  // 是否可清空
  const mergeClearable = computed<boolean>(() => {
    return !isSelectDisable.value && !!select?.allowClear && (displayInputValue.value ? true : false);
  });

  // 是否禁用Tooltip
  const isDisabledTooltip = computed<boolean>(() => {
    return !isSupportTagsTooltip.value || !!select?.isOpen;
  });

  const selectionCls = computed(() => {
    return className(ns.e('selection'), {
      [ns.e('clearable')]: mergeClearable.value,
      [ns.em('selection', 'error')]: isValidateError.value,
    });
  });

  const inputCls = computed(() => {
    return className(ns.e('input'), {
      [ns.em('input', 'lg')]: select?.selectSize === 'lg',
      [ns.em('input', 'sm')]: select?.selectSize === 'sm',
    });
  });

  const tagSize = computed(() => select?.selectSize || 'sm');

  const placeholder = computed<string>(() => (displayInputValue.value ? '' : select?.placeholder || t('placeholder')));

  const isMultiple = computed<boolean>(() => !!select?.multiple);

  const tagDelete = (data: OptionObjectItem) => {
    if (data && (data.value || data.value === 0)) {
      select?.tagDelete(data);
    }
  };

  const onFocus = (e: FocusEvent) => {
    select?.onFocus(e);
    // 不用置空
    // if (select?.filter) {
    //   (e.target as HTMLInputElement).value = '';
    // }
  };

  const onBlur = (e: FocusEvent) => {
    select?.onBlur(e, function (val: string) {
      // modelName.value = val ? val : select.modelValue;
      modelName.value = val ? val : '';
    });

    let _displayInputValue = '';
    if (select?.modelValue || select?.modelValue === 0) {
      _displayInputValue = displayInputValue.value;
    }

    // (e.target as HTMLInputElement).value = searchQuery.value || displayInputValue.value || '';
    (e.target as HTMLInputElement).value = searchQuery.value || modelName.value || _displayInputValue || '';
  };

  const queryFilter = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    query.value = (e.target as HTMLInputElement).value;

    if (!isReadOnly.value && select?.debounceQueryFilter) {
      select?.debounceQueryFilter(query.value);
    }
  };
  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    select?.handleClear();
    query.value = '';
    if (!isReadOnly.value && select?.debounceQueryFilter) {
      select?.debounceQueryFilter(query.value);
    }
  };

  return {
    searchQuery,
    selectedData,
    isSelectDisable,
    isSupportCollapseTags,
    isDisabledTooltip,
    isReadOnly,
    selectionCls,
    inputCls,
    tagSize,
    placeholder,
    isMultiple,
    displayInputValue,
    handleClear,
    tagDelete,
    onFocus,
    onBlur,
    queryFilter,
  };
}
