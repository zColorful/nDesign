import { computed, inject, toRef, provide, watch } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { FORM_TOKEN, FORM_ITEM_TOKEN } from '../../form';
import {
  CheckboxProps,
  UseCheckboxFn,
  checkboxGroupInjectionKey,
  CheckboxGroupProps,
  UseCheckboxGroupFn,
  UseCheckboxButtonFn,
} from './checkbox-types';

export function useCheckbox(props: CheckboxProps, ctx: SetupContext): UseCheckboxFn {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const checkboxGroupConf = inject(checkboxGroupInjectionKey, null);

  const isChecked = computed(() => props.modelValue === props.activeValue);
  const mergedChecked = computed(() => {
    return checkboxGroupConf?.isItemChecked?.(props.value) ?? isChecked.value;
  });
  const isLimitDisabled = computed(() => {
    const max = checkboxGroupConf?.max.value;
    return !!max && checkboxGroupConf?.modelValue.value.length >= max && !mergedChecked.value;
  });
  const mergedDisabled = computed(() => {
    return checkboxGroupConf?.disabled.value || props.disabled || formContext?.disabled || isLimitDisabled.value;
  });
  const mergedIsShowTitle = computed(() => {
    return checkboxGroupConf?.isShowTitle.value ?? props.isShowTitle;
  });
  const mergedShowAnimation = computed(() => {
    return checkboxGroupConf?.showAnimation.value ?? props.showAnimation;
  });
  const mergedColor = computed(() => {
    return checkboxGroupConf?.color.value ?? props.color;
  });
  const itemWidth = checkboxGroupConf?.itemWidth.value;
  const direction = checkboxGroupConf?.direction.value;

  const canChange = (checked: boolean, val: string | undefined | number | boolean) => {
    if (mergedDisabled.value) {
      return Promise.resolve(false);
    }

    const beforeChange = props.beforeChange ?? checkboxGroupConf?.beforeChange;
    if (beforeChange) {
      const res = beforeChange(checked, val);
      if (typeof res === 'boolean') {
        return Promise.resolve(res);
      }
      return res;
    }
    return Promise.resolve(true);
  };
  const toggle = (evt: Event) => {
    const current = !isChecked.value;
    const data = current ? props.activeValue : props.unactiveValue;
    checkboxGroupConf?.toggleGroupVal(props.value);
    ctx.emit('update:checked', data);
    ctx.emit('update:modelValue', data);
    ctx.emit('change', data, evt);
  };
  const handleClick = (evt: Event) => {
    canChange(!isChecked.value, props.modelValue).then((res) => res && toggle(evt));
  };
  const size = computed(() => formContext?.size || checkboxGroupConf?.size.value || props.size);
  const border = computed(() => checkboxGroupConf?.border.value ?? props.border);
  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    }
  );
  return {
    mergedChecked,
    mergedDisabled,
    mergedIsShowTitle,
    mergedShowAnimation,
    mergedColor,
    itemWidth,
    direction,
    handleClick,
    size,
    border,
  };
}

type IModelValue = Ref<(string | number | { value: string })[]>;

export function useCheckboxGroup(props: CheckboxGroupProps, ctx: SetupContext): UseCheckboxGroupFn {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const valList = toRef(props, 'modelValue') as IModelValue;

  const defaultOpt = {
    checked: false,
    isShowTitle: true,
    halfChecked: false,
    showAnimation: true,
    disabled: false,
  };
  const toggleGroupVal = (val: string | number | undefined) => {
    let index = -1;
    const type = valList?.value && valList?.value[0];
    if (['string', 'number'].includes(typeof type)) {
      index = valList.value.findIndex((item) => item === val);
    } else if (typeof type === 'object') {
      index = (valList.value as { value: string }[]).findIndex((item) => item?.value === val);
    }

    if (index === -1) {
      const list = valList?.value || [];
      if (typeof props.options[0] === 'object') {
        const newOne = props.options.find((item) => item.value === val);
        const res = [...list, newOne];
        ctx.emit('update:modelValue', res);
        ctx.emit('change', res);
        return;
      }
      const res = [...list, val];
      ctx.emit('update:modelValue', res);
      ctx.emit('change', res);
      return;
    }
    valList.value?.splice(index, 1);
    ctx.emit('update:modelValue', valList.value);
    ctx.emit('change', valList.value);
  };
  const isItemChecked = (itemVal: string | number | undefined) => {
    const type = valList?.value && valList?.value[0];
    if (['string', 'number'].includes(typeof type)) {
      return valList.value.includes(itemVal as never);
    } else if (typeof type === 'object') {
      return (valList.value as { value: string }[]).some((item) => item?.value === itemVal);
    }
  };
  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    },
    { deep: true }
  );

  provide(checkboxGroupInjectionKey, {
    disabled: toRef(props, 'disabled'),
    isShowTitle: toRef(props, 'isShowTitle'),
    color: toRef(props, 'color'),
    showAnimation: toRef(props, 'showAnimation'),
    beforeChange: props.beforeChange,
    isItemChecked,
    toggleGroupVal,
    itemWidth: toRef(props, 'itemWidth'),
    direction: toRef(props, 'direction'),
    size: toRef(props, 'size'),
    border: toRef(props, 'border'),
    max: toRef(props, 'max'),
    modelValue: toRef(props, 'modelValue'),
    textColor: toRef(props, 'textColor'),
  });
  return { defaultOpt };
}

export function useCheckboxButton(): UseCheckboxButtonFn {
  const checkboxGroupConf = inject(checkboxGroupInjectionKey, null);
  const mergedTextColor = computed(() => {
    return checkboxGroupConf?.textColor.value ?? undefined;
  });

  return {
    mergedTextColor,
  };
}