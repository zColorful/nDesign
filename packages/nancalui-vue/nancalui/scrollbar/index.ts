import type { App } from 'vue';
import NScrollbar from './scrollbar.vue';

export { NScrollbar };

export default {
  title: 'Scrollbar 滚动条',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(NScrollbar.name, NScrollbar);
  },
};
