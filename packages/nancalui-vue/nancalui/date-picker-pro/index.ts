import type { App } from 'vue';
import DatePickerPro from './src/date-picker-pro';
import NRangeDatePickerPro from './src/components/range-date-picker-pro';

export * from './src/date-picker-pro-types';

export { DatePickerPro, NRangeDatePickerPro };

export default {
  title: 'DatePickerPro 日期选择器',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(DatePickerPro.name, DatePickerPro);
    app.component(NRangeDatePickerPro.name, NRangeDatePickerPro);
  },
};
