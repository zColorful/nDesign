# TreeSelect 树形选择框

一种从列表中选择嵌套结构数据的组件。

### 基本用法

:::demo

```vue
<template>
  <n-button @click="clearSelect">手动清除</n-button>
  <n-tree-select
    v-model="value"
    :treeData="data"
    :prop="prop"
    filter
    placeholder="树形选择框"
    @valueChange="valueChange"
    size="sm"
  ></n-tree-select>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('1');
    const prop = ref({
      label: 'name',
      children: 'childArr',
    });

    const clearSelect = () => {
      value.value = '';
    };

    const data = ref([
      {
        name: '一级 1',
        value: '1',
        childArr: [
          {
            name: '二级 1-1',
            value: '1-1',
            disabled: true,
            childArr: [
              {
                name: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        name: '一级 2',
        value: '2',
        childArr: [
          {
            name: '二级 2-1',
            value: '2-1',
            childArr: [
              {
                name: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            name: '二级 2-2',
            value: '2-2',
            childArr: [
              {
                name: '三级 2-2-1',
                value: '2-2-1',
              },
            ],
          },
        ],
      },
      {
        name: '一级 3',
        value: '3',
        childArr: [
          {
            name: '二级 3-1',
            value: '3-1',
            childArr: [
              {
                name: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            name: '二级 3-2',
            value: '3-2',
            childArr: [
              {
                name: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);
    function valueChange(data) {
      console.log('data', data);
      console.log('value', value);
    }

    /*
      测试监听treeData改变，解决有value之后才有treeData的回显问题
    */
    onMounted(() => {
      setTimeout(function () {
        // data.value[0].name = '改变数据';
        // console.log(dataArr, 'dataArr');
      }, 5000);
    });
    return {
      data,
      value,
      prop,
      valueChange,
      clearSelect,
    };
  },
});
</script>
```

:::

### 禁用

:::demo

```vue
<template>
  <n-tree-select v-model="value" :treeData="data" :disabled="true"></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const data = ref([
      {
        label: '一级 1',
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        children: [
          {
            label: '二级 2-1',
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
              },
              {
                label: '三级 2-2-2',
                value: '2-2-2',
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);

    return {
      data,
      value,
    };
  },
});
</script>
```

:::

### 可清空

:::demo

```vue
<template>
  <n-tree-select v-model="value" :treeData="data" :allowClear="true"></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const data = ref([
      {
        label: '一级 1',
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        children: [
          {
            label: '二级 2-1',
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
              },
              {
                label: '三级 2-2-2',
                value: '2-2-2',
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);

    return {
      data,
      value,
    };
  },
});
</script>
```

:::

### 多选

:::demo

```vue
<template>
  <n-tree-select
    v-model="value"
    :treeData="data"
    :multiple="true"
    :allowClear="true"
    :enableLabelization="true"
    @valueChange="valueChange"
  ></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(['1', '2']);
    const data = ref([
      {
        label: '一级 1',
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        children: [
          {
            label: '二级 2-1',
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
              },
              {
                label: '三级 2-2-2',
                value: '2-2-2',
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);
    function valueChange(data) {
      console.log('data', data);
      console.log('value', value);
    }
    return {
      data,
      value,
      valueChange,
    };
  },
});
</script>
```

:::

### 可筛选

:::demo

```vue
<template>
  <n-tree-select
    v-model="value"
    :treeData="data"
    filter
    :multiple="true"
    :allowClear="true"
    :enableLabelization="true"
    @valueChange="valueChange"
  ></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref([]);
    const data = ref([
      {
        label: '一级 1',
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        children: [
          {
            label: '二级 2-1',
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
              },
              {
                label: '三级 2-2-2',
                value: '2-2-2',
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);
    function valueChange(data) {
      console.log('data', data);
      console.log('value', value);
    }
    return {
      data,
      value,
      valueChange,
    };
  },
});
</script>
```

:::

### 仅叶子节点可选

:::demo

```vue
<template>
  <n-tree-select v-model="value" :treeData="data" :leafOnly="true"></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const data = ref([
      {
        label: '一级 1',
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        children: [
          {
            label: '二级 2-1',
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
              },
              {
                label: '三级 2-2-2',
                value: '2-2-2',
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
              },
            ],
          },
        ],
      },
    ]);

    return {
      data,
      value,
    };
  },
});
</script>
```

