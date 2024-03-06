# HandleWidth 宽高拖拽组件

宽高拖拽组件

#### 何时使用

当一个元素需要拖拽动态改变其宽度或者高度时使用，(需配合 css 使用)

### 基本用法

:::demo `type`横向拖拽还是纵向拖拽，`hwidth`拖拽元素本身的宽或者高度，`pwidth`左边元素的宽度,`bgcolor`拖拽元素背景，`borderColor`拖拽元素边框颜色

```vue
<template>
  <div class="nancalui-handle-width">
    <div class="nancalui-handle-width-left" ref="leftNode">左边</div>
    <NChandleWidth @widthChange="widthChange" bgcolor="#333333">
      <template #content>
        <div style="display: flex;justify-content: center;align-items: center;width:100%;height:100%">
          <n-icon name="like"></n-icon>
        </div>
      </template>
    </NChandleWidth>
    <div class="nancalui-handle-width-right" ref="rightNode">右边</div>
  </div>
  -----------------------------------------------------
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    let width = ref(220);
    function widthChange(movement) {
      width.value += movement;
      if (width.value < 160) {
        width.value = 160;
      } else if (width.value > 500) {
        width.value = 500;
      } else {
        proxy.$refs['leftNode'].style.setProperty('--lwidth', width.value + 'px');
        proxy.$refs['rightNode'].style.setProperty('--rwidth', 'calc(100% - ' + (width.value + 15) + 'px)');
      }
    }
    return {
      widthChange,
    };
  },
});
</script>
<style scoped lang="scss">
$leftWidth: var(--lwidth, 220px);
$rightWidth: var(--rwidth, calc(100% - 216px));
.nancalui-handle-width {
  width: 100%;
  height: 300px;
  display: flex;
  border: 1px solid gray;
  &-left {
    width: $leftWidth;
    height: 100%;
    background: #eff1f5;
  }
  &-right {
    width: $rightWidth;
    height: 100%;
    background: #ffffff;
  }
}
</style>
```

:::
