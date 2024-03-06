import type { App } from 'vue';
import Tooltip from './src/tooltip';

export { Tooltip };

export default {
  title: 'Tooltip 提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Tooltip.name, Tooltip);
  },
};
