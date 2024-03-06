# Divider 分割线

区隔内容的分割线。

#### 何时使用

### 基础用法

对不同段落的文本进行分割。

:::demo

```vue
<template>
  <div>
    <span>I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes.</span>
    <n-divider />
    <span>There little thoughts are the rustle of leaves; they have their whisper of joy in my mind.</span>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // const valueReadonly = ref(3.5);
    // return {
    //   valueReadonly,
    // };
  },
});
</script>
```

:::

### 设置文案

可以在分割线上自定义文本内容。

:::demo

```vue
<template>
  <div>
    <span>What you are you do not see, what you see is your shadow. </span>
    <n-divider content-position="left">Rabindranath Tagore</n-divider>
    <span>My wishes are fools, they shout across thy song, my Master. Let me but listen.</span>
    <n-divider> </n-divider>
    <span>I cannot choose the best. The best chooses me.</span>
    <n-divider content-position="right">Rabindranath Tagore</n-divider>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // const valueReadonly = ref(3.5);
    // return {
    //   valueReadonly,
    // };
  },
});
</script>
```

:::

### 虚线

您可以设置分隔符的样式。

:::demo

```vue
<template>
  <div>
    <span>What language is thine, O sea?</span>
    <n-divider border-style="dashed" />
    <span>The language of eternal question.</span>
  </div>
  <n-divider border-style="dotted" />
  <span>What language is thy answer, O sky?</span>
  <n-divider border-style="double" />
  <span>The language of eternal silence.</span>
</template>
<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // const valueReadonly = ref(3.5);
    // return {
    //   valueReadonly,
    // };
  },
});
</script>
```

:::

### 垂直分隔线

:::demo

```vue
<template>
  <div>
    <span>Rain</span>
    <n-divider direction="vertical" />
    <span>Home</span>
    <n-divider direction="vertical" border-style="dashed" />
    <span>Grass</span>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // const valueReadonly = ref(3.5);
    // return {
    //   valueReadonly,
    // };
  },
});
</script>
```

:::

### Divider 参数

| 参数名     | 类型                              | 默认值 | 描述                                                                                                                                                  | 跳转 Demo                           |
| :--------- | :-------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| read       | `boolean`                         | false  | 可选，设置是否为只读模式，只读模式无法交互                                                                                                            | [只读模式](#只读模式)               |
| count      | `number`                          | 5      | 可选，设置总等级数                                                                                                                                    | [只读模式](#只读模式)               |
| distance   | `number\|string`                  | 20     | 可选，设置距离两边的长度，当 contentPosition 为 left,为距离左边的长度，contentPosition 为右时距离右边的长度，contentPosition 为 center 时此项设置无效 | [只读模式](#只读模式)               |
| type       | [RateStatusType](#ratestatustype) | --     | 可选，设置当前评分的类型，不同类型对应不同颜色                                                                                                        | [使用 type 参数](#使用-type-参数)   |
| color      | `string`                          | --     | 可选，星星颜色                                                                                                                                        | [动态模式-自定义](#动态模式-自定义) |
| icon       | `string`                          | --     | 可选，评分图标的样式，只支持 nancalui 图标库中所有图标                                                                                                | [动态模式](#动态模式)               |
| character  | `string`                          | --     | 可选，评分图标的样式，icon 与 character 只能设置其中一个                                                                                              | [动态模式-自定义](#动态模式-自定义) |
| allow-half | `boolean`                         | false  | 可选，动态模式下是否允许半选                                                                                                                          | [半选模式](#半选模式)               |

### Rate 事件

| 事件名 | 类型                   | 说明           | 回调参数     | 跳转 Demo             |
| :----- | :--------------------- | :------------- | :----------- | :-------------------- |
| change | `EventEmitter<number>` | 分值改变时触发 | 改变后的分值 | [半选模式](#半选模式) |

### Rate 类型定义

#### RateStatusType

```ts
type RateStatusType = 'success' | 'warning' | 'error';
```
