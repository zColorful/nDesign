# scrollbar 滚动条

### 何时使用

用于替换浏览器默认滚动条样式。

### 基本用法

:::demo 滚动条组件基本用法。scrollbar 的默认插槽需要唯一的子元素。

```vue
<template>
  <n-scrollbar style="height:200px;overflow: auto;" :disableHorizontal="true" disableVertical>
    <div style="height: 2000px;width: 2000px; background:var(--nancalui-primary-hover, #6E9EFF) ">Content</div>
  </n-scrollbar>
</template>

<script>
export default {};
</script>
```

:::

### 滚动条类型

:::demo 设置`type` 属性改变滚动条类型，`track` 类型会显示滚动条轨道。

```vue
<template>
  <n-scrollbar type="track" style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background:var(--nancalui-primary-hover, #6E9EFF) ">Content</div>
  </n-scrollbar>
</template>

<script>
export default {};
</script>
```

:::

### Scrollbar 参数

| 参数        | 类型                        | 默认  | 说明         | 跳转 Demo |
| :---------- | :-------------------------- | :---- | :----------- | :-------- |
| type        | `track or embed`            | embed | 类型       |           |
| outer-class | `string or object or array` | -     | 外层的类名 |           |
| outer-style | `StyleValue`                | -     | 外层的样式 |           |

### Scrollbar 事件

| 事件   | 说明       | 参数 |
| :----- | :--------- | :--- |
| scroll | 滚动时触发 | -    |

### VirtualList 方法

| 方法名     | 类型                                                         | 说明     | 跳转 Demo |
| :--------- | :----------------------------------------------------------- | :------- | :-------- |
| scrollTo   | `options: number or {left?: number;top?: number}, y: number` | 滚动     |           |
| scrollTop  | `top: number`                                                | 纵向滚动 |           |
| scrollLeft | `left: number`                                               | 横向滚动 |           |
