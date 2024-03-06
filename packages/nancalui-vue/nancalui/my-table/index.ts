import type { App } from 'vue';
import MyTable from './src/my-table';

export * from './src/my-table-types';

export { MyTable };

export default {
  title: 'MyTable 复合列表',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(MyTable.name, MyTable);
  },
};