:::

### 自定义图标

使用 useGrayArrow 可以直接使用灰色箭头。

:::demo

```vue
<template>
  <n-tree-select v-model="node.value" :treeData="data" style="margin-bottom: 20px">
    <template #icon="{ nodeData, toggleNode }">
      <span
        @click="
          (event) => {
            event.stopPropagation();
            toggleNode(nodeData);
          }
        "
      >
        <svg
          :style="{ transform: nodeData.expanded ? 'rotate(90deg)' : '', marginLeft: '-2.5px', marginRight: '14.5px', cursor: 'pointer' }"
          viewBox="0 0 1024 1024"
          width="12"
          height="12"
        >
          <path d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z" fill="#8a8e99"></path>
        </svg>
      </span>
    </template>
    <template #default="{ item }">
      <span class="tree-select-demo-icon" :class="[item?.data?.type]">{{ item.label }}</span>
    </template>
  </n-tree-select>
  <n-tree-select v-model="node.value" useGrayArrow :treeData="data" />
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const node = reactive({ value: '' });
    const data = ref([
      {
        label: '一级 1',
        data: { type: 'ppt' },
        value: '1',
        children: [
          {
            label: '二级 1-1',
            value: '1-1',
            data: { type: 'doc' },
            children: [
              {
                label: '三级 1-1-1',
                data: { type: 'ppt' },
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        value: '2',
        data: { type: 'doc' },
        children: [
          {
            label: '二级 2-1',
            data: { type: 'ppt' },
            value: '2-1',
            children: [
              {
                label: '三级 2-1-1',
                value: '2-1-1',
                data: { type: 'xls' },
              },
            ],
          },
          {
            label: '二级 2-2',
            value: '2-2',
            data: { type: 'pdf' },
            children: [
              {
                label: '三级 2-2-1',
                value: '2-2-1',
                data: { type: 'xls' },
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        value: '3',
        data: { type: 'pdf' },
        children: [
          {
            label: '二级 3-1',
            value: '3-1',
            data: { type: 'mix' },
            children: [
              {
                label: '三级 3-1-1',
                value: '3-1-1',
                data: { type: 'doc' },
              },
            ],
          },
          {
            label: '二级 3-2',
            value: '3-2',
            data: { type: 'doc' },
            children: [
              {
                label: '三级 3-2-1',
                value: '3-2-1',
                data: { type: 'xls' },
              },
            ],
          },
        ],
      },
    ]);

    return {
      data,
      node,
    };
  },
});
</script>
<style>
.tree-select-demo-icon::before {
  width: 16px;
  height: 16px;
  font-style: italic;
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  text-align: center;
  color: #fff;
  border-radius: 2px;
}

.tree-select-demo-icon.doc::before {
  content: 'W';
  background-color: #295396;
  border: 1px #224488 solid;
}

.tree-select-demo-icon.pdf::before {
  content: 'A';
  background-color: #da0a0a;
  border: 1px #dd0000 solid;
}

.tree-select-demo-icon.xls::before {
  content: 'X';
  background-color: #207044;
  border: 1px #18683c solid;
}

.tree-select-demo-icon.ppt::before {
  content: 'P';
  background-color: #d14424;
  border: 1px #dd4422 solid;
}

.tree-select-demo-icon.mix::before {
  content: '?';
  font-style: normal;
  background-color: #aaaaaa;
  border: 1px #999999 solid;
}
.tree-select-demo-icon-next {
  margin-left: 8px;
}
</style>
```

:::

### 标签化

:::demo

