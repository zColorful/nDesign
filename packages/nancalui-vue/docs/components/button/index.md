# Button 按钮

按钮用于开始一个即时操作。

#### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 形态

:::demo 通过`variant`设置按钮形态，目前支持`solid`、`outline`、`text`三种形态，默认为`outline`。

```vue
<template>
  <div class="demo-spacing">
    <n-button variant="solid">Solid Button</n-button>
    <n-button>Outline Button</n-button>
    <n-button variant="text">Text Button</n-button>
    <n-button variant="text" color="primary">Text Button</n-button>
  </div>
</template>
```

:::

### 主题色

:::demo 通过`color`设置按钮的主题色，目前支持`primary`、`secondary`、`danger`三种主题色，默认为`secondary`。<br>注意：如果`variant`设置成`solid`，则默认使用`primary`主题色。

```vue
<template>
  <div class="demo-spacing">
    <n-button variant="solid" color="secondary">Secondary</n-button>
    <n-button variant="solid" color="primary">Primary</n-button>
    <n-button variant="solid" color="success">Success</n-button>
    <n-button variant="solid" color="warning">Warning</n-button>
    <n-button variant="solid" color="danger">Danger</n-button>
  </div>

  <div class="demo-spacing">
    <n-button color="secondary">Secondary</n-button>
    <n-button color="primary">Primary</n-button>
    <n-button color="success">Success</n-button>
    <n-button color="warning">Warning</n-button>
    <n-button color="danger">Danger</n-button>
  </div>

  <div class="demo-spacing">
    <n-button variant="text" color="secondary">Secondary</n-button>
    <n-button variant="text" color="primary">Primary</n-button>
    <n-button variant="text" color="success">Success</n-button>
    <n-button variant="text" color="warning">Warning</n-button>
    <n-button variant="text" color="danger">Danger</n-button>
  </div>
</template>
```

:::

### 尺寸

:::demo 通过`size`设置按钮尺寸，支持`mini`、`sm`、`md`、`lg`三种类型的尺寸，默认为`md`。

```vue
<template>
  <div class="demo-spacing">
    <n-button size="mini">Mini</n-button>
    <n-button size="sm">Small</n-button>
    <n-button>Medium</n-button>
    <n-button size="lg">Large</n-button>
  </div>
</template>
```

:::

### 禁用状态

:::demo 通过`disabled`参数设置按钮禁用状态。

```vue
<template>
  <div class="demo-spacing">
    <n-button variant="solid">Solid Button</n-button>
    <n-button>Outline Button</n-button>
    <n-button variant="text">Text Button</n-button>
  </div>

  <div class="demo-spacing">
    <n-button variant="solid" disabled>Solid Button</n-button>
    <n-button disabled>Outline Button</n-button>
    <n-button variant="text" disabled>Text Button</n-button>
  </div>
</template>
```

:::

### 加载中状态

:::demo 通过`loading`参数设置按钮加载中状态。

```vue
<template>
  <n-button variant="solid" :loading="showLoading" @click="handleClick">Click Me</n-button>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const showLoading = ref(false);

    const handleClick = () => {
      showLoading.value = true;

      setTimeout(() => {
        showLoading.value = false;
      }, 2000);
    };

    return { showLoading, handleClick };
  },
};
</script>
```

:::

### 图标按钮

:::demo

```vue
<template>
  <div class="demo-spacing">
    <n-button icon="add" variant="solid">New</n-button>
    <n-button icon="add" variant="solid" disabled>Disabled New</n-button>
    <n-button icon="add" variant="solid"></n-button>
    <n-button icon="add" variant="solid" disabled></n-button>
    <n-button icon="filter">Filter</n-button>
    <n-button icon="filter" disabled>disabled Filter</n-button>
    <n-button icon="connect" variant="text" color="primary">Link</n-button>
    <n-button icon="delete" variant="text" title="Delete"></n-button>
    <n-button shape="round" title="Add">Add</n-button>
    <n-button icon="delete" shape="circle" title="Delete" size="sm"></n-button>
    <n-button icon="delete" shape="circle" title="Delete"></n-button>
    <n-button variant="solid" icon="filter" shape="circle" title="Add" size="lg"></n-button>
  </div>
</template>
```

