# MessageBox 二次确认弹窗

常用于危险操作后的反馈提示，用作二次确认弹窗

### 何时使用

用户一些删除，保存等不可逆的危险操作情况下使用

### 基础用法

:::demo

```vue
<template>
  <div class="demo-spacing">
    <n-button variant="text" @click="open('warning')">Click to open the Message Box</n-button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function open(type) {
      this.$MessageBoxService.open({
        title: '是否确认删除该目录',
        content: '删除后该分类将不可恢复',
        width: '430px',
        save: () => {
          this.$message({
            type,
            message: '您点击了确认！',
          });
        },
        cancel: () => {
          this.$message({
            type,
            message: '您点击了取消！',
          });
        },
      });
    }
    return { open };
  },
});
</script>
```

:::

### message-box 参数

| 参数名  | 类型       | 默认    | 说明             |
| :------ | :--------- | :------ | :--------------- |
| title   | `string`   | ''      | 设置弹窗标题     |
| content | `string`   | ''      | 设置提示内容     |
| width   | `string`   | '430px' | 设置弹窗宽度     |
| cancel  | () => void |         | 点击取消操作回调 |
| save    | () => void |         | 点击确认操作回调 |
