# Carousel

An area of carousel.

### When To Use

Used to display images or cards.

### Basic Usage

:::demo

```vue
<template>
  <n-carousel height="200px">
    <n-carousel-item v-for="item in items" :key="item">{{ item }}</n-carousel-item>
  </n-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.n-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--nancalui-global-bg, #f3f6f8);
}
</style>
```

:::

### Indicator&Toggle-Arrow

If arrowTrigger is set to always, the arrow is permanently displayed. If dotTrigger is set to hover, it will switched when hover to the dots.

:::demo

```vue
<template>
  <n-carousel height="200px" arrowTrigger="always" dotTrigger="hover">
    <n-carousel-item v-for="item in items" :key="item">{{ item }}</n-carousel-item>
  </n-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.n-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--nancalui-global-bg, #f3f6f8);
}
</style>
```

:::

### Automatic-NVOD

:::demo

```vue
<template>
  <n-carousel height="200px" autoplay :autoplaySpeed="3000">
    <n-carousel-item v-for="item in items" :key="item">{{ item }}</n-carousel-item>
  </n-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.n-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--nancalui-global-bg, #f3f6f8);
}
</style>
```

:::

### Custom-Operations

:::demo

```vue
<template>
  <n-carousel ref="carousel" height="200px" arrowTrigger="never">
    <n-carousel-item v-for="item in items" :key="item">{{ item }}</n-carousel-item>
  </n-carousel>
  <div class="carousel-demo-operate">
    <n-button bsStyle="common" @click="onPrev">Prev</n-button>
    <n-button bsStyle="primary" @click="onNext">Next</n-button>
    <n-button bsStyle="common" @click="onGoFirst">First</n-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    const carousel = ref();
    const onPrev = () => {
      carousel.value?.prev?.();
    };
    const onNext = () => {
      carousel.value?.next?.();
    };
    const onGoFirst = () => {
      carousel.value?.goto?.(0);
    };
    return {
      items,
      carousel,
      onPrev,
      onNext,
      onGoFirst,
    };
  },
});
</script>
<style>
.carousel-demo-operate {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.carousel-demo-operate .nancalui-btn-host {
  margin-right: 20px;
}
</style>
```

:::

### API

#### parameter

|   Parameter   |             Type             | Default  |                                                       Description                                                       | Jump to Demo                                        |
| :-----------: | :--------------------------: | :------: | :---------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------- |
| arrowTrigger  | `'hover'\|'never'\|'always'` | 'hover'  |                              Optional. Specifying the display mode of the switching arrow                               | [Indicator & Toggle Arrow](#indicator-toggle-arrow) |
|   autoplay    |          `boolean`           |  false   |                                 Optional. Indicating whether to enable automatic NVOD.                                  | [Automatic NVOD](#automatic-nvod)                   |
| autoplaySpeed |           `number`           |   3000   |                 Optional. Automatic NVOD speed, in ms. This parameter is used together with `autoplay'.                 | [Automatic NVOD](#automatic-nvod)                   |
|    height     |           `string`           |  '100%'  |                                             Optional. NVOD container height                                             | [Basic usage](#basic-usage)                         |
|   showDots    |          `boolean`           |   true   |                               Optional. Indicating whether to display the panel indicator                               | [Automatic NVOD](#automatic-nvod)                   |
|  dotPosition  |      `'top'\|'bottom'`       | 'bottom' |                                        Optional. Indicator position on the panel                                        | [Indicator & Toggle Arrow](#indicator-toggle-arrow) |
|  dotTrigger   |      `click'\|'hover'`       | 'click'  |                                     Optional. The indicator triggers the NVOD mode                                      | [Indicator & Toggle Arrow](#indicator-toggle-arrow) |
|  activeIndex  |           `number`           |    0     | Optional. Initializes the activation card index, starting from 0. `[(activeIndex)]` bidirectional binding is supported. | [Basic usage](#basic-usage)                         |

#### event

|       Event       |          Type          |                                        Description                                        | Jump to Demo                |
| :---------------: | :--------------------: | :---------------------------------------------------------------------------------------: | --------------------------- |
| activeIndexChange | `EventEmitter<number>` | Returns the index of the current card when the card is switched. The index starts from 0. | [Basic usage](#basic-usage) |

#### method

|   Method    | Description                                                         | Jump to Demo                            |
| :---------: | :------------------------------------------------------------------ | :-------------------------------------- |
|   prev()    | Switch to the previous card                                         | [Custom Operations](#custom-operations) |
|   next()    | Switch to the next card                                             | [Custom Operations](#custom-operations) |
| goTo(index) | Switch to the card with a specified index. The index starts from 0. | [Custom Operations](#custom-operations) |
