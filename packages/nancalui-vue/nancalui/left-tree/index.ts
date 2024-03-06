import type { App } from 'vue';
import LeftTree from './src/left-tree';
export * from './src/left-tree-types';
export { LeftTree };

export default {
  title: 'LeftTree 左侧树',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(LeftTree.name, LeftTree);
  },
};
