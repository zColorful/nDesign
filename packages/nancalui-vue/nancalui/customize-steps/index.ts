import type { App } from 'vue';
import CustomizeSteps from './src/customize-steps';
export * from './src/customize-steps-types';
export { CustomizeSteps };

export default {
  title: 'CustomizeSteps 自定义步骤条',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(CustomizeSteps.name, CustomizeSteps);
  },
};
