import type { App } from 'vue';
import DynamicWiden from './src/dynamic-widen';
export * from './src/dynamic-widen-types';
export { DynamicWiden };

export default {
  title: 'DynamicWiden 拖拽左右布局',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(DynamicWiden.name, DynamicWiden);
  },
};
