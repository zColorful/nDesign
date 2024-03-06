# Space 间距

### 基础用法

间距组件的基本用法。

:::demo

```vue
<template>
  <n-space>
    Space:
    <n-tag v-if="false" color='arcoblue'>Tag</n-tag>
    <n-button variant="solid">Item1</n-button>
    <n-button variant="solid">Item2</n-button>
    <n-switch v-model="checked" />
  </n-space>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(true);

    return {
      checked,
    };
  },
});
</script>
```

:::

### 垂直间距

可以设置垂直方向排列的间距。

:::demo

```vue
<template>
  <n-space direction="vertical" fill>
    <n-button variant="solid" long>Item1</n-button>
    <n-button variant="solid" long>Item2</n-button>
    <n-button variant="solid" long>Item3</n-button>
  </n-space>
</template>
```

:::

### 尺寸

内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

:::demo

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <n-radio-group  direction="row" v-model="size">
        <n-radio-button value="mini">mini</n-radio-button>
        <n-radio-button value="small">small</n-radio-button>
        <n-radio-button value="medium">medium</n-radio-button>
        <n-radio-button value="large">large</n-radio-button>
      </n-radio-group>
    </div>
    <n-space :size="size">
      <n-button variant="solid">Item1</n-button>
      <n-button variant="solid">Item2</n-button>
      <n-button variant="solid">Item3</n-button>
    </n-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 'medium',
    }
  }
};
</script>

```

:::

### 对齐

内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

:::demo

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <n-radio-group direction="row" v-model="align">
        <n-radio-button value="start">start</n-radio-button>
        <n-radio-button value="center">center</n-radio-button>
        <n-radio-button value="end">end</n-radio-button>
        <n-radio-button value="baseline">baseline</n-radio-button>
      </n-radio-group>
    </div>
    <n-space :align="align" style="backgroundColor: var(--color-fill-2);padding: 10px;">
      Space:
      <n-button variant="solid">Item2</n-button>
      <n-card title='Card'>
        Card content
      </n-card>
    </n-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      align: 'center',
    }
  }
};
</script>

```

:::

### 环绕

环绕类型的间距，四周都有间距，一般用于换行的场景。

:::demo

```vue
<template>
  <n-space wrap>
    <n-button variant="solid">Item1</n-button>
    <n-button variant="solid">Item2</n-button>
    <n-button variant="solid">Item3</n-button>
    <n-button variant="solid">Item4</n-button>
    <n-button variant="solid">Item5</n-button>
    <n-button variant="solid">Item6</n-button>
    <n-button variant="solid">Item7</n-button>
    <n-button variant="solid">Item8</n-button>
    <n-button variant="solid">Item9</n-button>
    <n-button variant="solid">Item10</n-button>
    <n-button variant="solid">Item11</n-button>
    <n-button variant="solid">Item12</n-button>
    <n-button variant="solid">Item13</n-button>
    <n-button variant="solid">Item14</n-button>
    <n-button variant="solid">Item15</n-button>
    <n-button variant="solid">Item16</n-button>
    <n-button variant="solid">Item17</n-button>
    <n-button variant="solid">Item18</n-button>
    <n-button variant="solid">Item19</n-button>
    <n-button variant="solid">Item20</n-button>
  </n-space>
</template>

```

:::

### 分隔符

为相邻子元素设置分隔符。

:::demo

```vue
<template>
  <n-space>
    <template #split>
      <n-divider direction="vertical" />
    </template>
    <n-tag v-if="false" color='arcoblue'>Tag</n-tag>
    <n-button variant="solid">Item1</n-button>
    <n-button variant="solid">Item2</n-button>
    <n-switch v-model="checked" />
  </n-space>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(true);

    return {
      checked,
    };
  },
});
</script>
```

:::

### Space 参数

| 参数         | 类型                                                         | 默认                 | 说明                                      | 跳转               |
| :------------| :---------------------------------------------------------  | :------------------- | :---------------------------------------- | :---------------- |
| align        | ` start\|end\|center\|baseline `                            |           -          | 可选，对齐方式                             | [对齐](#对齐)      |
| direction    | `vertical\|horizontal`                                      |      horizontal      | 可选，间距方向                             | [垂直间距](#垂直间距)|
| size         | `number\|mini\|small\|medium\|large\|[SpaceSize, SpaceSize]`|      small          | 可选，间距大小，支持分别制定横向和竖向的间距  | [尺寸](#尺寸)      |
| wrap         | `boolean`                                                   |         false        | 可选，环绕类型的间距，用于折行的场景         | [环绕](#环绕)      |
| fill         | `boolean`                                                   |         false        | 可选，充满整行                             | [分割线](#分割线)   |




#### Type

```ts
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';
```