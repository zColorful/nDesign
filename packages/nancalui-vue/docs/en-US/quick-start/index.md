# Quick Start

Guide you how to use nancalui in your project.

### Vue version

Vue version currently supported ^3.0.0.

### 1. Create a project

It is recommended to use @vite/cli to create your project.

```shell
yarn create vite my-vue-app --template vue-ts
```

### 2. Install

Go to your project folder and use yarn to install nancalui.

```shell
yarn add vue-nancalui

# Optional, font icon library, some demos rely on this font library
# yarn add @nancalui-design/icons
# main.ts file introduction
# import '@nancalui-design/icons/icomoon/nancalui-icon.css'
```

### 3. Import modules and styles

main.ts

```js
import nancalui from 'vue-nancalui';
import 'vue-nancalui/style.css';

createApp(App).use(nancalui).mount('#app');
```

```js
// On-demand introduction
// main.ts file
import { createApp } from 'vue';
import App from './App.vue';

// Step 1: Import a single component
import { Button } from 'vue-nancalui';
// or import Button from 'vue-nancalui/button'
// Step 2: Import component style
// Way 1：Manually import component styles
import 'vue-nancalui/button/style.css';

// Way 2：Automatically introduce components on demand
// vite.config.ts file
// import styleImport from 'vite-plugin-style-import'
//   plugins: [
//       vue(),
//       styleImport({
//         libs: [
//           {
//             libraryName: 'vue-nancalui',
//             esModule: true,
//             resolveStyle: (name) => `vue-nancalui/${name}/style`,
//           },
//         ],
//       })
//     ]

createApp(App)
  .use(Button) // Step 3: Use component
  .mount('#app');
```

### 4. Start development and debugging

```shell
yarn dev
```
