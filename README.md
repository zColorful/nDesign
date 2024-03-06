<p align="center">
  <a href="https://nancalui.design/" target="_blank" rel="noopener noreferrer">
    <img alt="nancalui Logo" src="https://vue-nancalui.github.io/assets/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Vue Nancal UI</h1>

<p align="center">Vue3 component library based on <a href="https://nancalui.design/" target="_blank" rel="noopener noreferrer">nancalui Design</a></p>

English | [简体中文](README.zh-CN.md)

🌈 Features：

- 📦 55 high-quality components that are simple, easy to use, and flexible.
- 🔑 Support for TypeScript.
- ⛰️ Support for Nuxt3.
- ⚡ Support for on-demand import.
- 🌍 Support internationalization.
- 🎨 Support theme customization, and built-in seven beautiful themes such as `Galaxy`, `Sweet` and `Provence`.

## 🔧 Usage

First install vue-nancalui with npm, yarn or pnpm.

Install with npm

```sh
npm install vue-nancalui --save
```

Install with yarn

```sh
yarn add vue-nancalui
```

Install with pnpm

```sh
pnpm add vue-nancalui
```

Then import `nancalui` in the `main.ts` file:

```ts
import { createApp } from 'vue';
import App from './App.vue';

// Import Vue Nancal UI component and style
import nancalui from 'vue-nancalui';
import 'vue-nancalui/style.css';

createApp(App).use(nancalui).mount('#app');
```

Then you can use the Vue Nancal UI component(such as `<n-button>`) in the `App.vue` file:

```vue
<template>
  <n-button>Button</n-button>
</template>
```

## 🖥️ Development

```sh
http://139.9.159.225:8200/nc-web/nancal-ui.git
cd vue-nancalui
pnpm install
pnpm dev
```

Open your browser and visit: [http://localhost:3000/](http://localhost:3000/).

Or you can run other command

```sh
pnpm scripts
```

## 🤝 Contributing

Welcome to join our Vue Nancal UI open source project!🎉

By participating in the Vue Nancal UI project, we can together:

- 🔥 Learn the latest cool `Vite` + `Vue3` + `TypeScript` + `JSX` technology.
- 🎁 Learn how to design and develop UI components.
- ⭐ Hone programming skills and learn excellent programming practice.
- 🎊 Meet a group of friends who love learning and open source.
