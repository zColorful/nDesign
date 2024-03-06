# Tabs 选项卡

选项卡切换组件。

#### 何时使用

用户需要通过平级的区域将大块内容进行收纳和展现，保持界面整洁。

### 基本用法

:::demo

```vue
<template>
  <n-tabs v-model="id">
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="size" direction="row" type="button">
      <n-radio-button value="sm">sm</n-radio-button>
      <n-radio-button value="md">md</n-radio-button>
      <n-radio-button value="lg">lg</n-radio-button>
    </n-radio-group>
  </div>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="type" direction="row" type="button">
      <n-radio-button value="line">Line</n-radio-button>
      <n-radio-button value="card">Card</n-radio-button>
      <n-radio-button value="card-gutter">Card Gutter</n-radio-button>
      <n-radio-button value="text">Text</n-radio-button>
      <n-radio-button value="options">Options</n-radio-button>
      <n-radio-button value="pills">Pills</n-radio-button>
    </n-radio-group>
  </div>
  <n-tabs :type="type" :size="size" v-model="id">
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    const type = ref('line');
    const size = ref('md');
    return {
      id,
      type,
      size,
    };
  },
});
</script>
```

:::

### 不同位置

:::demo

```vue
<template>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="type" direction="row" type="button">
      <n-radio-button value="line">Line</n-radio-button>
      <n-radio-button value="card">Card</n-radio-button>
      <n-radio-button value="card-gutter">Card Gutter</n-radio-button>
      <n-radio-button value="text">Text</n-radio-button>
      <n-radio-button value="options">Options</n-radio-button>
      <n-radio-button value="pills">Pills</n-radio-button>
    </n-radio-group>
  </div>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="position" direction="row" type="button">
      <n-radio-button value="top">Top</n-radio-button>
      <n-radio-button value="right">Right</n-radio-button>
      <n-radio-button value="bottom">Bottom</n-radio-button>
      <n-radio-button value="left">Left</n-radio-button>
    </n-radio-group>
  </div>

  <n-tabs :position="position" v-model="id" :type="type">
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    const position = ref('left');
    const type = ref('line');
    return {
      id,
      type,
      position,
    };
  },
});
</script>
```

:::

### 带图标的页签

:::demo

```vue
<template>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="type" direction="row" type="button">
      <n-radio-button value="line">Line</n-radio-button>
      <n-radio-button value="card">Card</n-radio-button>
      <n-radio-button value="card-gutter">Card Gutter</n-radio-button>
      <n-radio-button value="text">Text</n-radio-button>
      <n-radio-button value="options">Options</n-radio-button>
      <n-radio-button value="pills">Pills</n-radio-button>
    </n-radio-group>
  </div>
  <n-tabs v-model="id" :type="type">
    <n-tab id="tab1" title="Tab1">
      <template v-slot:title><n-icon name="code" class="mr-xxs" />代码</template>
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <template v-slot:title><n-icon name="merge-request" class="mr-xxs" />合并请求</template>
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <template v-slot:title><n-icon name="help" class="mr-xxs" />Issues</template>
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    const type = ref('line');
    return {
      id,
      type,
    };
  },
});
</script>
```

:::

### 懒加载

:::demo

```vue
<template>
  <n-tabs v-model="id" lazy-load>
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### 附加内容

:::demo

```vue
<template>
  <n-tabs v-model="id">
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3" disabled>
      <p>Tab3 Content</p>
    </n-tab>

    <template #extra>
      <n-button>Action</n-button>
    </template>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### 拦截 tab 切换

:::demo

```vue
<template>
  <n-tabs v-model="id" :before-change="beforeChange" @active-tab-change="activeTabChange">
    <n-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </n-tab>
    <n-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </n-tab>
    <n-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab3');
    const beforeChange = (item) => {
      if (item.id === 'tab1') {
        return false;
      } else {
        return true;
      }
    };
    const activeTabChange = (id) => {
      console.log(id, 'activeTabChange');
    };
    return {
      id,
      beforeChange,
      activeTabChange,
    };
  },
});
</script>
```

