import type { App } from 'vue';
import Cascader from './src/cascader';

export { Cascader };

export default {
  title: 'Cascader 级联菜单',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component('NCascader', Cascader);
  },
};
