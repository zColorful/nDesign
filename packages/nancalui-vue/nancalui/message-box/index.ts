import type { App } from 'vue';
import MessageBox from './src/message-box';
import MessageBoxService from './src/message-box-service';
export * from './src/message-box-types';

export { MessageBox, MessageBoxService };

export default {
  title: 'MessageBox 二次确认弹框',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(MessageBox.name, MessageBox);
    app.config.globalProperties.$MessageBoxService = MessageBoxService;
  },
};
