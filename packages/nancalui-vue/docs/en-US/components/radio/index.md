# Radio

Radio button.

### When To Use

The user selects a single option from a dataset and can view all options.

### Independent Radios

:::demo

```vue
<template>
  <n-radio v-for="item in list" v-model="choose" :key="item" :value="item" :style="{ marginBottom: '20px' }">
    The Radio value is: {{ item }}
  </n-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### Switch with Condition

The second item cannot be redirected based on the condition.

:::demo

```vue
<template>
  <n-radio
    v-for="item in list"
    v-model="choose"
    :key="item"
    :value="item"
    :beforeChange="beforeChange"
    :style="{ marginBottom: '20px' }"
    @change="valChange"
  >
    The Radio value is: {{ item }}
  </n-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
      beforeChange(value) {
        return value !== 'Item2';
      },
      valChange(val) {
        console.log('current value', val);
      },
    };
  },
});
</script>
```

:::

### Switch With Condition in A Radio Group

The second radio group is not allowed to jump.

:::demo

```vue
<template>
  <n-radio-group direction="row" v-model="choose" :beforeChange="beforeChange">
    <n-radio v-for="item in list" :key="item" :value="item">
      {{ item }}
    </n-radio>
  </n-radio-group>
  <n-radio-group v-model="choose2" direction="row" disabled>
    <n-radio v-for="item in list2" :key="item" :value="item">
      {{ item }}
    </n-radio>
  </n-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    const list2 = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const choose2 = ref('Summer');

    return {
      list,
      choose,
      list2,
      choose2,
      beforeChange(value) {
        return value !== 'Item2';
      },
    };
  },
});
</script>
```

:::

### Disabled Radio

:::demo

```vue
<template>
  <n-radio v-for="item in list" v-model="choose" :key="item" :value="item" :style="{ marginBottom: '20px' }" disabled>
    The Radio value is: {{ item }}
  </n-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### Horizontal Arrangement

:::demo

```vue
<template>
  <n-radio-group direction="row" v-model="choose">
    <n-radio v-for="item in list" :key="item" :value="item"> The Radio value is: {{ item }} </n-radio>
  </n-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### Vertical Arrangement

:::demo

```vue
<template>
  <n-radio-group :values="list" v-model="choose"></n-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const choose = ref('Summer');

    return {
      list,
      choose,
      valChange(val) {
        console.log('current value', val);
      },
    };
  },
});
</script>
```

:::

### Custom Radios

The array source can be a common array or an object array.

:::demo

```vue
<template>
  <n-radio-group direction="row" v-model="choose">
    <n-radio v-for="item in list" :key="item" :value="item"> The Radio value is: {{ item }} </n-radio>
  </n-radio-group>
  <n-radio-group direction="row" v-model="choose2">
    <n-radio v-for="item in list2" :key="item.name" :value="item.name"> The Radio value is: {{ item.name }} </n-radio>
  </n-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    const list2 = [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }];
    let choose2 = ref('Item3');

    return {
      list,
      choose,
      list2,
      choose2,
    };
  },
});
</script>
```

:::

### API

n-radio Parameters

|  Parameter   |         Type         | Default | Description                                                                                                                                  | Jump to Demo                                    |
| :----------: | :------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
|     name     |       `string`       |   --    | Optional. Single-option name                                                                                                                 | [Independent Radios](#independent-radios)       |
|    value     |       `string`       |   --    | Required. Single-option value                                                                                                                | [Independent Radios](#independent-radios)       |
|   disabled   |      `boolean`       |  false  | Optional. Whether to disable this option.                                                                                                    | [Disabled Radio](#disablen-radio)               |
| beforeChange | `Function / Promise` |   --    | Callback function before radio switching, which is optional. The return type is boolean. If false is returned, radio switching is prevented. | [Switch with Condition](#switch-with-condition) |

n-radio Event

| Parameter |          Type          | Description                                                                                                    | Jump to Demo                              |
| :-------: | :--------------------: | :------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
|  change   | `EventEmitter<string>` | Form event. This event is triggered when the value of a single option changes. The selected value is returned. | [Independent Radios](#independent-radios) |

n-radio-group Parameters

|  Parameter   |         Type         | Default  | Description                                                                                                                                        | Jump to Demo                                                                      |
| :----------: | :------------------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
|     name     |       `string`       |    --    | Optional. Single-option name (unique identifier of the radio)                                                                                      | [Horizontal Arrangement](#horizontal-arrangement)                                 |
|    values    |       `array`        |    --    | Optional. Single-choice data group                                                                                                                 | [Horizontal Arrangement](#horizontal-arrangement)                                 |
|   disabled   |      `boolean`       |  false   | Optional. Whether to disable this radio-group                                                                                                      | [Switch With Condition in A Radio Group](#switch-with-condition-in-a-radio-group) |
|  direction   |  `'row' / 'column'`  | 'column' | Optional. Set the horizontal or vertical arrangement                                                                                               | [Horizontal Arrangement](#horizontal-arrangement)                                 |
| beforeChange | `Function / Promise` |    --    | Callback function before radio-group switching. The return value is of the boolean type. If false is returned, radio-group switching is prevented. | [Switch With Condition in A Radio Group](#switch-with-condition-in-a-radio-group) |

n-radio-group Event

| Parameter |          Type          | Description                                                                             | Jump to Demo                                      |
| :-------: | :--------------------: | :-------------------------------------------------------------------------------------- | ------------------------------------------------- |
|  change   | `EventEmitter<string>` | Triggered when the value of a single option changes and the selected value is returned. | [Horizontal Arrangement](#horizontal-arrangement) |
