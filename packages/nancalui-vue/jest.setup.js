import { config } from '@vue/test-utils';
import Icon from './nancalui/icon/src/icon';
import Button from './nancalui/button/src/button';
import Progress from './nancalui/progress/src/progress';
import fileDropDirective from './nancalui/upload/src/file-drop-directive';
config.global.components = {
  'n-icon': Icon,
  'n-button': Button,
  'n-progress': Progress,
};

config.global.directives = {
  FileDrop: fileDropDirective,
};