:::

### 按钮组

将多个按钮作为一组放入按钮组容器中。按钮组可通过 size 设置尺寸，并与下拉菜单混合使用。

:::demo

```vue
<template>
  <n-button-group>
    <n-button variant="solid">按钮名称</n-button>
    <n-button icon="icon-select-arrow" variant="solid"></n-button>
  </n-button-group>

  <p>尺寸：sm</p>
  <n-button-group size="sm">
    <n-button color="primary" variant="solid">上海</n-button>
    <n-button>北京</n-button>
    <n-button>深圳</n-button>
  </n-button-group>

  <p>尺寸：默认</p>
  <n-button-group>
    <n-button color="primary">上海</n-button>
    <n-button>北京</n-button>
    <n-button>深圳</n-button>
  </n-button-group>

  <p>尺寸：lg</p>
  <n-button-group size="lg">
    <n-button color="primary">上海</n-button>
    <n-button>北京</n-button>
    <n-button>深圳</n-button>
  </n-button-group>

  <p>与dropdown下拉菜单一起使用</p>
  <n-button-group>
    <n-dropdown style="width: 100px;" :position="position" align="start">
      <n-button>Click Me 1</n-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </n-dropdown>
    <n-button icon="add" variant="solid">上海</n-button>
    <n-dropdown style="width: 100px;" :position="position" align="start">
      <n-button>Click Me 2</n-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </n-dropdown>
    <n-button icon="filter">北京</n-button>
    <n-dropdown style="width: 100px;" :position="position" align="start">
      <n-button>Click Me 3</n-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </n-dropdown>
  </n-button-group>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      position: ref(['bottom-start', 'top-start']),
    };
  },
});
</script>
```

:::

### Button 参数

| 参数名   | 类型                              | 默认        | 说明                      | 跳转 Demo                 |
| :------- | :-------------------------------- | :---------- | :------------------------ | :------------------------ |
| variant  | [IButtonVariant](#ibuttonvariant) | 'outline'   | 可选，按钮形态            | [形态](#形态)             |
| color    | [IButtonColor](#ibuttoncolor)     | 'secondary' | 可选，按钮主题            | [主题色](#主题色)         |
| size     | [IButtonSize](#ibuttonsize)       | 'md'        | 可选，按钮尺寸            | [尺寸](#尺寸)             |
| icon     | `string`                          | --          | 可选，自定义按钮图标      | [图标按钮](#图标按钮)     |
| shape    | [IButtonShape](#ibuttonshape)     | --          | 可选，按钮形状(圆形/圆角) | [图标按钮](#图标按钮)     |
| disabled | `boolean`                         | false       | 可选，是否禁用 button     | [禁用状态](#禁用状态)     |
| loading  | `boolean`                         | false       | 可选，设置加载中状态      | [加载中状态](#加载中状态) |

### Button 类型定义

#### IButtonVariant

```ts
type IButtonVariant = 'solid' | 'outline' | 'text';
```

#### IButtonSize

```ts
type IButtonSize = 'lg' | 'md' | 'sm';
```

#### IButtonColor

```ts
type IButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
```

#### IButtonShape

```ts
type IButtonShape = 'circle' | 'round';
```

### ButtonGroup 参数

| 参数名 | 类型                             | 默认 | 说明             | 跳转 Demo         |
| :----- | :------------------------------- | :--- | :--------------- | :---------------- |
| size   | [IButtonSize](#iButtonGroupSize) | 'md' | 可选，按钮组尺寸 | [按钮组](#按钮组) |

### ButtonGroup 类型定义

#### IButtonGroupSize

```ts
type IButtonGroupSize = 'lg' | 'md' | 'sm';
```
