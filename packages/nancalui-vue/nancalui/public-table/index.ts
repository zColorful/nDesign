import type { App } from 'vue';
import PublicTable from './src/public-table';

export * from './src/public-table-types';

export { PublicTable };

export default {
  title: 'PublicTable 复合列表',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(PublicTable.name, PublicTable);
  },
};
