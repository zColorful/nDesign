# CustomizeSteps 自定义步骤条

自定义步骤条。

#### 何时使用

当新建任务具有明确的先后步骤次序时使用。

### 基本用法

:::demo `stepsData`步骤条文本描述`nowIndex`当前步骤条进度`icon`完成步凑展示图标名`iconClass`给图标新增类名。

```vue
<template>
  <div class="out-box-steps">
    <n-customize-steps :stepsData="stepsData" :nowIndex="nowIndex" />
    <div class="box">
      <n-button variant="solid" color="primary" @click="goNext">下一步</n-button>
      <n-button color="primary" @click="goPrev">上一步</n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const nowIndex = ref(0);
    const stepsData = ref([
      {
        label: '基础信息',
      },
      {
        label: '关联数据源',
      },
      {
        label: '授权人员',
      },
      {
        label: '核对信息',
      },
    ]);
    const goNext = () => {
      if (nowIndex.value >= stepsData.value.length - 1) return;
      nowIndex.value++;
    };
    const goPrev = () => {
      if (nowIndex.value <= 0) return;
      nowIndex.value--;
    };
    return {
      nowIndex,
      stepsData,
      goNext,
      goPrev,
    };
  },
});
</script>
<style>
.box {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  button {
    margin-left: 10px;
  }
}
</style>
```

:::

### CustomizeSteps 参数

| 参数名    | 类型     | 默认                    | 说明                                  | 跳转 Demo             |
| :-------- | :------- | :---------------------- | :------------------------------------ | :-------------------- |
| stepsData | `Array`  | '[{label: '基础信息'}]' | 必选，步骤条描述文本                  | [基本用法](#基本用法) |
| nowIndex  | `Number` | 可选，默认 0            | 可选，初始化进度                      | [基本用法](#基本用法) |
| icon      | `string` | 'right-o'               | 可选，完成步骤展示图标 icon 图标 name | [基本用法](#基本用法) |
| iconClass | `string` | 'icon'                  | 可选，完成步骤展示图标自定义类名      | [基本用法](#基本用法) |
