# ImportErrModal 错误提示框

错误提示框。

#### 何时使用

当有大量错误信息提示时使用。

### 基本用法

:::demo `isShow`提示框是否展示，`content`提示框展示内容。

```vue
<template>
  <div class="nancalui-input-demo">
    <n-button variant="solid" color="primary" @click="onClick">点击试试</n-button>
    <n-import-err-modal :is-show="errVisible" :content="errData" @close="onClose"> 11111111111 </n-import-err-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const errVisible = ref(false);
    const errData =
      ref(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit am
lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis
parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed
rhoncus pronin sapien nunc accuan eget.
<br>
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit am
lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis
parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed
rhoncus pronin sapien nunc accuan eget.`);
    const onClick = () => {
      errVisible.value = true;
    };
    const onClose = () => {
      errVisible.value = false;
    };
    return {
      errVisible,
      errData,
      onClick,
      onClose,
    };
  },
});
</script>
```

:::
