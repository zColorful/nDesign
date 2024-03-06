import { App } from 'vue';
import Anchor from './src/anchor';
import nAnchorBox from './src/n-anchor-box';
import nAnchorLink from './src/n-anchor-link';
import nAnchor from './src/n-anchor';
import './src/anchor.scss';

export { Anchor };

export default {
  title: 'Anchor 锚点',
  category: '导航',
  status: '100%',
  install(app: App): void {
    app.directive(nAnchor.name, nAnchor);
    app.directive(nAnchorLink.name, nAnchorLink);
    app.directive(nAnchorBox.name, nAnchorBox);
    app.component(Anchor.name, Anchor);
  }
};
