# Panel

Panels are usually used for grouping

### When to use

it is used when the page content needs to be grouped for display, and generally contains three parts: the head, the content area, and the bottom.

### Quick start

:::demo

```vue
<template>
  <n-panel type="primary" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with foldable</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel :toggle="toggle" :is-collapsed="true" :show-animation="true" :hasLeftPadding="false">
    <n-panel-header>
      Panel has no left padding
      <em :class="`icon icon-chevron-${toggleState ? 'down' : 'up'}`"></em>
    </n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel :is-collapsed="true" :beforeToggle="beforeToggle">
    <n-panel-header>Panel with header and footer</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
    <n-panel-footer>This is footer</n-panel-footer>
  </n-panel>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const toggleState = ref(true);
    const toggle = (e) => (toggleState.value = e);
    const beforeToggle = () => false;
    return {
      toggle,
      toggleState,
      beforeToggle,
    };
  },
});
</script>
```

:::

### Type

Panels have six types: default, primary, success, danger, warning, info.

:::demo

```vue
<template>
  <n-panel type="info" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with info Type</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel type="primary" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with Primary Type</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel type="success" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with Success Type</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel type="warning" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with Warning Type</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-panel type="danger" :is-collapsed="true" :show-animation="true">
    <n-panel-header>Panel with danger Type</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
</template>
```

:::

### Prevent Collapse

if you dont want panel to fold. You can use `beforeToggle` properties

If beforeToggle return False. The Panel will can not to fold. But Unaffected when unfolded

:::demo

```vue
<template>
  <n-panel type="primary" :has-left-padding="padding" @toggle="handleToggle" :before-toggle="beforeToggle" :show-animation="true">
    <n-panel-header>
      Panel with foldable
      <i :class="`icon-arrow-${toggle ? 'down' : 'up'}`"></i>
    </n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <span>当前状态: {{ nowState }}</span
  ><br />
  <n-button @click="panelToggle = !panelToggle">
    {{ panelToggle ? 'prevent collapse' : 'allow collapse' }}
  </n-button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let panelToggle = ref(true);
    let toggle = ref(true);
    let state;
    let padding = ref(false);
    let nowState = ref('show');
    const handleToggle = (e) => {
      toggle.value = e;
      nowState.value = toggle.value === true ? 'show' : 'hidden';
    };
    const beforeToggle = (e) => {
      return panelToggle.value;
    };
    return {
      state,
      toggle,
      panelToggle,
      beforeToggle,
      handleToggle,
      padding,
      nowState,
    };
  },
});
</script>
```

:::

Maybe in sometimes, we will use script to control panel collapse status. We can use `done` argument in beforeToggle to control panel collapse status

:::demo

```vue
<template>
  <n-panel type="primary" :before-toggle="beforeToggle" :is-collapsed="false">
    <n-panel-header> after one second will open </n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-button @click="handleClick"> Try </n-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let opened = false;
    let beforeToggle = (e, done) => {
      if (!opened) {
        setTimeout(() => {
          done();
        }, 1000);
        opened = true;
      }
    };
    const handleClick = () => {
      window.location.reload();
    };
    return {
      beforeToggle,
      handleClick,
    };
  },
});
</script>
```

:::

### Properties Dynamic Change

We take hasLeftPadding properties as an example.

Theoretically all properties can dynamic change. We only take hasLeftPadding properties as an example.

:::demo

```vue
<template>
  <n-panel :type="type" :hasLeftPadding="padding" is-collapsed>
    <n-panel-header>Panel with foldable</n-panel-header>
    <n-panel-body>This is body</n-panel-body>
  </n-panel>
  <br />
  <br />
  <n-button @click="padding = !padding">
    {{ padding ? 'hasLeftPadding' : 'notLeftPadding' }}
  </n-button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let padding = ref(false);
    return {
      padding,
    };
  },
});
</script>
```

:::

### API

|     Property     |                       Type                        | Descript  |                                                default Value                                                |
| :--------------: | :-----------------------------------------------: | :-------: | :---------------------------------------------------------------------------------------------------------: |
|       type       |                     PanelType                     | 'default' |                                       Optional. Can be set Panel Type                                       |
|    css-class     |                      string                       |    --     |                                      Optional. User-defined class name                                      |
|   is-collapsed   |                      boolean                      |   false   |                               Optional. Optional. Whether to expand the panel                               |
| has-left-padding |                      boolean                      |   true    |                                Optional. Whether to display the left padding                                |
|  show-animation  |                      boolean                      |   true    |                             Optional. Indicating whether to display animations.                             |
|  before-Toggle   | () => (value: boolean, done?: () => void ) => any |    --     | Optional, Panel before collapse status. `value` mean now status. `done()` can control panel collapse status |
|     @toggle      |                     Function                      |    --     |           Optional. Callback upon panel click to return the expanded status of the current panel.           |

### declare Interface & type

```javascript
export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
```
