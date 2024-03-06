import type { App } from 'vue';
import Descriptions from './src/descriptions';
export * from './src/descriptions-types';
export { Descriptions };

export default {
  title: 'Descriptions 描述列表',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Descriptions.name, Descriptions);
  },
};
