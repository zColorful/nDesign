import type { App } from 'vue';
import Tabs from './src/tabs';
import Tab from './src/tab-pane';

export * from './src/interface';

export { Tabs, Tab };

export default {
  title: 'Tabs 选项卡',
  category: '导航',
  status: '100%',
  install(app: App): void {
    app.component(Tabs.name, Tabs);
    app.component(Tab.name, Tab);
  },
};
