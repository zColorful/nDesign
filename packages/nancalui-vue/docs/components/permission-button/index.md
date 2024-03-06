# PerssionButton 权限按钮

页面权限筛选按钮。

#### 何时使用

当用户按钮有权限判断时使用，没有权限不展示按钮。

### 基本用法

::: demo

```vue
<template>
  <div>
    无权限
    <n-permission-button color="primary" variant="text" name="新增" permCode="physicsAudit" @click="handleAdd" :disabled="true" size="sm" />
  </div>
  <div>
    有权限
    <n-permission-button color="primary" variant="text" name="新增" permCode="physicsAudit" @click="handleAdd" size="md" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      handleAdd: () => {
        console.log('add');
      },
    };
  },
});
</script>
<style></style>
```

:::

<!-- ### Layout

布局容器，可以与`n-header`, `n-content`, `n-footer`, `n-aside`组合实现布局； `n-layout`下可嵌套元素：`n-header`, `n-content`, `n-aside`, `n-layout`。

### Header

顶部布局，只能放在`n-layout`容器中，作为`n-layout`容器的顶部实现。 默认高度：40px。

### Footer

底部布局，只能放在`n-layout`容器中，作为`n-layout`容器的底部实现。

### Content

内容容器，只能放在`n-layout`容器中，作为`n-layout`容器`n-header`与`n-footer`之间的内容。

### Aside

侧边栏，只能放在`n-layout`容器中，作为`n-layout`容器的侧边栏部分。 -->
