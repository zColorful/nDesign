# ModuleName 标题组件

标题组件

#### 何时使用

当用户需要展示一个标题时。

### 基本用法

标题组件可设置宽度，高度，颜色，字体颜色，字体大小等。

:::demo

```vue
<template>
  <div class="module-name-demo">
    <n-module-name>标题</n-module-name>
    <n-module-name size="md">标题</n-module-name>
    <n-module-name size="lg">标题</n-module-name>
  </div>
</template>

<style scoped lang="scss">
.module-name-demo {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px;
  .module-name {
    margin-right: 10px;
  }
}
</style>
```

:::

### ModuleName 参数

| 参数名          | 类型   | 默认         | 说明                |
| :-------------- | :----- | :----------- | :------------------ |
| width           | string | '4'          | 可选，左侧边宽度    |
| height          | string | '14'         | 可选，左侧边高度    |
| size            | string | 'sm'         | 可选，尺寸 sm,md,lg |
| backgroundColor | string | '默认主题色' | 可选，左侧边颜色    |
| color           | string | '#333333'    | 可选，字体颜色      |
| fontSize        | string | '14'         | 可选，字体大小      |
