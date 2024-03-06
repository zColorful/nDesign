# Menu 菜单

Menu 组件通常用于导航.

### 何时使用

在需要收纳，排列，展示一系列选项时.

### 基本用法

:::demo 如果屏幕尺寸过小，则会出现省略号

```vue
<template>
  <n-menu mode="horizontal" :default-select-keys="['home']" style="margin-bottom: 120px" :width="width + 'px'">
    <n-menu-item key="home">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      首页
    </n-menu-item>
    <n-sub-menu title="课程" key="course">
      <n-menu-item key="c"> C </n-menu-item>
      <n-sub-menu title="Python" key="python" disabled>
        <n-menu-item key="basic"> 基础 </n-menu-item>
        <n-menu-item key="advanced"> 进阶 </n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
    <n-menu-item key="person">个人</n-menu-item>
    <n-menu-item key="custom" href="https://www.baidu.com" disabled> Link To Baidu </n-menu-item>
  </n-menu>
  <n-slider :min="0" :max="480" v-model="width"></n-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let width = ref(480);
</script>
```

:::

### 自定义图标

有时我们需要为子菜单或菜单项定义一些图标，此时我们可以使用`icon`插槽来为菜单定义 icon。同时我们也可以使用 css 来对插槽进行定制化的修改.

:::demo

```vue
<template>
  <n-menu mode="horizontal">
    <n-menu-item key="home">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      主页
    </n-menu-item>
    <n-menu-item key="course"> 课程 </n-menu-item>
  </n-menu>
</template>
```

:::

### 垂直菜单

垂直菜单一般在后台中较为广泛使用，子菜单可以嵌入菜单中

:::demo

```vue
<template>
  <n-menu mode="vertical" :default-select-keys="['system-item']" width="256px">
    <n-menu-item key="item1">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </n-menu-item>
    <n-sub-menu title="System" key="system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <n-menu-item key="system-item">
        <span>System item</span>
      </n-menu-item>
      <n-sub-menu title="Setting" key="setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <n-menu-item key="setting-item">
          <span>Setting item</span>
        </n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
  </n-menu>
</template>
```

:::

### 默认展开

通过设置`open-keys`可以修改展开的子菜单项目.

:::demo

```vue
<template>
  <n-menu width="256px" mode="vertical" :open-keys="['sub1', 'sub3']">
    <n-sub-menu key="sub1" title="sub1">
      <n-menu-item key="Sub1-item1"> Sub1 > item1 </n-menu-item>
      <n-menu-item key="Sub1-item2"> Sub1 > item2 </n-menu-item>
    </n-sub-menu>
    <n-sub-menu key="sub2" title="sub2">
      <n-menu-item key="Sub2-item1"> Sub2 > item1 </n-menu-item>
      <n-menu-item key="Sub2-item2"> Sub2 > item2 </n-menu-item>
    </n-sub-menu>
    <n-sub-menu key="sub3" title="sub3">
      <n-menu-item key="Sub3-item1"> Sub3 > item1 </n-menu-item>
      <n-menu-item key="Sub3-item2"> Sub3 > item2 </n-menu-item>
    </n-sub-menu>
  </n-menu>
</template>
```

:::

### 仅展开一项根子菜单

:::demo 通过设置 uniqueOpened 达到效果

```vue
<template>
  <n-menu uniqueOpened :default-select-keys="['subemenu-item-1']" :open-keys="openKeys" width="256px">
    <n-sub-menu title="submenu-1" key="submenu-1">
      <template #icon>
        <i class="icon-infomation"></i>
      </template>
      <n-menu-item :parentKey="['submenu-1']" key="subemenu-item-1">
        <span>submenu-item-1</span>
      </n-menu-item>
      <n-sub-menu title="submenu-4" :parentKey="['submenu-1']" key="submenu-4">
        <template #icon>
          <i class="icon-infomation"></i>
        </template>
        <n-menu-item :parentKey="['submenu-1', 'submenu-4']" key="subemenu-item-1">
          <span>submenu-item-1</span>
        </n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
    <n-sub-menu title="submenu-2" key="submenu-2">
      <template #icon>
        <i class="icon-setting"></i>
      </template>
      <n-menu-item :parentKey="['submenu-2']" key="submenu-item-2">
        <span>submenu-item-2</span>
      </n-menu-item>
    </n-sub-menu>
  </n-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const openKeys = ref(['submenu-1', 'submenu-4']);
    return {
      openKeys,
    };
  },
});
</script>
```

:::

### 收缩菜单

:::demo

```vue
<n-button @click="changeCollapsed">
  Collapsed
</n-button>
<template>
  <n-menu :collapsed-indent="48" mode="vertical" width="256px" :default-select-keys="['item1']" :collapsed="collapsed">
    <n-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </n-menu-item>
    <n-sub-menu title="System" key="system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <n-menu-item key="system-item">
        <span>System item</span>
      </n-menu-item>
      <n-sub-menu title="Setting" key="setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <n-menu-item key="setting-item">
          <span>Setting item</span>
        </n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
  </n-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let collapsed = ref(true);
    const isDisabled = ref(false);
    const changeCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      collapsed,
      isDisabled,
      changeCollapsed,
    };
  },
});
</script>
```

:::

### 取消多选

取消多选功能仅能使用在允许多选的菜单中，菜单项将会在取消多选时触发`deselect`事件。

:::demo

