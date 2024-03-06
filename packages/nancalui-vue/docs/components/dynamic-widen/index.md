# NCdynamicWiden 拖拽左右布局

拖拽左右布局

#### 何时使用

对拖拽宽高组件进行的简单封装，当页面只需要左右简单拖拽时使用

### 基本用法

:::demo `pwdith`左边默认的宽度，`hwidth`拖拽元素本身的宽或者高度，`bgcolor`拖拽元素背景，`borderColor`拖拽元素边框颜色

```vue
<template>
  <div class="container-main">
    <NCdynamicWiden :pwdith="220" :hwidth="15">
      <template #left>
        <div>1111</div>
      </template>
      <template #hwContent="{ handleDiaplay }">
        <div style="display: flex;justify-content: center;align-items: center;width:100%;height:100%">
          <div style="cursor:pointer">
            <n-icon name="like" @click="handleDiaplay"></n-icon>
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div>22222</div>
      </template>
    </NCdynamicWiden>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
.container {
  &-main {
    width: 100%;
    height: 300px;
    background: #ffffff;
  }
}
</style>
```

:::
