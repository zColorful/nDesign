<p align="center">
  <a href="https://nancalui.design/" target="_blank" rel="noopener noreferrer">
    <img alt="nancalui Logo" src="https://vue-nancalui.github.io/assets/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Vue Nancal UI</h1>

<p align="center">一个基于 <a href="https://nancalui.design/" target="_blank" rel="noopener noreferrer">nancalui Design</a> 的 Vue3 组件库。</p>

[English](README.md) | 简体中文

🌈 特性：

- 📦 包含 55 个简洁、易用、灵活的高质量组件
- 🔑 支持 TypeScript
- ⛰️ 支持 Nuxt3
- ⚡ 支持按需引入
- 🌍 支持国际化
- 🎨 支持主题定制，并内置 追光 / 蜜糖 / 紫罗兰 等 7 种漂亮的主题

## 🔧 如何使用

### 1. 安装

```
npm i vue-nancalui
```

### 2. 引入

在`main.ts`文件中引入`vue-nancalui`。

```ts
import { createApp } from 'vue';
import App from './App.vue';

// 引入 Vue Nancal UI 组件库及样式
import nancalui from 'vue-nancalui';
import 'vue-nancalui/style.css';

createApp(App).use(nancalui).mount('#app');
```

### 3. 使用

在`App.vue`文件中使用 Vue Nancal UI 组件。

```vue
<template>
  <n-button>确定</n-button>
</template>
```

## 🖥️ 本地开发

```shell
http://139.9.159.225:8200/nc-web/nancal-ui.git
cd vue-nancalui
pnpm i
pnpm dev
```

打开浏览器访问：[http://localhost:3000/](http://localhost:3000/)

或者你也可以运行以下命令：

```sh
pnpm scripts
```

## 🤝 参与贡献

欢迎你参与到 Vue Nancal UI 项目的建设中来！🎉

通过参与 Vue Nancal UI 项目，我们可以一起：

- 🔥 学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术
- 🎁 学习如何设计和开发组件
- ⭐ 磨练编程技能，学习优秀的编程实践
- 🎊 结识一群热爱学习、热爱开源的朋友
