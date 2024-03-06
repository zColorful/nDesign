import type { App } from 'vue';
import Empty from './src/empty';

export * from './src/empty-types';

export { Empty };

export default {
  title: 'Empty 空状态',
  category: '数据展示',
  status: '100%', // TODO 组件完成状态，开发完组件新特性请及时更新该状态值；若组件开发完成则填入'100%'，并删除该注释
  install(app: App): void {
    app.component(Empty.name, Empty);
  }
};
