import type { App } from 'vue';
import PermissionButton from './src/permission-button';

export * from './src/permission-button-types';

export { PermissionButton };

export default {
  title: 'PermissionButton 权限按钮',
  category: '复合组件',
  status: '100%',
  install(app: App): void {
    app.component(PermissionButton.name, PermissionButton);
  },
};
