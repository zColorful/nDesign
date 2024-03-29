const { relative } = require('path');
const { INDEX_FILE_NAME, VERSION, VUE_nancalui_FILE } = require('../shared/constant');

exports.createVuenancaluiTemplate = (exportModules = []) => {
  const packages = [];
  const imports = [];
  const installs = [];

  exportModules.forEach((m) => {
    const { fileInfo } = m;
    const relativePath = relative(VUE_nancalui_FILE, fileInfo.path)
      .replace(/\\/g, '/')
      .replace('..', '.')
      .replace('/' + INDEX_FILE_NAME, '');

    const importStr = `import ${m.default}, { ${m.parts.join(', ')} } from '${relativePath}';`;

    packages.push(...m.parts);
    imports.push(importStr);
    installs.push(m.default);
  });

  const template = `\
import type { App } from 'vue';

${imports.join('\n')}
import './style/nancalui.scss';

const installs = [
  ${installs.join(',\n  ')}
];

export {
  ${packages.join(',\n  ')}
};

export default {
  version: '${VERSION}',
  install(app: App): void {
    installs.forEach((p) => app.use(p));
  }
};
`;

  return template;
};