```vue
<template>
  <n-tree-select v-model="value" :treeData="data" :prop="treeProps" :multiple="true" enableLabelization></n-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref([213, 341, 311]);
    const treeProps = ref({
      label: 'name',
      children: 'children',
      value: 'id',
    });
    const data = ref([
      {
        id: 213,
        standardModelId: 324,
        code: 'DEPT0000000101',
        name: '测试部门1',
        remark: null,
        createTime: '2022-12-29 13:37:39',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: '9b9086a1-ce55-4b26-9173-499415854ac1',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [
          {
            id: 341,
            standardModelId: 999999999,
            code: null,
            name: '3453',
            remark: null,
            createTime: '2023-04-26 17:13:31',
            createBy: null,
            updateTime: null,
            updateBy: null,
            deleted: null,
            frontId: '4766ef76-18a2-4957-b8b3-bd3cff933940',
            quoteObjectId: null,
            customProperties: null,
            parentFrontId: '9b9086a1-ce55-4b26-9173-499415854ac1',
            createByName: 'admin',
            children: [],
          },
        ],
      },
      {
        id: 311,
        standardModelId: 999999999,
        code: null,
        name: '部门111aaa',
        remark: null,
        createTime: '2023-02-01 16:55:56',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: '61bceb1d-1eb6-41ec-ab2d-8754a67379ba',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [],
      },
      {
        id: 307,
        standardModelId: 999999999,
        code: null,
        name: '部门222',
        remark: null,
        createTime: '2023-02-01 16:50:02',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: '7594c5fe-5f4e-4692-a11f-9b97743fac34',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [],
      },
      {
        id: 221,
        standardModelId: 401,
        code: 'DEPT0000000111',
        name: 'b1',
        remark: null,
        createTime: '2023-01-05 14:40:53',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: '7afdff47-b043-4d1b-96ef-182c9fb8d79e',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [],
      },
      {
        id: 309,
        standardModelId: 999999999,
        code: null,
        name: '部门220aaa',
        remark: null,
        createTime: '2023-02-01 16:51:52',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: 'ab83b814-8e87-4a9f-aa37-8c089017cade',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [],
      },
      {
        id: 306,
        standardModelId: 999999999,
        code: null,
        name: '部门444',
        remark: null,
        createTime: '2023-02-01 15:29:25',
        createBy: null,
        updateTime: null,
        updateBy: null,
        deleted: null,
        frontId: '75178c3f-b2aa-48c2-820e-d31d3f7c3282',
        quoteObjectId: null,
        customProperties: null,
        parentFrontId: null,
        createByName: 'admin',
        children: [],
      },
    ]);

    return {
      data,
      value,
      treeProps,
    };
  },
});
</script>
```

:::

### TreeSelect 参数

| 参数               | 类型                  | 默认     | 说明                                 | 跳转                              |
| ------------------ | --------------------- | -------- | ------------------------------------ | --------------------------------- |
| v-model            | String, Number, Array |          | 必选                                 | [基本用法](#基本用法)             |
| treeData           | TreeData              |          | 必选，树形选择框的内容               | [基本用法](#基本用法)             |
| prop               | TreeProps             |          | 可选，配置内容如下                   | [基本用法](#基本用法)             |
| placeholder        | string                | '请选择' | 可选，修改输入框的默认显示内容       | [基本用法](#基本用法)             |
| disabled           | boolean               | false    | 可选，值为 true 时禁止用户使用       | [禁用](#禁用)                     |
| allowClear         | boolean               | false    | 可选，值为 true 时可以清空输入框内容 | [可清空](#可清空)                 |
| multiple           | boolean               | false    | 可选，值为 true 时可选择多个项       | [多选](#多选)                     |
| filter             | boolean               | false    | 可选，值为 true 时可筛选             | [筛选](#可筛选)                   |
| useGrayArrow       | boolean               | false    | 可选，值为 true 时可筛选             | [自定义图标](#自定义图标)         |
| leafOnly           | boolean               | false    | 可选，值为 true 时仅可选择叶子节点   | [仅叶子节点可选](#仅叶子节点可选) |
| enableLabelization | boolean               | false    | 可选，值为 true 时仅可选择叶子节点   | [标签化](#标签化)                 |

### TreeSelect 事件

| 事件名      | 说明                     | 参数                                                     | 跳转                  |
| ----------- | ------------------------ | -------------------------------------------------------- | --------------------- |
| valueChange | 当选中的值发生变化时触发 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 | [基本用法](#基本用法) |

### 接口 & 类型定义

```ts
interface TreeItem {
  id: number | string;
  label: string;
  parent?: TreeItem;
  children?: Array<TreeItem>;
  level?: number;
  loading?: boolean;
  expanded?: boolean;
  checked?: boolean;
  halfchecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;
}

type TreeData = Array<TreeItem>;
```

```ts
interface TreeProps {
  label?: string;
  value?: any;
  disabled?: string | Function;
  class?: string | Function;
  children?: string;
}

type prop = Object<TreeProps>;
```
