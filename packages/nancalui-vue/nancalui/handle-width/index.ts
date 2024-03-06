import type { App } from 'vue';
import HandleWidth from './src/handle-width';
export * from './src/handle-width-types';
export { HandleWidth };

export default {
  title: 'HandleWidth 拖拽宽高组件',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(HandleWidth.name, HandleWidth);
  },
};
