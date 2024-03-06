# Layout 布局

页面的布局方式。

#### 何时使用

当用户需要直接使用一些既有布局时。

### 基本用法

::: demo

```vue
<template>
  <n-layout>
    <n-header class="nheader">Header</n-header>
    <n-content class="ncontent">Content</n-content>
    <n-footer class="nfooter">Footer</n-footer>
  </n-layout>
</template>

<style>
.nheader,
.nfooter {
  background: #333854;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.ncontent {
  height: 200px;
  line-height: 200px;
  text-align: center;
}
</style>
```

:::

:::demo

```vue
<template>
  <n-layout>
    <n-header class="nheader">Header</n-header>
    <n-layout>
      <n-aside class="naside">Aside</n-aside>
      <n-content class="main-content">Content</n-content>
    </n-layout>
    <n-footer class="nfooter">Footer</n-footer>
  </n-layout>
</template>

<style>
.nheader,
.nfooter {
  background: #333854;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.naside {
  background: #f8f8f8;
  width: 100px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

:::

:::demo

```vue
<template>
  <n-layout>
    <n-header class="nheader">Header</n-header>
    <n-layout>
      <n-content class="main-content">Content</n-content>
      <n-aside class="naside">Aside</n-aside>
    </n-layout>
    <n-footer class="nfooter">Footer</n-footer>
  </n-layout>
</template>

<style>
.nheader,
.nfooter {
  background: #333854;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>
```

:::

:::demo

```vue
<template>
  <n-layout>
    <n-aside class="naside">Aside</n-aside>
    <n-layout>
      <n-header class="nheader">Header</n-header>
      <n-content class="main-content">Content</n-content>
      <n-footer class="nfooter">Footer</n-footer>
    </n-layout>
  </n-layout>
</template>

<style>
.naside {
  background: #f8f8f8;
  width: 100px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nheader,
.nfooter {
  background: #333854;
  color: #fff;
  text-align: center;
  line-height: 40px;
  min-height: 40px;
}
.main-content {
  line-height: 200px;
  text-align: center;
}
</style>
```

:::

### 应用场景 1

常用上中下布局。

:::demo

```vue
<template>
  <n-layout>
    <n-header class="nheader-1">
      <div class="logo">
        <span class="logo-nancalui">
          <img src="http://139.9.159.225:34000/nc-data/assets/logo.png" width="26" height="26" />
        </span>
        <span class="text">nancalui</span>
      </div>
    </n-header>
    <n-content class="ncontent-1">
      <n-breadcrumb class="nbreadcrumb">
        <n-breadcrumb-item>
          <span>nancalui</span>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <span>面包屑</span>
        </n-breadcrumb-item>
      </n-breadcrumb>
      <div class="inner-content"></div>
    </n-content>
    <n-footer class="nfooter-1">footer</n-footer>
  </n-layout>
</template>

<style>
.nheader-1 {
  text-align: left;
  position: relative;
  height: 40px;
  background-color: #333854;
  color: #fff;
}
.nheader-1 .logo {
  position: absolute;
  left: 0;
  margin-left: 40px;
  height: 40px;
  width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
}
.nheader-1 .logo .logo-nancalui {
  margin-top: 8px;
}

.nheader-1 .logo .logo-nancalui,
.nheader-1 .logo .text {
  display: inline-block;
  vertical-align: top;
}
.ncontent-1 {
  padding: 0 40px;
  height: 300px;
  background-color: #f3f6f8;
}
.ncontent-1 .nbreadcrumb {
  margin: 8px 0;
}
.ncontent-1 .inner-content {
  background-color: #fff;
  height: 100%;
}
.nfooter-1 {
  background: #333854;
  color: #fff;
  text-align: center;
  line-height: 40px;
  min-height: 40px;
}
</style>
```

:::

### 应用场景 2

常用上中下布局及侧边栏布局。

:::demo

```vue
<template>
  <n-layout class="nlayout-2">
    <n-header class="nheader-2">
      <div class="logo">
        <span class="logo-nancalui">
          <img src="http://139.9.159.225:34000/nc-data/assets/logo.png" width="26px" height="26px" />
        </span>
        <span class="text">nancalui</span>
      </div>
    </n-header>
    <n-layout>
      <n-aside class="naside-2">
        <n-accordion :data="menu" class="menu"></n-accordion>
      </n-aside>
      <n-content class="ncontent-2">
        <n-breadcrumb class="nbreadcrumb">
          <n-breadcrumb-item>
            <span>nancalui</span>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            <span>面包屑</span>
          </n-breadcrumb-item>
        </n-breadcrumb>
        <div class="inner-content"></div>
      </n-content>
    </n-layout>
    <n-footer class="nfooter-2">footer</n-footer>
  </n-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const menu = ref([
      {
        title: '内容一',
        open: true,
        children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
      },
      {
        title: '内容二',
        children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
      },
      {
        title: '内容三（默认展开）',
        open: true,
        children: [{ title: '子内容1(禁用)', disabled: true }, { title: '子内容2(默认激活)', active: true }, { title: '子内容3' }],
      },
    ]);
    return {
      menu,
    };
  },
});
</script>

<style>
.nlayout-2 {
  background-color: #fff;
}
.nlayout-2 li {
  list-style: none;
}

.naside-2 {
  border-left: 1px solid transparent;
}

.nheader-2 {
  text-align: left;
  height: 40px;
  background-color: #333854;
  position: relative;
}
.nheader-2 .search {
  color: #fff;
  margin-right: 40px;
  position: absolute;
  right: 0;
}

.nheader-2 .logo {
  position: absolute;
  left: 0;
  margin-left: 20px;
  height: 40px;
  width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
}
.nheader-2 .logo .logo-nancalui {
  margin-top: 8px;
}
.nheader-2 .logo .logo-nancalui,
.nheader-2 .logo .text {
  display: inline-block;
  vertical-align: top;
}

.ncontent-2 {
  padding: 0 40px;
  background-color: #f3f6f8;
}
.ncontent-2 .inner-content {
  background-color: #fff;
  padding: 16px;
  height: 100%;
}
.ncontent-2 .nbreadcrumb {
  margin-top: 8px;
}
.nfooter-2 {
  color: #fff;
  background-color: #333854;
  padding: 8px 24px;
}
</style>
```

:::

### Layout

布局容器，可以与`n-header`, `n-content`, `n-footer`, `n-aside`组合实现布局； `n-layout`下可嵌套元素：`n-header`, `n-content`, `n-aside`, `n-layout`。

### Header

顶部布局，只能放在`n-layout`容器中，作为`n-layout`容器的顶部实现。 默认高度：40px。

### Footer

底部布局，只能放在`n-layout`容器中，作为`n-layout`容器的底部实现。

### Content

内容容器，只能放在`n-layout`容器中，作为`n-layout`容器`n-header`与`n-footer`之间的内容。

### Aside

侧边栏，只能放在`n-layout`容器中，作为`n-layout`容器的侧边栏部分。
