# Transfer 穿梭框

双栏穿梭选择框。

#### 何时使用

需要在多个可选项中进行多选时。穿梭选择框可用只管的方式在两栏中移动数据，完成选择行为。其中左边一栏为 source，右边一栏为 target。最终返回右侧栏的数据，提供给开发者使用。

### 基本用法

穿梭框基本用法。
:::demo

```vue
<template>
  <n-transfer v-model="targetValue" :data="source" v-model:selected="selected" @change="changeFun"> </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const source = ref([
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ]);
    const targetValue = ref(['1', '2']);
    const selected = ref(['10']);
    const changeFun = (v) => {
      console.log(v);
    };

    return {
      source,
      targetValue,
      changeFun,
      selected,
    };
  },
});
</script>
```

:::

### 搜索穿梭框

在数据很多的情况下，可以对数据进行搜索和过滤。
:::demo

```vue
<template>
  <div class="mb-1">默认搜索</div>
  <n-transfer :data="source" showSearch placeholder="请搜索" v-model="value" class="mb-3"> </n-transfer>
  <div class="mb-1">自定义搜索方法</div>
  <n-transfer :data="source" showSearch :filter="filterFun" v-model="value" class="mb-3"> </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = [
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ];

    const filterFun = (item, value, type) => {
      console.log(item.label, item.value);
      return item.value.includes(value);
    };
    const checkedValues = ref(['2']);

    return {
      source: originSource,
      value: checkedValues,
      filterFun,
    };
  },
});
</script>
```

:::

### 精简模式穿梭框

精简模式，直接通过点击完成交互。
:::demo

```vue
<template>
  <n-transfer :data="source" simple>
    <template #source-title="{ countTotal, countSelected, searchValue, checked, indeterminate, onSelectAllChange, onClear }">
      {{ countTotal }}
    </template>

    <template #target-title="{ countTotal, countSelected, searchValue, checked, indeterminate, onSelectAllChange, onClear }">
      {{ countTotal }}
    </template>
  </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const source = ref([
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ]);

    return {
      source,
    };
  },
});
</script>
```

:::

### 单向穿梭框

穿梭框源数据只能从左到右。
:::demo

```vue
<template>
  <n-transfer :title="titles" :data="source" one-way v-model="value"> </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = [
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ];
    const value = ref([]);

    return {
      value,
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceDrag: true,
      dragstartHandle: (event, item) => {
        console.log(item, 'dragstartHandle');
      },
      dropHandle: (event, item) => {
        console.log(item, 'dropHandle');
      },
      dragendHandle: (event, item) => {
        console.log(item, 'dragendHandle');
      },
    };
  },
});
</script>
```

:::

### 自定义穿梭框内容

自定义渲染内容，插槽开放了数据以及选中函数给开发者用于完全自定义
:::demo

```vue
<template>
  <n-transfer v-model="targetValue" :title="titles" :data="source">
    <template #source="{ data, selectedKeys, onSelect }">
      <div
        :style="{
          height: '30px',
          lineHeight: '30px',
          padding: '0 2px',
          display: 'inline-block',
          width: '50%',
          cursor: item.disabled ? 'not-allowed' : 'pointer',
        }"
        v-for="item in data"
        :key="item.value"
        @click="
          !item.disabled
            ? onSelect(selectedKeys.includes(item.value) ? selectedKeys.filter((key) => key !== item.value) : [...selectedKeys, item.value])
            : undefined
        "
      >
        <n-icon name="right" v-if="selectedKeys.includes(item.value)" />~~{{ item.label }}~~
      </div>
    </template>

    <template #target="{ data, selectedKeys, onSelect }">
      <div
        :style="{
          height: '30px',
          lineHeight: '30px',
          padding: '0 2px',
          display: 'inline-block',
          width: '50%',
          cursor: item.disabled ? 'not-allowed' : 'pointer',
        }"
        v-for="item in data"
        :key="item.value"
        @click="
          !item.disabled
            ? onSelect(selectedKeys.includes(item.value) ? selectedKeys.filter((key) => key !== item.value) : [...selectedKeys, item.value])
            : undefined
        "
      >
        <n-icon name="right" v-if="selectedKeys.includes(item.value)" />~~{{ item.label }}~~
      </div>
    </template>
  </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = ref([
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ]);
    const targetValue = ref(['1', '2']);

    return {
      targetValue,
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
    };
  },
});
</script>
```