```vue
<template>
  <n-menu @select="select" @deselect="deselect" @submenu-change="submenuChange" :default-select-keys="['item1']" multiple width="256px">
    <n-menu-item key="item1"
      ><template #icon>
        <i class="icon-setting"></i>
      </template>
      Item1
    </n-menu-item>
    <n-menu-item key="item2"> Item2 </n-menu-item>
    <n-sub-menu title="Setting" key="icon-setting">
      <template #icon>
        <i class="icon-setting"></i>
      </template>
      <n-menu-item key="setting-item">
        <span>Setting item</span>
      </n-menu-item>
    </n-sub-menu>
  </n-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const select = (e) => {
      console.log(e);
    };
    const deselect = (e) => {
      console.log(e);
    };
    const submenuChange = (e) => {
      console.log(e);
    };
    return {
      select,
      deselect,
      submenuChange,
    };
  },
});
</script>
```

:::

### 响应式参数

例如,`width`, `open-keys`, `default-select-keys`等参数均为响应式

:::demo

```vue
<template>
  <n-button @click="changeDisabled">changeDisabled</n-button>
  <n-menu mode="vertical" :width="width + 'px'" :default-select-keys="['system-item']" :collapsed="collapsed">
    <n-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </n-menu-item>
    <n-sub-menu title="System" key="icon-system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <n-menu-item key="system-item">
        <span>System item</span>
      </n-menu-item>
      <n-sub-menu title="Setting" key="icon-setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <n-menu-item key="setting-item">
          <span>Setting item</span>
        </n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
  </n-menu>
  <br />
  <n-slider :min="0" :max="480" v-model="width"></n-slider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let collapsed = ref(false);
let isDisabled = ref(false);
let width = ref(256);
const changeDisabled = () => {
  isDisabled.value = !isDisabled.value;
  console.log(isDisabled.value);
};
</script>
```

:::

### Menu 参数

| 参数                | 类型                  | 默认       | 说明                                                                            | 跳转 Demo                                                                                                                                                                |
| ------------------- | --------------------- | ---------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| width               | String                | ''         | 用于控制菜单宽度                                                                | [响应式参数](#响应式参数)                                                                                                                                                |
| collapsed           | Boolean               | false      | 用于决定菜单是否收起                                                            | [收缩菜单](#收缩菜单)                                                                                                                                                    |
| collapsed-indent    | Number                | 24         | 收起时图标距离左右边框的距离                                                    | [收缩菜单](#收缩菜单)                                                                                                                                                    |
| multiple            | Boolean               | false      | 是否可以多选                                                                    | [取消多选](#取消多选)                                                                                                                                                    |
| mode                | [menuMode](#menumode) | 'vertical' | 菜单类型                                                                        | [基本用法](#基本用法)                                                                                                                                                    |
| open-keys           | Array                 | []         | 默认展开的子菜单 key 值                                                         | [默认展开](#默认展开)                                                                                                                                                    |
| default-select-keys | Array                 | []         | 默认选择菜单项 key 值                                                           | [基本用法](#基本用法)                                                                                                                                                    |
| parentKey           | Array                 | []         | 父元素 key 数组                                                                 | [基本用法](#基本用法)                                                                                                                                                    |
| router              | Boolean               | false      | 是否启用`vue-router`模式。启用该模式会在激活导航时以 key 作为 path 进行路由跳转 | -                                                                                                                                                                        |
| uniqueOpened        | Boolean               | false      | 是否只保持一个子菜单的展开                                                      |
| 设置菜单颜色        | String                |            | 用于设置菜单默认颜色                                                            | nancalui-menu-bg：背景色；nancalui-menu-item-sub：二级菜单背景色；nancalui-menu-item：字体色；nancalui-menu-item-hover：选中字体色；nancalui-menu-disabled：禁用字体色； |

### Menu 事件

| 事件           | 类型                                                                                | 说明                                                                   | 跳转 Demo             |
| -------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------- |
| select         | `(e: {type: 'select', key: string, el: HTMLElement, e: PointerEvent})=>void`        | 选中菜单项时触发该事件,被禁用的选项不会被触发                          | [取消多选](#取消多选) |
| deselect       | `(e: {type: 'deselect', key: string, el: HTMLElement, e: PointerEvent})=>void`      | 取消选中时触发该事件，如果菜单不是多选菜单不会被触发                   | [取消多选](#取消多选) |
| submenu-change | `(e: {type: 'submenu-change', state: boolean, key: string, el: HTMLElement})=>void` | 子菜单状态被更改时会触发，state 为 true 代表展开，sate 为 false 为关闭 | [取消多选](#取消多选) |

### MenuItem 参数

|   参数   |  类型   | 默认  |          说明           |       跳转 Demo       |
| :------: | :-----: | :---: | :---------------------: | :-------------------: |
| disabled | boolean | false |        是否禁用         |           -           |
|   key    | string  |  ''   | 菜单项的 key 值，需唯一 |           -           |
|   href   | string  |  ''   | 单击菜单项后跳转的页面  | [基本用法](#基本用法) |
|  route   | object  |   -   |   Vue Router 路径对象   |           -           |

### SubMenu 参数

|   参数   |  类型   | 默认  |      说明      |       跳转 Demo       |
| :------: | :-----: | :---: | :------------: | :-------------------: |
|  title   | String  |  ''   |   子菜单标题   | [基本用法](#基本用法) |
| disabled | boolean | false | 是否禁用子菜单 |           -           |

### MenuItem 插槽

| 插槽名 |         说明          |
| :----: | :-------------------: |
|  icon  | 用于定义菜单项的 icon |

### SubMenu 插槽

| 插槽名 |           说明            |
| :----: | :-----------------------: |
|  icon  | 用于定义子菜单标题的 icon |

### menu 类型定义

#### menuMode

```typescript
export type menuMode = 'vertical' | 'horizontal';
```
