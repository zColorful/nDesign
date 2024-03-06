# Cascader 级联菜单

下拉级联菜单。

#### 何时使用

1. 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
2. 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

### 基本用法

:::demo

```vue
<template>
  <div class="mb-0">hover mode</div>
  <n-cascader class="mb-2" :options="options" v-model="value" placeholder="请选择" style="width: 200px" @change="onchange"></n-cascader>
  <div class="mb-0">不同size</div>
  <n-cascader
    class="mb-2"
    :options="options"
    v-model="value"
    placeholder="请选择"
    size="sm"
    style="width: 200px"
    @change="onchange"
  ></n-cascader>
  <n-cascader
    class="mb-2"
    :options="options"
    v-model="value"
    placeholder="请选择"
    size="lg"
    style="width: 200px"
    @change="onchange"
  ></n-cascader>
  <div class="mb-0">click mode</div>
  <n-cascader
    class="mb-2"
    :options="options"
    v-model="value"
    showPath
    trigger="click"
    placeholder="请选择"
    style="width: 200px"
    @change="onchange"
  ></n-cascader>
  <div class="mb-0">data empty</div>
  <n-cascader class="mb-2" :options="[]" trigger="click" placeholder="请选择" style="width: 200px" @change="onchange"></n-cascader>
  <div class="mb-0">multiple</div>
  <n-cascader
    class="mb-2"
    multiple
    v-model="mulValue"
    :options="options"
    trigger="click"
    placeholder="请选择"
    style="width: 200px"
    @change="onchange"
  ></n-cascader>
  <div class="mb-0">disabled</div>
  <n-cascader class="mb-2" :options="[]" disabled trigger="click" placeholder="请选择" style="width: 200px" @change="onchange"></n-cascader>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    const value = ref('haidian');
    const mulValue = ref(['huangpu', 'haidian']);
    const onchange = (v) => {
      console.log(v);
    };

    return { options, value, onchange, mulValue };
  },
});
</script>
```

:::

### 自定义宿主元素

:::demo 可通过`host`插槽自定义展开`Cascader`菜单的宿主元素。

```vue
<template>
  <n-cascader class="mb-2" v-model="value" :options="options" :dropdownWidth="200" width="fit-content">
    <template #host>
      <n-button>请选择</n-button>
    </template>
  </n-cascader>
  <div>选择的value值：{{ value }}</div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    const value = ref('haidian');

    return { value, options };
  },
});
</script>
```

:::

### 可搜索

:::demo

```vue
<template>
  <n-cascader
    :options="options"
    v-model="value1"
    placeholder="请选择"
    trigger="click"
    :width="300"
    filterable
    :debounce="500"
    :formatLabel="formatLabel"
    :filterOption="filterOption"
    @change="changeFun"
    class="mb-2"
  ></n-cascader>
  <div>选择的value值：{{ value1 }}</div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    const value1 = ref('haidian');
    const filterOption = (val, option) => {
      return option.path.find(({ label }) => label?.toLowerCase()?.includes(val.toLowerCase()));
    };
    const formatLabel = (options) => {
      return options.map(({ label }) => label).join('>');
    };
    const changeFun = (value) => {
      console.log(value);
    };
    return {
      options,
      value1,
      filterOption,
      formatLabel,
      changeFun,
    };
  },
});
</script>
```

:::

### 路径模式

:::demo

```vue
<template>
  <n-cascader
    :options="options"
    v-model="value1"
    placeholder="请选择"
    trigger="click"
    :width="300"
    path-mode
    @change="changeFun"
    class="mb-2"
  ></n-cascader>
  <div>选择的value值：{{ value1 }}</div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    const value1 = ref(['beijing', 'chaoyang', 'datunli']);
    const changeFun = (value) => {
      console.log(value);
    };
    return {
      options,
      value1,
      changeFun,
    };
  },
});
</script>
```

:::

### API

| 参数                  | 类型                                                                  | 默认    | 说明                                                           | 跳转 Demo             |
| :-------------------- | :-------------------------------------------------------------------- | :------ | :------------------------------------------------------------- | --------------------- |
| v-model               | `number\|string\|(number\|string)[]`                                  | []      | 可选                                                           | [基本用法](#基本用法) |
| trigger               | `'hover'\|'click'`                                                    | 'hover' | 可选，指定展开次级菜单的方式                                   | [基本用法](#基本用法) |
| options               | [`CascaderOption[]`](#CascaderOption)                                 | []      | 必选，级联器的菜单信息                                         | [基本用法](#基本用法) |
| placeholder           | `string`                                                              | ''      | 可选，没有选择时的输入框展示信息                               | [基本用法](#基本用法) |
| disabled              | `boolean`                                                             | false   | 可选，级联器是否禁用                                           | [基本用法](#基本用法) |
| width                 | `number \| string`                                                    | 200     | 可选，单位 px，用于控制组件输入框宽度和下拉的宽度              | [基本用法](#多选模式) |
| dropdownWidth         | `number \| string`                                                    | 200     | 可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等 | [基本用法](#多选模式) |
| clearable             | `boolean`                                                             | true    | 可选，是否支持清空选项                                         | [基本用法](#基本用法) |
| filterable            | `boolean`                                                             | true    | 可选，是否可搜索选项                                           | [可搜索](#可搜索)     |
| debounce              | `number`                                                              | 300     | 可选，搜索关键词输入去抖延迟                                   | [可搜索](#可搜索)     |
| filterOption          | `function(inputValue: string, option: CascaderOptionInfo) => boolean` | --      | 可选,过滤函数自定义搜索方法                                    | [可搜索](#可搜索)     |
| size                  | [CascaderSize](#cascadersize)                                         | 'md'    | 文本框的尺寸                                                   | --                    |
| searchOptionOnlyLabel | `boolean`                                                             | false   | 搜索下拉菜单中的选项是否仅展示标签                             | --                    |
| fieldNames            | [CascaderFieldNames](#CascaderFieldNames)                             |         | 自定义 `CascaderOption` 中的字段                               | --                    |
| valueKey              | `boolean`                                                             | 'value' | 用于确定选项键值的属性名                                       | --                    |
| pathMode              | `boolean`                                                             | false   | 绑定值是否为路径                                               | [路径模式](#路径模式  |

### Cascader 事件

| 事件   | 说明                   | 回调参数                  |
| :----- | :--------------------- | :------------------------ |
| change | 绑定值变化时触发的事件 | `Function(value)`         |
| blur   | 失去焦点时触发         | `Function(e: FocusEvent)` |
| focus  | 获取焦点时触发         | `Function(e: FocusEvent)` |

### Cascader 插槽

| 插槽名 | 说明                         |
| :----- | :--------------------------- |
| host   | 自定义展开级联菜单的宿主元素 |

### 接口 & 类型定义

#### CascaderFieldNames

```ts
interface CascaderFieldNames {
  value?: string;
  label?: string;
  render?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
}
```

#### CascaderOption

```ts
export interface CascaderOption {
  /**
   * @zh 选项值
   * @en Option value
   */
  value?: string | number | Record<string, any>;
  /**
   * @zh 选项文本
   * @en Option text
   */
  label?: string;
  /**
   * @zh 自定义渲染
   * @en Custom render
   */
  render?: RenderFunction;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 下一级选项
   * @en Next level options
   */
  children?: CascaderOption[];
  /**
   * @zh 是否是叶子节点
   * @en Whether it is a leaf node
   */
  isLeaf?: boolean;

  [other: string]: any;
}
```

#### CascaderSize

```ts
type CascaderSize = 'sm' | 'md' | 'lg';
```
