# Statistic

### When to use

Used when it is necessary to display statistical data with description

### Basic Usage

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

### Numerical animation

We can start numerical animation by setting the animation attribute. You can start the animation when the page loads, or you can control it manually
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

### Use of slots

Prefix slot, suffix slot, extra slot
:::demo

```vue
<template>
  <n-row :gutter="16">
    <n-col :span="12">
      <n-statistic
        :value="336969"
        style="margin-right: 50px"
        group-separator=","
        :value-style="{ fontWeight: 'bold', fontSize: '30px' }"
        animation
      >
        <template #title>
          <span :style="{ marginRight: '10px' }">Number of articles read</span>
          <n-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">Compared before yesterday</span>
          <n-icon color="#F56C6C" name="arrow-down" />
          <n-statistic
            style="display: inline-block;"
            group-separator=","
            :value-style="{ fontSize: '15px', color: '#F56C6C', letterSpacing: '2px' }"
            value="1399"
            animation
          />
        </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic
        :value="5565566"
        style="margin-right: 50px"
        group-separator=","
        :value-style="{ fontWeight: 'bold', fontSize: '30px' }"
        animation
        :animation-duration="5000"
      >
        <template #title>
          <span :style="{ marginRight: '10px' }">Number of article likes</span>
          <n-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">Compared before yesterday</span>
          <n-icon color="#67C23A" name="arrow-up" />
          <n-statistic
            style="display: inline-block;"
            :value-style="{ fontSize: '15px', color: '#67C23A', letterSpacing: '2px' }"
            value="6669"
            animation
            group-separator=","
            :animation-duration="5000"
          />
        </template>
      </n-statistic>
    </n-col>
  </n-row>
</template>
```

:::

### Use in card

Display statistics in cards.
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

### n-statistic

|     parameter      |        type        | default |          introduce           |
| :----------------: | :----------------: | :-----: | :--------------------------: |
|       title        | `string \| v-slot` |    -    |        Title of value        |
|       extra        | `string \| v-slot` |    -    |        Extra content         |
|       value        | `number \| string` |    -    |        Value content         |
|  group-separator   |      `string`      |    ,    |     Set group-separator      |
|     precision      |      `number`      |    -    |    Set numeric precision     |
|       suffix       | `string \| v-slot` |    -    | Sets the suffix of the value |
|       prefix       | `string \| v-slot` |    -    | Sets the prefix of the value |
|   content-style    |      `style`       |    -    |        Content style         |
| animation-duration |      `number`      |  2000   |      Animation duration      |
|     value-from     |      `number`      |    0    |   Animation initial value    |
|     animation      |     `boolean`      |  false  |      Turn on animation       |
|       start        |     `boolean`      |  false  |       Start animation        |
