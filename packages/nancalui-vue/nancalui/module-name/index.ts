import type { App } from 'vue';
import ModuleName from './src/module-name';
export * from './src/module-name-types';
export { ModuleName };

export default {
  title: 'ModuleName 标题',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(ModuleName.name, ModuleName);
  },
};
