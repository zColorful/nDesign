import { shallowRef, ref, computed, inject, watch } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProProps, UseDatePickerProReturnType } from './date-picker-pro-types';
import { onClickOutside } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import { formatDayjsToStr, isDateEquals, parserDate } from './utils';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';
import { DEFAULT_DATE, DEFAULT_TIME } from './const';

export default function usePickerPro(
  props: DatePickerProProps,
  ctx: SetupContext,
  t: (path: string) => unknown
): UseDatePickerProReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);

  const originRef = ref<HTMLElement>();
  const inputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();
  const isPanelShow = ref(false);
  const placeholder = computed(() => props.placeholder || (t('placeholder') as string));
  const isMouseEnter = ref(false);

  const pickerDisabled = computed(() => formContext?.disabled || props.disabled);
  const pickerSize = computed(() => formContext?.size || props.size);
  const isValidateError = computed(() => formItemContext?.validateState === 'error');

  const toggleChange = (isShow: boolean) => {
    isPanelShow.value = isShow;
    ctx.emit('toggleChange', isShow);
    if (!isShow) {
      ctx.emit('blur');
    }
  };

  onClickOutside(
    overlayRef,
    () => {
      toggleChange(false);
    },
    { ignore: [originRef] }
  );

  const onFocus = function (e: MouseEvent) {
    toggleChange(true);
    ctx.emit('focus', e);
  };

  const format = computed(() => {
    return props.showTime ? props.format || DEFAULT_TIME : props.format || DEFAULT_DATE;
  });

  const dateValue = computed(() => {
    let result;
    if (props.modelValue) {
      result = parserDate(props.modelValue);
    }
    return result;
  });

  const displayDateValue = computed(() => {
    const formatDate = formatDayjsToStr(dateValue.value, format.value, props.type);
    if (formatDate) {
      return formatDate;
    }
    return '';
  });

  const showCloseIcon = computed(() => isMouseEnter.value && (props.modelValue ? true : false));
  /**
   * 时间格式化函数, 按照指定格式化字符串格式化传入时间
   *
   * @param {Date} time 需要格式化的时间
   * @param {String} fmStr 定义时间的格式
   * 		YYYY: 代表四位数年份
   * 		  YY: 代表两位数年份
   * 		  MM: 代表月份(小于10时补0)
   * 		  DD: 代表日期(小于10时补0)
   * 		  HH: 代表小时(小于10时补0)
   * 		  mm: 代表分钟(小于10时补0)
   * 		  ss: 代表秒数(小于10时补0)
   * 		 SSS: 代表毫秒数
   * 		   w: 代表周几(数字)
   * 		   W: 代表周几(中文)
   * 		  ww: 代表周几(英文)
   * @returns {String} 返回格式化的时间
   */
  Date.prototype.format = function (fmStr) {
    const weekCN = '一二三四五六日';
    const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const monthEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const year = this.getFullYear();
    let month = this.getMonth() + 1;
    let day = this.getDate();
    let hours = this.getHours();
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    const milliSeconds = this.getMilliseconds();
    const week = this.getDay();

    if (fmStr.indexOf('YYYY') !== -1) {
      fmStr = fmStr.replace('YYYY', year);
    } else {
      fmStr = fmStr.replace('YY', (year + '').slice(2));
    }
    if (fmStr.indexOf('MMM') !== -1) {
      fmStr = fmStr.replace('MMM', monthEN[month - 1]);
    } else if (fmStr.indexOf('MM') !== -1) {
      month = month >= 10 ? month : '0' + month;
      fmStr = fmStr.replace('MM', month);
    } else {
      fmStr = fmStr.replace('M', month);
    }
    if (fmStr.indexOf('DD') !== -1) {
      day = day >= 10 ? day : '0' + day;
      fmStr = fmStr.replace('DD', day);
    } else {
      fmStr = fmStr.replace('D', day);
    }
    if (fmStr.indexOf('HH') !== -1) {
      hours = hours >= 10 ? hours : '0' + hours;
      fmStr = fmStr.replace('HH', hours);
    } else {
      fmStr = fmStr.replace('H', hours);
    }
    if (fmStr.indexOf('hh') !== -1) {
      hours = hours % 12 === 0 ? 12 : hours % 12;
      hours = hours >= 10 ? hours : '0' + hours;
      fmStr = fmStr.replace('hh', hours);
    } else {
      hours = hours % 12 === 0 ? 12 : hours % 12;
      fmStr = fmStr.replace('h', hours);
    }

    if (fmStr.indexOf('mm') !== -1) {
      minutes = minutes >= 10 ? minutes : '0' + minutes;
      fmStr = fmStr.replace('mm', minutes);
    } else {
      fmStr = fmStr.replace('m', minutes);
    }
    if (fmStr.indexOf('ss') !== -1) {
      seconds = seconds >= 10 ? seconds : '0' + seconds;
      fmStr = fmStr.replace('ss', seconds);
    } else {
      fmStr = fmStr.replace('s', seconds);
    }
    fmStr = fmStr.replace('SSS', milliSeconds);
    fmStr = fmStr.replace('W', weekCN[week - 1]);
    fmStr = fmStr.replace('ww', weekEN[week - 1]);
    fmStr = fmStr.replace('w', week);
    return fmStr;
  };

  const onSelectedDate = (date: Dayjs, isConfirm?: boolean) => {
    const time = date ? date.toDate() : date;
    const result = props.valueFormat ? time.format(props?.format || 'YYYY-MM-DD') : time;
    if (!isDateEquals(props.modelValue, result)) {
      ctx.emit('update:modelValue', result ? result : '');
    }
    if (isConfirm) {
      ctx.emit('confirmEvent', result ? result : '');
      toggleChange(false);
    }
  };

  const handlerClearTime = (e: MouseEvent) => {
    if (!showCloseIcon.value) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    ctx.emit('update:modelValue', '');
    ctx.emit('confirmEvent', '');
    if (isPanelShow.value) {
      setTimeout(() => {
        inputRef.value?.focus();
      });
    }
  };

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    },
    { deep: true }
  );

  return {
    originRef,
    inputRef,
    overlayRef,
    isPanelShow,
    placeholder,
    format,
    dateValue,
    displayDateValue,
    isMouseEnter,
    showCloseIcon,
    pickerDisabled,
    pickerSize,
    isValidateError,
    onFocus,
    onSelectedDate,
    handlerClearTime,
  };
}
