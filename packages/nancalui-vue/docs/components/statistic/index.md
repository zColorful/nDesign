# Statistic 统计数值

#### 何时使用

当需要展示带描述的统计类数据时使用

### 基本用法

:::demo

```vue
<template>
  <n-row>
    <n-col :span="12">
      <n-statistic title="Users Sales" group-separator="," :value="5201314"> </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic title="Account Weekly Sales (CNY)" group-separator="." :value="999999"> </n-statistic>
    </n-col>
  </n-row>
</template>
```

:::

### 数值动画

我们可以通过设置 animation 属性 开启数值动画。可以在页面加载时开始动画,也可以手动控制
:::demo

```vue
<template>
  <n-row :gutter="16">
    <n-col :span="12">
      <n-card>
        <n-statistic
          title="Animation Growth Rate"
          :value="88.265"
          suffix="%"
          :value-from="0"
          :start="start"
          :animation-duration="5000"
          animation
        ></n-statistic>
      </n-card>
    </n-col>
    <n-col :span="12">
      <n-card>
        <n-statistic title="Animation Decline Rate" value="53" :precision="3" :value-from="0" :start="controlStart" animation>
          <template #suffix>
            <span>%</span>
            <n-button @click="controlStart = true">Start</n-button>
          </template>
        </n-statistic>
      </n-card>
    </n-col>
  </n-row>
</template>
<script>
export default {
  data() {
    return {
      start: true,
      controlStart: false,
    };
  },
};
</script>
```

:::

### 插槽的使用

前缀插槽， 后缀插槽， 额外插槽
:::demo

```vue
<template>
  <n-row :gutter="16">
    <n-col :span="12">
      <n-statistic :value="336969" class="statistic-demo" group-separator="," animation>
        <template #title>
          <span :style="{ marginRight: '10px' }">文章阅读数</span>
          <n-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">较前日</span>
          <n-icon color="#F56C6C" name="arrow-down" />
          <n-statistic group-separator="," class="statistic-extra-demo" value="1399" animation />
        </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic :value="5565566" group-separator="," class="statistic-demo" animation :animation-duration="5000">
        <template #title>
          <span :style="{ marginRight: '10px' }">文章点赞数</span>
          <n-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">较前日</span>
          <n-icon color="#67C23A" name="arrow-up" />
          <n-statistic class="statistic-extra-demo" value="6669" animation group-separator="," :animation-duration="5000" />
        </template>
      </n-statistic>
    </n-col>
  </n-row>
</template>

<style>
.statistic-demo {
  margin-right: 50px;
}
.statistic-extra-demo {
  display: inline-block;
}
.statistic-demo .nancalui-statistic__content,
.statistic-extra-demo .nancalui-statistic__content {
  font-weight: bold;
  font-size: 30px;
}
</style>
```

:::

### 在卡片中使用

在卡片中展示统计数值。
:::demo

```vue
<template>
  <n-row :gutter="16">
    <n-col :span="12">
      <n-card>
        <n-statistic :value-style="{ color: '#fba' }" title="Growth Rate" :value="68.28" :precision="3" suffix="%">
          <template #prefix>
            <n-icon name="experice-new" />
          </template>
        </n-statistic>
      </n-card>
    </n-col>
    <n-col :span="12">
      <n-card>
        <n-statistic :value-style="{ color: '#abf' }" title="Decline Rate" :value="38.3" suffix="%">
          <template #prefix>
            <n-icon name="bold" />
          </template>
        </n-statistic>
      </n-card>
    </n-col>
  </n-row>
</template>
```

:::

### Statistic 参数

| 参数名             | 类型               | 默认  | 说明             |
| :----------------- | :----------------- | :---- | :--------------- |
| title              | `string \| v-slot` | -     | 数值的标题       |
| value              | `number \| string` | -     | 数值内容         |
| group-separator    | `string`           | -     | 设置千分位标识符 |
| precision          | `number`           | -     | 设置数值精度     |
| suffix             | `string \| v-slot` | -     | 设置数值的后缀   |
| prefix             | `string \| v-slot` | -     | 设置数值的前缀   |
| extra              | `string \| v-slot` | -     | 额外内容         |
| animation-duration | `number`           | 2000  | 动画持续时间     |
| value-from         | `number`           | 0     | 动画初始值       |
| animation          | `boolean`          | false | 是否开启动画     |
| start              | `boolean`          | true  | 是否开始动画     |
