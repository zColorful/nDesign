# Breadcrumb 面包屑

显示当前页面层级的组件。

#### 何时使用

1. 用户需要了解当前出于什么层级时；
2. 用户需要快速返回之前的层级时；
3. 用户需要导航至与指定层级相同的任意页面时。

### 基础面包屑

:::demo

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item to="{ path: '/' }">Homepage</n-breadcrumb-item>
    <n-breadcrumb-item>
      <a href="/">Nancal UI</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <span>Breadcrumb</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

:::

### 传入 source

:::demo

```vue
<template>
  <n-breadcrumb :source="source"></n-breadcrumb>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'DBreadcrumbDemoSourceConfig',
  setup() {
    const source = reactive([
      { title: 'Nancal UI', link: '/', linkType: 'routerLink', replace: true },
      { title: 'Breadcrumb', link: 'components/breadcrumb/', noNavigation: true },
    ]);
    return {
      source,
    };
  },
});
</script>
```

:::

### 自定义分隔符的面包屑

:::demo

```vue
<template>
  <div>
    <n-breadcrumb separator-icon=">">
      <n-breadcrumb-item>
        <a routerLink="/components/zh-cn/get-start">Nancal UI</a>
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <span>Breadcrumb</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
  <div>
    <n-breadcrumb>
      <template v-slot:separatorIcon>
        <span style="color: red">></span>
      </template>
      <n-breadcrumb-item>
        <a routerLink="/components/zh-cn/get-start">Nancal UI</a>
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <span>Breadcrumb</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>
```

:::

### 带下拉菜单的面包屑

:::demo

```vue
<template>
  <n-breadcrumb :source="source"></n-breadcrumb>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'DBreadcrumbDemoDropdown',
  setup() {
    const source = reactive([
      { title: 'Homepage', link: '/', linkType: 'routerLink', replace: true },
      { title: 'Nancal UI', link: '/', noNavigation: true },
      {
        title: 'breadcrumb',
        showMenu: true,
        link: '/components/breadcrumb/',
        target: '_blank',
        children: [
          {
            title: '基础面包屑',
            link: '/components/breadcrumb/#基础面包屑',
          },
          {
            title: '传入source',
          },
          {
            title: '带下拉菜单的面包屑',
          },
        ],
      },
    ]);
    return {
      source,
    };
  },
});
</script>
```

:::

### Breadcrumb 参数

| 参数           | 类型                              | 默认 | 说明                                               | 跳转 Demo                                     |
| :------------- | :-------------------------------- | :--- | :------------------------------------------------- | :-------------------------------------------- |
| separator-icon | `string`                          | '/'  | 可选，自定义分隔符样式                             | [自定义分隔符的面包屑](#自定义分隔符的面包屑) |
| source         | [SourceConfig\[\]](#sourceconfig) | []   | 可选，面包屑根据配置的 source 按照默认渲染方式显示 | [传入 source](#传入source)                    |

### BreadcrumbItem 参数

| 参数    | 类型            | 默认  | 说明                                                               | 跳转 Demo                 |
| :------ | :-------------- | :---- | :----------------------------------------------------------------- | :------------------------ |
| to      | `string/object` | —     | 路由跳转对象，同 vue-router 的 to                                  | [基础面包屑](#基础面包屑) |
| replace | `boolean`       | false | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | [基础面包屑](#基础面包屑) |

### 类型定义

#### breadcrumbChildren

```ts
export interface breadcrumbChildren {
  title: string; // 显示的名称
  link: string; // 跳转的路径，可为绝对路径与相对路径，注意需要与路由的配置一致
  target?: string; // 规定在何处打开链接文档
}
```

#### SourceConfig

```ts
export interface SourceConfig {
  title: string; // 显示的名称
  link?: string; // 跳转的路径
  target?: string; // 规定在何处打开链接文档
  noNavigation?: boolean; // 链接是否不可跳转，一般用于当前所处位置不可跳转的配置
  linkType?: 'hrefLink' | 'routerLink'; // 链接类型，默认为'hrefLink'方式，可选'hrefLink' 或 'routerLink'
  replace: Boolean; // 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
  children?: breadcrumbChildren[]; // 下拉框内的内容
  showMenu?: boolean; // 可选，是否需要显示下拉箭头及下拉列表内容
}
```