:::

### 撑满容器高度（水平模式下有效）

:::demo

```vue
<template>
  <div style="height: 400px;">
    <n-tabs v-model="id" justify customWidth="60px">
      <n-tab id="tab1" title="Tab1">
        <p>Tab1 Content</p>
      </n-tab>
      <n-tab id="tab2" title="Tab2">
        <p>Tab2 Content</p>
      </n-tab>
      <n-tab id="tab3" title="Tab3">
        <p>Tab3 Content</p>
      </n-tab>
    </n-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab3');
    const beforeChange = (item) => {
      if (item.id === 'tab1') {
        return false;
      } else {
        return true;
      }
    };
    const activeTabChange = (id) => {
      console.log(id, 'activeTabChange');
    };
    return {
      id,
      beforeChange,
      activeTabChange,
    };
  },
});
</script>
```

:::

### 添加/删除

添加和删除选项卡

#### tabs

在 n-tabs 上设置 `closeable`、`addable`可显示关闭和新增 tab 的按钮。`tab-add`和`tab-remove`事件分别在添加和删除按钮被点击时触发。仅在 `line` | `card` | `card-gutter` 可以增加

:::demo

```vue
<template>
  <div style="margin-bottom: 20px;">
    <n-radio-group v-model="type" direction="row" type="button">
      <n-radio-button value="line">Line</n-radio-button>
      <n-radio-button value="card">Card</n-radio-button>
      <n-radio-button value="card-gutter">Card Gutter</n-radio-button>
      <n-radio-button value="text">Text</n-radio-button>
      <n-radio-button value="options">Options</n-radio-button>
      <n-radio-button value="pills">Pills</n-radio-button>
    </n-radio-group>
  </div>
  <n-tabs v-model="editableId" :type="type" closable addable @tab-add="tabAdd" @tab-remove="tabRemove">
    <n-tab v-for="tab in tabs" :key="tab.id" :id="tab.id" :title="tab.title" :closable="tab.id !== 'tab1'" :disabled="tab.id === 'tab3'">
      <p>{{ tab.title }} Content</p>
    </n-tab>
  </n-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const editableId = ref('tab1');
    const type = ref('line');
    const tabs = ref([
      { id: 'tab1', title: 'Tab1' },
      { id: 'tab2', title: 'Tab2' },
      { id: 'tab3', title: 'Tab3' },
      { id: 'tab4', title: 'Tab4' },
      { id: 'tab5', title: 'Tab5' },
      { id: 'tab6', title: 'Tab6' },
      { id: 'tab7', title: 'Tab7' },
      { id: 'tab8', title: 'Tab8' },
      { id: 'tab9', title: 'Tab9' },
      { id: 'tab10', title: 'Tab10' },
      { id: 'tab11', title: 'Tab11' },
      { id: 'tab12', title: 'Tab12' },
      { id: 'tab13', title: 'Tab13' },
    ]);
    const tabAdd = () => {
      for (let i = 1; i <= tabs.value.length + 1; i++) {
        if (!tabs.value.find((item) => item.id === `tab${i}`)) {
          tabs.value.push({ id: `tab${i}`, title: `Tab${i}` });
          break;
        }
      }
    };
    const tabRemove = (targetTab) => {
      if (tabs.value.length === 1) {
        return;
      }
      const tempTabs = tabs.value;
      let activeName = editableId.value;

      if (activeName === targetTab.id) {
        tempTabs.forEach((tab, index) => {
          if (tab.id === targetTab.id) {
            const nextTab = tempTabs[index + 1] || tempTabs[index - 1];
            if (nextTab) {
              activeName = nextTab.id;
            }
          }
        });
      }

      editableId.value = activeName;
      tabs.value = tempTabs.filter((tab) => tab.id !== targetTab.id);
    };

    return {
      editableId,
      type,
      tabs,
      tabAdd,
      tabRemove,
    };
  },
});
</script>
```

