# Tooltip 提示

文字提示组件。

#### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

:::demo 默认在触发元素的上方展示提示信息，可通过`position`更改展示位置；`content`可设置提示信息；`show-animation`控制是否开启动画;`disabled`提示组件是否可用;`enterable`鼠标是否可以进入 tooltip;。

```vue
<template>
  <div class="demo-btn-group" :style="{ position: 'relative', width: '440px', height: '280px' }">
    <!-- <n-tooltip content="This is a Tooltip" position="tl">
      <div class="button" :style="{ position: 'absolute', top: '0', left: '70px' }">TL</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="top">
      <div class="button" :style="{ position: 'absolute', top: '0', left: '180px' }">TOP</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="tr">
      <div class="button" :style="{ position: 'absolute', top: '0', left: '290px' }">TR</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="bl">
      <div class="button" :style="{ position: 'absolute', top: '240px', left: '70px' }">BL</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="bottom">
      <div class="button" :style="{ position: 'absolute', top: '240px', left: '180px' }">BOTTOM</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="br">
      <div class="button" :style="{ position: 'absolute', top: '240px', left: '290px' }">BR</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="lt">
      <div class="button" :style="{ position: 'absolute', top: '60px', left: '10px' }">LT</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="left">
      <div class="button" :style="{ position: 'absolute', top: '120px', left: '10px' }">LEFT</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="lb">
      <div class="button" :style="{ position: 'absolute', top: '180px', left: '10px' }">LB</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="rt">
      <div class="button" :style="{ position: 'absolute', top: '60px', left: '350px' }">RT</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="right">
      <div class="button" :style="{ position: 'absolute', top: '120px', left: '350px' }">RIGHT</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip" position="rb">
      <div class="button" :style="{ position: 'absolute', top: '180px', left: '350px' }">RB</div>
    </n-tooltip>

    <n-tooltip content="This is a Tooltip" disabled>
      <div class="button" :style="{ position: 'absolute', top: '120px', left: '130px' }">disabled</div>
    </n-tooltip>
    <n-tooltip content="This is a Tooltip you can't hover" :enterable="false" background-color="#ff0000">
      <div class="button" :style="{ position: 'absolute', top: '120px', left: '230px' }">enterable</div>
    </n-tooltip> -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      message: ref('Upload a file in sh,js,ts,java,css,html,xml.aql,rb,py,php,c,cpp,txt format.'),
    };
  },
});
</script>

<style>
.demo-btn-group > .button {
  line-height: 30px;
  width: 80px;
  border: 1px solid black;
  text-align: center;
}
</style>
```

:::

### 延时触发

:::demo 鼠标移入的时长超过 `mouse-enter-delay` 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 100 毫秒；鼠标移出之后，再经过`mouse-leave-delay`毫秒后，Tooltip 组件才会隐藏，默认值是 100 毫秒。

```vue
<template>
  <div class="demo-btn-group">
    <!-- <n-tooltip content="Mouse enter 500ms later Show me" :mouse-enter-delay="500">
      <n-button variant="solid">MouseEnter delay 500ms</n-button>
    </n-tooltip>
    <n-tooltip content="123" :mouse-leave-delay="1000">
      <n-button>MouseLeave delay 1000ms</n-button>
      <template #content>
        <span>Mouse leave 1000ms later</br> Hide me</span>
      </template>
    </n-tooltip> -->
  </div>
</template>
```

:::

### Tooltip 参数

| 参数名          | 类型                              | 默认值 | 说明                                              | 跳转 Demo             |
| :-------------- | :-------------------------------- | :----- | :------------------------------------------------ | :-------------------- |
| popupVisible    | `boolean`                         | --     | 可选，自行控制展示弹框                            |                       |
| content         | `string`                          | --     | 可选，Tooltip 显示内容                            | [基本用法](#基本用法) |
| position        | TriggerPosition(#TriggerPosition) | top    | 可选，Tooltip 显示位置                            | [基本用法](#基本用法) |
| backgroundColor | `string`                          | --     | 可选，Tooltip 背景色                              | [基本用法](#基本用法) |
| contentClass    | `Object/string`                   | --     | 可选，弹出框内容的类名                            |                       |
| contentStyle    | `Object`                          | --     | 可选， 弹出框内容的样式                           |                       |
| arrowClass      | `Object/string`                   | --     | 可选，弹出框箭头的类名                            |                       |
| arrowStyle      | `Object`                          | --     | 可选， 弹出框箭头的样式                           |                       |
| popupContainer  | `string/HTMLElement`              | --     | 可选， 弹出框的挂载容器                           |                       |
| mouseEnterDelay | `number`                          | 100    | 可选，鼠标移入后延时多久才显示 Tooltip，单位是 ms | [延时触发](#延时触发) |
| mouseLeaveDelay | `number`                          | 100    | 可选，鼠标移出后延时多久才隐藏 Tooltip，单位是 ms | [延时触发](#延时触发) |
| disabled        | `boolean`                         | false  | 可选，Tooltip 是否可用                            | [基本用法](#基本用法) |
| enterable       | `boolean`                         | true   | 可选，Tooltip 的弹框部分是否可以被鼠标移出        | [基本用法](#基本用法) |

### Tooltip 插槽

| 插槽名  | 说明                                         |
| :------ | :------------------------------------------- |
| default | 默认插槽，设置触发元素                       |
| content | 弹出内容插槽，优先于 props 里的 content 属性 |

### Tooltip 事件

| 参数名             | 类型                         | 默认值 | 说明                       | 跳转 Demo |
| :----------------- | :--------------------------- | :----- | :------------------------- | :-------- |
| popupVisibleChange | `(visible: boolean) => void` | --     | 文字气泡显示状态改变时触发 |           |

### Tooltip 类型定义

#### TriggerPosition

```ts
type TriggerPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb';
```
