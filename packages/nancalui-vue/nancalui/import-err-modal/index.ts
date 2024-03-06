import type { App } from 'vue';
import ImportErrModal from './src/import-err-modal';
export * from './src/import-err-modal-types';
export { ImportErrModal };

export default {
  title: 'ImportErrModal 错误提示框',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(ImportErrModal.name, ImportErrModal);
  },
};
