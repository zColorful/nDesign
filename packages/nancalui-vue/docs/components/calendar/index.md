# Calendar 日历

// 显示日期

### 基本用法

:::demo 设置 value 来指定当前显示的月份。 如果 value 未指定，则显示当月。 value 支持 v-model 双向绑定。

```vue
<template>
  <n-calendar v-model="value" />
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const value = ref(new Date());
    return { value };
  },
};
</script>
```

:::

### 自定义内容

:::demo 通过设置名为 date-cell 的 scoped-slot 来自定义日历单元格中显示的内容。 在 scoped-slot 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。 详情解释参考下方的 API 文档。

```vue
<template>
  <n-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </n-calendar>
</template>

<style>
.is-selected {
  color: #1989fa;
}
</style>
```

:::

### 范围

:::demo 设置 range 属性指定日历的显示范围。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

```vue
<template>
  <n-calendar :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]" />
</template>
```

:::

### 自定义日历头部

:::demo

```vue
<template>
  <n-calendar ref="calendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <n-button-group>
        <n-button size="sm" @click="selectDate('prev-year')"> Previous Year </n-button>
        <n-button size="sm" @click="selectDate('prev-month')"> Previous Month </n-button>
        <n-button size="sm" @click="selectDate('today')">Today</n-button>
        <n-button size="sm" @click="selectDate('next-month')"> Next Month </n-button>
        <n-button size="sm" @click="selectDate('next-year')"> Next Year </n-button>
      </n-button-group>
    </template>
  </n-calendar>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const calendar = ref();

    const selectDate = (val) => {
      calendar.value.selectDate(val);
    };
    return { calendar, selectDate };
  },
};
</script>
```

:::

## API

### Attributes

| 属性名                | 说明                                                                                                          | 类型  | 默认值 |
| :-------------------- | :------------------------------------------------------------------------------------------------------------ | :---- | :----- |
| model-value / v-model | 选中项绑定值                                                                                                  | Date  | —      |
| range                 | 时间范围，包括开始时间与结束时间。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。 | array | —      |

### Slots

| 插槽名 | 说明 | 类型 |
| :----- | :--- | :--- |
|     date-cell   | 	type 表示该日期的所属月份，可选值有 prev-month、current-month 和 next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 yyyy-MM-dd；date 是单元格的日期     |    object  |
|    header    |   卡片标题内容   |     object |

