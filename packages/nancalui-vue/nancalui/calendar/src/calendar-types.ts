import { buildProps, definePropType } from '../../table-v/src/utils';
import type { ExtractPropTypes } from 'vue';
import { isDate, isArray } from '@vue/shared';

export type CalendarDateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';

const isValidRange = (range: unknown): range is [Date, Date] => isArray(range) && range.length === 2 && range.every((item) => isDate(item));

export const calendarProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: Date,
  },
  /**
   * @description time range, including start time and end time.
   *   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
   */
  range: {
    type: definePropType<[Date, Date]>(Array),
    validator: isValidRange,
  },
} as const);
export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmits = {
  'update:modelValue': (value: Date) => isDate(value),
  input: (value: Date) => isDate(value),
};
export type CalendarEmits = typeof calendarEmits;
