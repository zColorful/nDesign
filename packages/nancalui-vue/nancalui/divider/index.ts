import type { App } from 'vue';
import Divider from './src/divider';

export { Divider };

export default {
  title: 'Divider 分割线',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Divider.name, Divider);
  },
};
