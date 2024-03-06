import { defineCliConfig } from 'nancalui-cli';

export default defineCliConfig({
  componentRootDir: './nancalui',
  libClassPrefix: 'nancalui',
  libEntryFileName: 'vue-nancalui',
  libEntryRootDir: './nancalui',
  libPrefix: 'N',
  libStyleFileSuffix: '.scss',
});
