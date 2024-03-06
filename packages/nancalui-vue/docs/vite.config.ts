import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: [{ find: '@nancalui', replacement: resolve(__dirname, '../nancalui') }],
  },
  plugins: [vueJsx({}), svgLoader()],
  optimizeDeps: {
    exclude: ['lodash-es', 'mitt', 'async-validator', 'css-vars-ponyfill', 'rxjs', '@vueuse/core', '@floating-ui/dom', 'vue-router'],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