:::

### 自定义渲染选项内容

自定义渲染选项内的内容
:::demo

```vue
<template>
  <n-transfer v-model="targetValue" :title="titles" :data="source" :showSelectAll="false">
    <template #item="{ label }"> ~~{{ label }} </template>
  </n-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = ref([
      {
        value: '1',
        label: '北京',
        disabled: false,
      },
      {
        value: '2',
        label: '上海',
        disabled: true,
      },
      {
        value: '3',
        label: '广州',
        disabled: false,
      },
      {
        value: '4',
        label: '深圳',
        disabled: false,
      },
      {
        value: '5',
        label: '成都',
        disabled: false,
      },
      {
        value: '6',
        label: '杭州',
        disabled: true,
      },
      {
        value: '7',
        label: '重庆',
        disabled: false,
      },
      {
        value: '8',
        label: '西安',
        disabled: false,
      },
      {
        value: '9',
        label: '苏州',
        disabled: false,
      },
      {
        value: '10',
        label: '武汉',
        disabled: false,
      },
    ]);
    const targetValue = ref(['1', '2']);

    return {
      targetValue,
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
    };
  },
});
</script>
```

:::

### Transfer 参数

| **参数**      | **类型**                                            | **默认**              | **说明**                                   | **跳转 Demo**                         |
| ------------- | --------------------------------------------------- | --------------------- | ------------------------------------------ | ------------------------------------- |
| v-model       | `Array<string>`                                     | []                    | 可选参数，选中项绑定值，对应右侧穿梭框选项 | [基本用法](#基本用法)                 |
| data          | `Array[{value,label,disabled}] `                    | []                    | 可选参数，穿梭框源数据                     | [基本用法](#基本用法)                 |
| title         | `[sourceTitle: string, targetTitle: string]`        | []                    | 可选参数，穿梭框标题                       | [基本用法](#基本用法)                 |
| selected      | `Array<string>`                                     | []                    | 选中的选项值                               | [基本用法](#基本用法)                 |
| simple        | `boolean`                                           | false                 | 是否开启简单模式（点击选项即移动）         | [精简模式穿梭框](#精简模式穿梭框)     |
| oneWay        | `boolean`                                           | false                 | 是否开启单向模式（仅可移动到目标选择框）   | [单向穿梭框](#单向穿梭框)             |
| showSearch    | `boolean`                                           | false                 | 是否显示搜索框                             | [搜索穿梭框](#搜索穿梭框)             |
| placeholder   | `string`                                            | `请输入`              | 搜索框提示                                 | [搜索穿梭框](#搜索穿梭框)             |
| filter        | `(item: TransferItem, value: string, type: 'source' | 'target') => boolean` | 自定义搜索                                 | [搜索穿梭框](#搜索穿梭框)             |
| showSelectAll | `boolean`                                           | true                  | 是否展示全选勾选框                         | [自定义穿梭框内容](#自定义穿梭框内容) |

### Transfer 插槽

| 插槽名       | 说明                                                                                                                                                                                             |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| item         | 选项元素插槽，参数 `{value: string, label: string}`                                                                                                                                              |
| source       | 源面板插槽，参数 `{data: TransferItem[], selectedKeys: string[], onSelect: (value: string[]) => void}`                                                                                           |
| target       | 目标面板插槽，同上                                                                                                                                                                               |
| source-title | 源标题插槽，参数 `{countTotal: number, countSelected: number, searchValue: string, checked: boolean, indeterminate: boolean, onSelectAllChange: (checked:boolean) => void, onClear: () => void}` |
| target-title | 目标标题插槽，同上                                                                                                                                                                               |

### Transfer 事件

| **事件** | **类型**                       | **说明**                 | **跳转 Demo**         |
| -------- | ------------------------------ | ------------------------ | --------------------- |
| change   | `(v: string[]) => void`        | 目标选择框的值改变时触发 | [基本用法](#基本用法) |
| select   | `(selected: string[]) => void` | 选中的值改变时触发       | [基本用法](#基本用法) |