:::

### Tabs 参数

| 参数          | 类型                                  | 默认         | 说明                                                                   |
| ------------- | ------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| type          | [TabsType](#TabsType)                 | 'line'       | 可选，选项卡组的类型                                                   |
| hideContent   | `boolean`                             | false        | 可选，是否隐藏内容                                                     |
| modelValue    | `string/number`                       | --           | 可选，当前激活的选项卡，值为选项卡的 id                                |
| customWidth   | `string`                              | --           | 可选，自定义选项卡的宽                                                 |
| position      | [TabsPosition](#TabsPosition)         | 'top'        | 可选，选项卡的位置                                                     |
| direction     | `'horizontal'/ 'vertical'`            | 'horizontal' | 可选，选项卡的方向                                                     |
| destroyOnHide | `boolean`                             | false        | 可选，是否在不显示标签时销毁内容                                       |
| beforeChange  | [BeforeChangeFunc](#BeforeChangeFunc) | --           | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换 |
| closable      | `boolean`                             | false        | 可选，是否显示删除 tab 图标                                            |
| addable       | `boolean`                             | false        | 可选，是否显示添加 tab 图标                                            |
| lazyLoad      | `boolean`                             | false        | 可选，是否在首次展示标签时挂载内容                                     |
| justify       | `boolean`                             | false        | 可选，高度撑满容器，只在水平模式下生效                                 |
| animation     | `boolean`                             | false        | 可选，是否开启选项内容过渡动画                                         |
| autoSwitch    | `boolean`                             | false        | 可选，创建标签后是否切换到新标签（最后一个）                           |
| trigger       | `'click'/'hover'`                     | 'click'      | 可选，触发方式                                                         |

### Tabs 事件

| 参数            | 类型                                 | 说明                                                   |
| --------------- | ------------------------------------ | ------------------------------------------------------ |
| change          | `(key: string / number) => true`     | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id    |
| activeTabChange | `(key: string / number) => true`     | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id    |
| tabRemove       | `(item: TabData, ev: Event) => true` | 可选，点击 tab 移除按钮时触发， `tab`是删除的 tab 对象 |
| tabAdd          | `(ev: Event) => true`                | 可选，点击 tab 新增按钮时触发                          |
| tabClick        | `(item: TabData, ev: Event) => true` | 可选，用户点击标签时触发                               |

### Tab 参数

| 参数          | 类型             | 默认  | 说明                                                              |
| ------------- | ---------------- | ----- | ----------------------------------------------------------------- |
| id            | `number\|string` | --    | 可选，选项卡的 id 值, 需要设置为唯一值                            |
| title         | `string`         | --    | 可选，选项卡的标题                                                |
| disabled      | `boolean`        | false | 可选，选项卡是否不可用                                            |
| closable      | `boolean`        | false | 可选，选项卡是否可关闭，tabs 的 closable 为 true 时，该属性不生效 |
| destroyOnHide | `boolean`        | false | 可选，是否在不显示标签时销毁内容                                  |

### Tab 插槽

| 名称  | 说明             |
| ----- | ---------------- |
| title | 自定义选项卡标题 |

### 类型定义

#### TabData

```ts
export interface TabData {
  id: string | number;
  title?: string;
  disabled?: boolean;
  closable?: boolean;
  slots: Slots;
  [key: string]: any;
}
```

#### TabsType

```ts
export type TabsType = 'line' | 'card' | 'card-gutter' | 'text' | 'options' | 'pills';
```

#### BeforeChangeFunc

```ts
export type BeforeChangeFunc = (item: TabData) => boolean | Promise<boolean>;
```

#### TabsPosition

```ts
type TabsPosition = 'left' | 'right' | 'top' | 'bottom';
```
