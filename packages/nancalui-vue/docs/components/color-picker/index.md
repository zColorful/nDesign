# ColorPicker 颜色选择器

#### 何时使用

允许用户使用各种交互方法来选择颜色

### 基本用法

:::demo

```vue
<template>
  <n-color-picker></n-color-picker>
</template>
```

:::

### 颜色透明度

允许用户动态调节展示 alpha 模式 默认情况下为 true
:::demo

```vue
<template>
  <n-button variant="common" @click="isShowAlpha">test showAlpha Be {{ show }}</n-button>
  <n-color-picker v-model="color" :show-alpha="show"></n-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(true);
    const color = ref('rgba(83, 199, 212, 0.72)');
    const isShowAlpha = () => {
      show.value = !show.value;
    };
    return {
      color,
      isShowAlpha,
      show,
    };
  },
});
</script>
```

:::

### 颜色模式

设置 mode 展示响应颜色模式
:::demo

```vue
<template>
  <n-color-picker v-model="color" mode="hex"></n-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('#FF6827A1');
    return {
      color,
    };
  },
});
</script>
```

:::

### 历史颜色

自定义是否展示历史颜色 默认情况下为 true
:::demo

```vue
<template>
  <n-button variant="common" @click="isShowAlpha">test showAlpha Be {{ show }}</n-button>
  <n-color-picker :show-history="show" v-model="color" mode="hsl"></n-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  setup() {
    let show = ref(true);
    const isShowAlpha = () => {
      show.value = !show.value;
    };
    const color = ref('hsla(353, 1, 0.58, 1)');
    return {
      color,
      isShowAlpha,
      show,
    };
  },
});
</script>
```

:::

### 基础面板自定义

设置可自定义配置的基础面板颜色样本

:::demo

```vue
<template>
  <n-color-picker :swatches="colors" v-model="color"></n-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  setup() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];
    const color = ref('rgba(155, 39, 176, 1)');
    return {
      color,
      colors,
    };
  },
});
</script>
```

:::

### 颜色展示自定义

设置自定义选中展示

:::demo

```vue
<template>
  <n-color-picker v-model="color" style="width: 20px; height: 20px">
    <template #default="{ color, textColor, formattedColor }">
      <div style="display: flex; flexDirection: column; alignItems: center;">
        <n-icon name="font" />
        <div :style="{ backgroundColor: color, height: '5px', width: '100%' }"></div>
      </div>
    </template>
  </n-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('rgba(155, 39, 176, 1)');
    return {
      color,
    };
  },
});
</script>
```

:::

### ColorPicker 参数

| 参数         | 类型      | 默认   | 说明                                          | 跳转 Demo                   |
| :----------- | :-------- | :----- | :-------------------------------------------- | :-------------------------- |
| mode         | `String`  | `rgb`  | 切换颜色模式                                  | [颜色模式](#颜色模式)       |
| dotSize      | `Number`  | `15`   | 调色板圆点大小                                |                             |
| swatches     | `Array`   |        | 预定义样本面板                                | [色块样本](#基础面板自定义) |
| show-alpha   | `Boolean` | `true` | 是否展示透明度进度条                          | [透明度展示](#颜色透明度)   |
| show-history | `Boolean` | `true` | 是否展示历史颜色                              | [历史颜色展示](#历史颜色)   |
| v-model      | `String`  |        | 绑定颜色 Value 支持（hex , rgb , hsl , hsv ） |                             |

### ColorPicker 插槽

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义颜色展示 |
