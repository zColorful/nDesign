import nancalui from '../../../nancalui/vue-nancalui';
import Locale from '../../../nancalui/locale';
import Theme from '../nancalui-theme';
import 'vitepress-theme-demoblock/theme/styles/index.css';
import { registerComponents } from './register-components.js';
import { insertBaiduScript } from './insert-baidu-script';

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Locale).use(nancalui);
    registerComponents(app);
    insertBaiduScript();
  },
};
