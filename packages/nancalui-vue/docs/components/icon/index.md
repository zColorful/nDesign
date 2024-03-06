# Icon 图标

用于显示图标。

#### 何时使用

需要显示图标时。

所有内置的图标可在 devui 官网进行查看：[https://devui.design/icon/ruleResource](https://devui.design/icon/ruleResource)

### 基本用法

:::demo 通过`name`属性，指定需要显示的图标，支持 devui 图标库图标和 URL 形式的图标。

```vue
<template>
  <div class="demo-spacing">
    <n-icon name="like"></n-icon>
    <n-icon name="http://139.9.159.225:34000/nc-data/assets/logo.png" size="16px"></n-icon>
  </div>
</template>
```

:::

### 附带描述信息

:::demo 利用`prefix`和`suffix`可分别设置图标的前置和后置内容，`operable`设置可交互图标，`disabled`设置禁用态，`rotate`设置图标旋转角度或自动旋转。

```vue
<template>
  <n-icon name="setting" operable>
    <template #prefix>
      <span>设置</span>
    </template>
  </n-icon>
  <br />
  <br />
  <n-icon name="setting" operable>
    <template #suffix>
      <span>设置</span>
    </template>
  </n-icon>
  <br />
  <br />
  <n-icon name="http://139.9.159.225:34000/nc-data/assets/logo.png" size="16px" operable>
    <template #suffix>
      <span>Logo</span>
    </template>
  </n-icon>
  <br />
  <br />
  <n-icon name="refresh" rotate="infinite" operable>
    <template #suffix>
      <span>运行中</span>
    </template>
  </n-icon>
  <br />
  <br />
  <n-icon name="edit" :rotate="180">
    <template #suffix>
      <span>编辑</span>
    </template>
  </n-icon>
  <br />
  <br />
  <n-icon name="edit" disabled>
    <template #suffix>
      <span>无权编辑</span>
    </template>
  </n-icon>
</template>
```

:::

### 颜色

:::demo 通过`color`属性指定图标的颜色。

```vue
<template>
  <div class="demo-spacing">
    <n-icon name="right-o" color="#3DCCA6"></n-icon>
    <n-icon name="error-o" color="#F66F6A"></n-icon>
  </div>
</template>
```

:::

### 尺寸

:::demo 通过`size`属性，设置图标尺寸。

```vue
<template>
  <div class="demo-spacing">
    <n-icon name="insert-image"></n-icon>
    <n-icon name="insert-image" size="32px"></n-icon>
  </div>
</template>
```

:::

### 图标组

:::demo 常用图标组使用场景

```vue
<template>
  <h5>可操作图标</h5>
  <n-icon-group>
    <n-icon name="add" operable disabled size="16px"></n-icon>
    <n-icon name="edit" operable size="16px"></n-icon>
    <n-icon name="delete" operable size="16px"></n-icon>
  </n-icon-group>
  <h5>静态图标</h5>
  <n-icon-group>
    <n-icon name="add" disabled size="16px"></n-icon>
    <n-icon name="edit" size="16px"></n-icon>
    <n-icon name="delete" size="16px"></n-icon>
  </n-icon-group>
</template>
```

:::

### 自定义字体图标

Icon 组件默认引用 devui 图标库的图标，如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

```css
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-right::before {
  content: '\E03F';
}
```

引入字体图标的 css

```css
@import 'my-icon.css';
```

使用

```html
<n-icon class-prefix="my-icon" name="right"></n-icon>
```

### 自定义 svg

可以借助 [vite-plugin-vue-svg](https://www.npmjs.com/package/vite-plugin-vue-svg)，将 svg component 传入，实现自定义 svg。

```vue
<template>
  <n-icon :component="MySvgIcon"></n-icon>
</template>
<script>
import { defineComponent } from 'vue';
import MySvgIcon from '../../assets/logo.png';

export default defineComponent({
  setup() {
    return {
      MySvgIcon,
    };
  },
});
</script>
```

### Icon 参数

| 参数名       | 类型                   | 默认值    | 说明                                                         | 跳转 Demo                         |
| :----------- | :--------------------- | :-------- | :----------------------------------------------------------- | :-------------------------------- |
| name         | `string`               | --        | 必选，图标名称                                               | [基本用法](#基本用法)             |
| size         | `string`               | '16px'    | 可选，图标尺寸                                               | [尺寸](#尺寸)                     |
| color        | `string`               | '#252b3a' | 可选，图标颜色                                               | [颜色](#颜色)                     |
| class-prefix | `string`               | 'icon'    | 可选，自定义字体图标前缀                                     | [自定义字体图标](#自定义字体图标) |
| component    | `VueComponent`         | null      | 可选，自定义 svg 图标                                        | [自定义 svg](#自定义svg)          |
| operable     | `boolean`              | false     | 可选，图标是否可操作                                         | [附带描述信息](#附带描述信息)     |
| disabled     | `boolean`              | false     | 可选，图标是否禁用                                           | [附带描述信息](#附带描述信息)     |
| rotate       | `number \| 'infinite'` | --        | 可选，`infinite`表示设置图标自动旋转，数字值表示图标旋转角度 | [附带描述信息](#附带描述信息)     |

### Icon 插槽

| 插槽名 | 说明         |
| :----- | :----------- |
| prefix | 图标前置内容 |
| suffix | 图标后置内容 |
