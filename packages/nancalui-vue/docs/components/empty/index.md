# Empty 空状态

空状态时的占位提示。

#### 何时使用

空状态时的占位提示。

### 基本用法

:::demo 空状态时的占位提示。

```vue
<template>
  <n-empty description="description" />
</template>
```

:::

### 自定义图片

:::demo 通过设置 image 属性传入图片 URL。

```vue
<template>
  <n-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
</template>
```

:::

### 图片尺寸

:::demo 通过使用 image-size 属性来控制图片大小。

```vue
<template>
  <n-empty :image-size="200" />
</template>
```

:::

### 底部内容

:::demo 使用默认插槽可在底部插入内容。

```vue
<template>
  <n-empty>
    <n-button type="primary">Button</n-button>
  </n-empty>
</template>
```

:::

### 自定义样式

::: 您可以为 empty 组件设置自定义样式。 使用 css/scss 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量：--el-empty-fill-color-0、--el-empty-fill-color-1、--el-empty-fill-color-2、……、--el-empty-fill-color-9。 您可以使用类似 :root { --el-empty-fill-color-0: red; --el-empty-fill-color-1: blue; } 等变量。 但通常，如果你想要更改样式，你需要更改所有颜色，因为这些颜色是一个组合。

:::

### Empty 事件

| 属性名      | 说明                         | 类型   | 默认 |
| :---------- | :--------------------------- | :----- | :--- |
| image       | empty 组件的图像地址         | string | ''   |
| image-size  | empty 组件的图像尺寸（宽度） | number | —    |
| description | empty 组件的描述信息         | string | ''   |

### Attributes

| 插槽名      | 说明               | 跳转 Demo |
| :---------- | :----------------- | :-------- |
| default     | 作为底部内容的内容 |           |
| image       | 作为图像的内容     |           |
| description | 作为描述的内容     |           |

