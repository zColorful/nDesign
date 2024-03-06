import type { App } from 'vue';
import CardList from './src/card-list';
export * from './src/card-list-types';
export { CardList };

export default {
  title: 'CardList 卡片列表',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(CardList.name, CardList);
  },
};
