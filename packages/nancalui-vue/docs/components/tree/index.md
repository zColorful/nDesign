# Tree 树

一种呈现嵌套结构的组件。

#### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树组件可以完整展现其中的层级关系，并具有展开/收起、选择等交互功能。

### 基本用法

:::demo 展示嵌套树形结构的呈现、连接线、展开/收起、点击选择等功能。动画效果依赖树节点的高度，默认高度为`30px`，自定义树节点时，为了保证动画效果正常显示，建议显式设置树节点高度。

```vue
<template>
  <n-tree :data="data"></n-tree>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [{ label: 'Leaf node 1-1-1' }],
          },
          { label: 'Leaf node 1-2' },
        ],
      },
      { label: 'Leaf node 2' },
    ]);

    return {
      data,
    };
  },
});
</script>
```

:::

### 节点懒加载

:::demo 通过设置该节点 `isLeaf` 参数为 `false`, 组件回调 `lazyLoad` 方法实现节点懒加载。

```vue
<template>
  <n-tree :data="data" @lazy-load="lazyLoad"></n-tree>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1 - dynamic loading',
            isLeaf: false,
          },
          { label: 'Leaf node 1-2' },
        ],
      },
      { label: 'Leaf node 2 - dynamic loading', isLeaf: false },
    ]);

    const lazyLoad = (node, callback) => {
      setTimeout(() => {
        const data = [
          {
            label: 'child node 1',
            expanded: true,
            children: [
              {
                label: 'child node 1-1',
              },
              {
                label: 'child node 1-2',
              },
            ],
          },
          {
            label: 'child node 2',
            children: [
              {
                label: 'child node 2-1',
              },
            ],
          },
        ];
        callback({
          treeItems: data,
          node,
        });
      }, 500);
    };

    return {
      data,
      lazyLoad,
    };
  },
});
</script>
```

:::

### 可勾选

:::demo 通过`check`开启勾选功能。

```vue
<template>
  <div class="flex flex-row" style="height: 28px;">
    <label class="flex items-center mr-xl"><span class="inline-block mr-xs">开启勾选</span><n-switch v-model="openCheck"></n-switch></label>
    <n-radio-group v-if="openCheck" v-model="currentStrategy" direction="row">
      <n-radio v-for="strategy of checkStrategy" :key="strategy" :value="strategy">{{ strategy }}</n-radio>
    </n-radio-group>
  </div>
  <n-tree
    :data="data"
    :check="currentStrategy"
    @toggle-change="toggleChange"
    @check-change="checkChange"
    @select-change="selectChange"
    @node-click="nodeClick"
  ></n-tree>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const openCheck = ref(true);
    const checkStrategy = ref(['both', 'downward', 'upward', 'none']);
    const currentStrategy = ref('both');

    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [{ label: 'Leaf node 1-1-1' }, { label: 'Leaf node 1-1-2' }],
          },
          { label: 'Leaf node 1-2' },
        ],
      },
      { label: 'Leaf node 2' },
    ]);

    watch(openCheck, (newVal) => {
      if (newVal === false) {
        currentStrategy.value = false;
      } else {
        currentStrategy.value = 'both';

        data.value = [
          {
            label: 'Parent node 1',
            children: [
              {
                label: 'Parent node 1-1',
                children: [{ label: 'Leaf node 1-1-1' }, { label: 'Leaf node 1-1-2' }],
              },
              { label: 'Leaf node 1-2' },
            ],
          },
          { label: 'Leaf node 2' },
        ];
      }
    });

    const toggleChange = (node) => {
      console.log('toggleChange node:', node);
    };

    const checkChange = (node) => {
      console.log('checkChange node:', node);
    };

    const selectChange = (node) => {
      console.log('selectChange node:', node);
    };

    const nodeClick = (node) => {
      console.log('nodeClick node:', node);
    };

    return {
      data,
      openCheck,
      checkStrategy,
      currentStrategy,
      toggleChange,
      checkChange,
      selectChange,
      nodeClick,
    };
  },
});
</script>
```

:::

### 默认状态

:::demo 通过`expanded`/`selected`/`checked`分别设置默认展开/收起、点击选择、勾选状态。

```vue
<template>
  <n-tree :data="data" check></n-tree>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        expanded: true,
        children: [
          {
            label: 'Parent node 1-1',
            children: [{ label: 'Leaf node 1-1-1' }],
          },
          {
            label: 'Leaf node 1-2',
            checked: true,
          },
        ],
      },
      {
        label: 'Leaf node 2',
        selected: true,
      },
    ]);

    return {
      data,
    };
  },
});
</script>
```

:::

### 禁用状态

:::demo 通过`disableToggle`/`disableSelect`/`disableCheck`分别禁用展开/收起、点击选择、勾选状态。

```vue
<template>
  <n-tree :data="data" check></n-tree>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        expanded: true,
        children: [
          {
            label: 'Parent node 1-1',
            disableToggle: true,
            disableSelect: true,
            disableCheck: true,
            children: [{ label: 'Leaf node 1-1-1' }],
          },
          {
            label: 'Leaf node 1-2',
            disableCheck: true,
          },
        ],
      },
      {
        label: 'Leaf node 2',
        disableSelect: true,
      },
    ]);

    return {
      data,
    };
  },
});
</script>
```

:::

### 自定义图标

:::demo 通过`content`插槽可以自定义节点内容，比如在节点内容前面增加一个图标；通过`icon`插槽可以自定义展开/收起的图标。

```vue
<template>
  <n-tree :data="data">
    <template #content="{ nodeData }">
      <svg style="margin-right: 8px" viewBox="0 0 16 16" width="16" height="16">
        <path
          :d="`${
            nodeData.isLeaf
              ? 'M13,6 L9,6 L9,5 L9,2 L3,2 L3,14 L13,14 L13,6 Z M12.5857864,5 L10,2.41421356 L10,5 L12.5857864,5 Z M2,1 L10,1 L14,5 L14,15 L2,15 L2,1 Z'
              : nodeData.expanded
              ? 'M16,6 L14,14 L2,14 L0,6 L16,6 Z M14.7192236,7 L1.28077641,7 L2.78077641,13 L13.2192236,13 L14.7192236,7 Z M6,1 L8,3 L15,3 L15,5 L14,5 L14,4 L7.58578644,4 L5.58578644,2 L2,2 L2,5 L1,5 L1,1 L6,1 Z'
              : 'M14,6 L14,5 L7.58578644,5 L5.58578644,3 L2,3 L2,6 L14,6 Z M14,7 L2,7 L2,13 L14,13 L14,7 Z M1,2 L6,2 L8,4 L15,4 L15,14 L1,14 L1,2 Z'
          }`"
          stroke-width="1"
          fill="#8a8e99"
        ></path>
      </svg>
      {{ nodeData.label }}
    </template>
    <template #icon="{ nodeData, toggleNode }">
      <span v-if="nodeData.isLeaf" class="nancalui-tree-node__indent"></span>
      <span
        v-else
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
  </n-tree>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [{ label: 'Leaf node 1-1-1' }],
          },
          { label: 'Leaf node 1-2' },
        ],
      },
      { label: 'Leaf node 2' },
    ]);

    return {
      data,
    };
  },
});
</script>
```

:::

### 节点合并

:::demo

```vue
<template>
  <n-tree :data="data" ref="treeRef"></n-tree>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref(null);
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              {
                label: 'Parent node 1-1-1',
                children: [
                  {
                    label: 'Parent node 1-1-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Parent node 2',
        children: [
          {
            label: 'Parent node 2-1',
            children: [
              {
                label: 'Leaf node 2-1-1',
              },
              {
                label: 'Leaf node 2-1-2',
              },
            ],
          },
        ],
      },
      {
        label: 'Parent node 3',
        children: [
          {
            label: 'Leaf node 3-1',
            children: [
              {
                label: 'Leaf node 3-1-1',
                children: [
                  {
                    label: 'Leaf node 3-1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Leaf node 3-2',
          },
        ],
      },
    ]);

    onMounted(() => {
      treeRef.value.treeFactory.mergeTreeNodes();
      treeRef.value.treeFactory.expandAllNodes();
    });

    return {
      data,
      treeRef,
    };
  },
});
</script>
```

:::

### 操作按钮

:::demo 可定义外部操作按钮、悬浮按钮。

```vue
<template>
  <n-tree :data="data" ref="treeRef" operate @select-change="selectChange"></n-tree>
  <n-button variant="solid" size="sm" @click="addNode">Add</n-button>
  <n-button size="sm" class="ml-xs" @click="deleteNode">Delete</n-button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref();
    const selectedNode = ref();
    const data = ref([
      {
        label: 'Parent node 1',
        id: 'node-1',
        children: [
          {
            label: 'Leaf node 1-1',
            id: 'node-1-1',
            children: [{ label: 'Leaf node 1-1-1', id: 'node-1-1-1' }],
          },
          { label: 'Leaf node 1-2', id: 'node-1-2' },
        ],
      },
      { label: 'Parent node 2', id: 'node-2' },
    ]);

    const addNode = () => {
      if (!selectedNode.value) {
        return;
      }
      const childs = treeRef.value.treeFactory.getChildren(selectedNode.value);
      let labelName = 'new node';
      if (!childs || childs.length === 0) {
        labelName = selectedNode.value.label + '-1';
      } else if (childs.length > 0) {
        labelName = selectedNode.value.label + `-${childs.length + 1}`;
      }
      if (labelName.startsWith('Parent')) {
        labelName = labelName.replace('Parent', 'Leaf');
      }
      treeRef.value.treeFactory.insertBefore(selectedNode.value, { label: labelName });
    };

    const deleteNode = () => {
      if (!selectedNode.value) {
        return;
      }
      treeRef.value.treeFactory.removeNode(selectedNode.value);
    };

    const selectChange = (selected) => {
      selectedNode.value = selected;
    };

    return {
      treeRef,
      data,
      addNode,
      deleteNode,
      selectChange,
    };
  },
});
</script>
```

:::

### 搜索过滤

:::demo 通过 `treeFactory` 中的`searchTree`方法可以搜索节点或者过滤节点。

```vue
<template>
  <n-search class="mb10" style="width: 300px" is-keyup-search placeholder="search your node..." :delay="1000" @search="onSearch"></n-search>
  <n-search
    class="mb10"
    style="width: 300px"
    is-keyup-search
    placeholder="filter your node..."
    :delay="1000"
    @search="onSearch1"
  ></n-search>
  <n-row class="mb10" align="middle">
    <n-search
      style="width: 300px"
      is-keyup-search
      placeholder="filter your node by custom key..."
      :delay="1000"
      @search="onSearch2"
    ></n-search>
    <span class="ml8">
      <n-tooltip position="top" content="使用自定义的属性搜索匹配树节点">
        <n-icon name="help" />
      </n-tooltip>
    </span>
  </n-row>
  <n-row class="mb10" align="middle">
    <n-search style="width: 300px" is-keyup-search placeholder="filter your node by Regex..." :delay="1000" @search="onSearch3"></n-search>
    <span class="ml8">
      <n-tooltip position="top" content="使用正则表达式限定搜索范围">
        <n-icon name="help" />
      </n-tooltip>
    </span>
  </n-row>
  <n-tree ref="treeRef" :data="data"></n-tree>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref();
    const data = ref([
      {
        label: 'parent node 1',
        customSearchValue: 'a',
      },
      {
        label: 'parent node 2',
        customSearchValue: 'b',
        children: [
          {
            label: 'child node 2-1',
            customSearchValue: 'c',
            children: [
              {
                disableSelect: true,
                label: 'child node 2-1-1',
                customSearchValue: 'd',
              },
              {
                label: 'child node 2-1-2',
                customSearchValue: 'e',
              },
            ],
          },
          {
            label: 'child node 2-2',
            customSearchValue: 'f',
            children: [
              {
                label: 'child node 2-2-1',
                customSearchValue: 'g',
              },
              {
                label: 'child node 2-2-2',
                customSearchValue: 'h',
              },
            ],
          },
        ],
      },
      {
        label: 'parent node 3',
        customSearchValue: 'i',
        children: [
          {
            label: 'child node 3-1',
            customSearchValue: 'j',
          },
          {
            label: 'child node 3-2',
            customSearchValue: 'k',
          },
        ],
      },
      {
        label: 'parent node 4',
        customSearchValue: 'l',
        children: [
          {
            label: 'child node 4-1',
            customSearchValue: 'm',
          },
          {
            label: 'child node 4-2',
            customSearchValue: 'n',
          },
        ],
      },
      {
        label: 'parent node 5',
        customSearchValue: 'o',
        children: [
          {
            label: 'child node 5-1',
            customSearchValue: 'p',
          },
          {
            label: 'child node 5-2',
            customSearchValue: 'q',
          },
        ],
      },
    ]);
    const onSearch = (value) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: false });
    };
    const onSearch1 = (value) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: true });
    };
    const onSearch2 = (value) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: true, matchKey: 'customSearchValue' });
    };
    const onSearch3 = (value) => {
      const regex = new RegExp('^' + value + '[\s\S]*');
      treeRef.value.treeFactory.searchTree(value, { isFilter: true, pattern: regex });
    };

    return {
      treeRef,
      data,
      onSearch,
      onSearch1,
      onSearch2,
      onSearch3,
    };
  },
});
</script>
<style>
.mb10 {
  margin-bottom: 10px;
}
.ml8 {
  margin-left: 8px;
}
</style>
```

:::

### 虚拟滚动

:::demo 使用虚拟滚动处理大数据量的加载问题。

```vue
<template>
  <n-search class="mb10" style="width: 300px" is-keyup-search placeholder="search your node..." :delay="1000" @search="onSearch"></n-search>
  <n-search
    class="mb10"
    style="width: 300px"
    is-keyup-search
    placeholder="filter your node..."
    :delay="1000"
    @search="onSearch1"
  ></n-search>
  <n-tree :data="data" :height="300" ref="treeRef"></n-tree>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref(null);
    const data = ref([
      ...Array.from({ length: 100 }).map((_, index) => ({
        label: 'Parent node ' + index,
        children:
          index % 2 === 0
            ? Array.from({ length: 10 }).map((_, index2) => ({
                label: 'Leaf node ' + index + '-' + index2,
              }))
            : undefined,
      })),
    ]);

    onMounted(() => {
      treeRef.value.treeFactory.expandAllNodes();
    });

    const onSearch = (value) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: false });
    };
    const onSearch1 = (value) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: true });
    };

    return {
      data,
      treeRef,
      onSearch,
      onSearch1,
    };
  },
});
</script>
```

:::

### 可拖拽树

:::demo 通过 OperableTree 的 dragdrop 属性配置节点的拖拽功能，并支持外部元素拖拽入树。

```vue
<template>
  <div class="mb-0">Default</div>
  <n-tree class="mb-2" :data="data" dragdrop></n-tree>
  <div class="mb-0">Sortable</div>
  <n-tree
    ref="treeRef"
    class="mb-2"
    :data="data"
    :prop="treeProp"
    :dragdrop="{ dropPrev: true, dropNext: true, dropInner: true }"
    :canDragNode="canDragNode"
    :canDropNode="canDropNode"
    @drag-end="finishDrag"
  >
  </n-tree>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref(null);
    const treeProp = ref({
      id: 'appSystemId',
      label: 'name',
      children: 'children',
    });

    const data = ref([
      { appSystemId: 61, name: '111111', physicsModId: null, physicsModName: null, sort: 1, disableSelect: true },
      { appSystemId: 1, name: '企业模型管理系统', physicsModId: null, physicsModName: null, sort: 1 },
      { appSystemId: 2, name: '财务', physicsModId: null, physicsModName: null, sort: 2 },
      { appSystemId: 7, name: '财务管理系统', physicsModId: null, physicsModName: null, sort: 3 },
      { appSystemId: 4, name: '测试', physicsModId: null, physicsModName: null, sort: 4 },
      { appSystemId: 3, name: '23333333', physicsModId: 2024, physicsModName: null, sort: 5 },
    ]);
    function canDragNode(nodeData) {
      // if (nodeData.type === 0 || nodeData.type === 8) return false;
      return true;
    }
    function canDropNode(dragData, dropData, type) {
      if (type === 'dropInner') {
        // 同类型的模型可以拖拽到内部
        if (dropData.type === 2 || dropData.type === 3) {
          if (
            (dragData.kind === 4 || dragData.kind === 0 || dropData.kind === 6 || dropData.kind === 5) &&
            dragData.kind === dropData.kind
          ) {
            return true;
          }
          return false;
        }
        return true;
      } else if (type === 'dropNext' || type === 'dropPrev') {
        if (
          dropData.kind === 6 || // 流程图
          dropData.type === 2 || //流程文件
          dropData.kind === 4 || // 业务对象
          dropData.kind === 5 // uc矩阵
        ) {
          let parentData = treeRef.value.treeFactory.getParent(dropData);
          // 防止不同类型的数据放入同类型子集中的上部或下部
          if (dragData.kind !== parentData.kind) {
            // 拖拽落入模型的父级是目录的除外
            if ([0, 1].includes(parentData.type)) {
              return true;
            }
            return false;
          }
          return false;
        }
        if (dropData.type === 0) {
          return false;
        }
        return true;
      }
    }
    function finishDrag(params) {
      console.log(params, 'kskskkskskskskksksksksksks');
    }
    return {
      treeRef,
      data,
      treeProp,
      canDragNode,
      canDropNode,
      finishDrag,
    };
  },
});
</script>
```

:::

### Tree 参数

| 参数名      | 类型                              | 默认值                                             | 说明                                                                                                                                        | 跳转 Demo             |
| :---------- | :-------------------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------- |
| data        | [ITreeNode\[\]](#itreenode)       | `[]`                                               | 可选，树形结构数据                                                                                                                          | [基本用法](#基本用法) |
| check       | [ICheck](#icheck)                 | `false`                                            | 可选，是否启用勾选功能                                                                                                                      | [可勾选](#可勾选)     |
| prop        | {}                                | `{ id: 'id',label: 'label',children: 'children',}` | 必选                                                                                                                                        | [可勾选](#可勾选)     |
| dragdrop    | [IDragdrop](#idragdrop)           | `false`                                            | 可选，是否启用可拖拽功能                                                                                                                    | [可拖拽树](#可拖拽树) |
| canDragNode | Function(dragData)                | --                                                 | 可选，哪些节点可拖拽，一个参数 dragData，为拖拽节点的数据                                                                                   | [可拖拽树](#可拖拽树) |
| canDropNode | Function(dragData,dropData, type) | --                                                 | 可选，哪些节点允许拖入，三个参数，dragData 为拖拽节点的数据，dropData 为拖入节点的数据，type 为拖拽的类型 （dropPrev，dropNext，dropInner） | [可拖拽树](#可拖拽树) |

### Tree 事件

| 事件名        | 回调参数                   | 说明                                         | 跳转 Demo                 |
| :------------ | :------------------------- | :------------------------------------------- | :------------------------ |
| toggle-change | `Function(node)`           | 节点展开/收起的回调事件，返回选中的节点对象  | [可勾选](#可勾选)         |
| check-change  | `Function(node)`           | 节点勾选的回调事件，返回选中的节点对象       | [可勾选](#可勾选)         |
| select-change | `Function(node)`           | 节点选中的回调事件，返回选中的节点对象       | [可勾选](#可勾选)         |
| node-click    | `Function(node)`           | 节点点击事件，返回点击的节点对象             | [可勾选](#可勾选)         |
| lazy-node     | `Function(node, callback)` | 节点懒加载事件，返回点击的节点对象及回调函数 | [节点懒加载](#节点懒加载) |

### Tree 插槽

| 插槽名  | 说明                                |
| :------ | :---------------------------------- |
| default | 自定义节点                          |
| content | 自定义节点内容                      |
| icon    | 自定义展开/收起按钮                 |
| loading | 自定义节点懒加载时 loading 显示内容 |

### TreeNode 参数

| 参数名   | 类型                    | 默认值  | 说明                     |
| :------- | :---------------------- | :------ | :----------------------- |
| data     | [ITreeNode](#itreenode) | `[]`    | 可选，节点数据           |
| check    | [ICheck](#icheck)       | `false` | 可选，是否启用勾选功能   |
| dragdrop | [IDragdrop](#idragdrop) | `false` | 可选，是否启用可拖拽功能 |
| height   | `number`                | `-`     | 可选，设置启用虚拟滚动   |

### Tree 类型定义

#### ITreeNode

```ts
interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean;
  checked?: boolean;
  expanded?: boolean;

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
}
```

#### ICheck

```ts
type ICheck = boolean | 'upward' | 'downward' | 'both' | 'none';
```

#### IDragdrop

```ts
type IDragdrop =
  | boolean
  | {
      dropPrev?: boolean;
      dropNext?: boolean;
      dropInner?: boolean;
    };
```

### treeFactory

`treeFactory`是组件内部暴露出来的一些数据和方法，当自定义树结构的时候会用到。

```ts
type TreeFactory = {
  // 扁平化处理后的数据，IInnerTreeNode 见下表
  treeData: Ref<IInnerTreeNode[]>;

  // 获取节点层级
  getLevel: (node: IInnerTreeNode) => number;

  // 获取某个节点的子节点
  getChildren: (
    node: IInnerTreeNode,
    config?: {
      expanded?: boolean; // 是否只从展开了的节点中获取数据
      recursive?: boolean; // 是否需要获取非直接子节点
    }
  ) => IInnerTreeNode[];

  // 获取某个节点的父节点
  getParent: (node: IInnerTreeNode) => IInnerTreeNode;

  // 获取当前是展开状态的节点
  getExpendedTree: () => ComputedRef<IInnerTreeNode[]>;

  // 获取某个节点在扁平化数据结构中的索引
  getIndex: (node: IInnerTreeNode) => number;

  // 设置某个节点的属性值
  setNodeValue: (node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>) => void;

  // 展开节点，并触发`toggle-change`事件
  expandNode: (data: Array<IInnerTreeNode>) => void;

  // 收起节点，并触发`toggle-change`事件
  collapseNode: (node: IInnerTreeNode) => void;

  // 展开/收起节点
  toggleNode: (node: IInnerTreeNode) => void;

  // 展开所有节点
  expandAllNodes: () => void;

  // 单选，并触发`select-change`事件
  selectNode: (node: IInnerTreeNode) => void;

  // 取消单选，并触发`select-change`事件
  deselectNode: (node: IInnerTreeNode) => void;

  // 单选/取消单选，并触发`select-change`事件
  toggleSelectNode: (node: IInnerTreeNode) => void;

  // 获取已单选的节点
  getSelectedNode: () => IInnerTreeNode;
  // 获取已checked的节点
  getCheckedNodes: () => IInnerTreeNode;

  // 勾选，并触发`check-change`事件
  checkNode: (node: IInnerTreeNode) => void;

  // 取消勾选，并触发`check-change`事件
  uncheckNode: (node: IInnerTreeNode) => void;

  // 勾选/取消勾选，并触发`check-change`事件
  toggleCheckNode: (node: IInnerTreeNode) => void;

  // 获取已勾选的节点
  getCheckedNodes: () => IInnerTreeNode[];

  // 禁用节点单选
  disableSelectNode: (node: IInnerTreeNode) => void;

  // 禁用节点勾选
  disableCheckNode: (node: IInnerTreeNode) => void;

  // 禁用节点展开/收起
  disableToggleNode: (node: IInnerTreeNode) => void;

  // 启用节点单选
  enableSelectNode: (node: IInnerTreeNode) => void;

  // 启用节点勾选
  enableCheckNode: (node: IInnerTreeNode) => void;

  // 启用节点展开/收起
  enableToggleNode: (node: IInnerTreeNode) => void;

  // 当节点只有一个子节点时，合并显示
  mergeTreeNodes: () => void;

  // 懒加载某个节点的子节点
  lazyLoadNodes: (node: IInnerTreeNode) => void;

  // 搜索节点，参数为搜索关键字和搜索配置项，SearchFilterOption 见下表
  searchTree: (target: string, option: SearchFilterOption) => void;
};
```

#### IInnerTreeNode

```ts
interface IInnerTreeNode extends ITreeNode {
  level: number;
  idType?: 'random';
  parentId?: string;
  isLeaf?: boolean;
  parentChildNodeCount?: number;
  currentIndex?: number;
  loading?: boolean; // 节点是否显示加载中
  childNodeCount?: number; // 该节点的子节点的数量
  isMatched?: boolean; // 搜索过滤时是否匹配该节点
  childrenMatched?: boolean; // 搜索过滤时是否有子节点存在匹配
  isHide?: boolean; // 过滤后是否不显示该节点
  matchedText?: string; // 节点匹配的文字（需要高亮显示）
}
```

#### SearchFilterOption

```ts
interface SearchFilterOption {
  isFilter: boolean; // 是否是过滤节点
  matchKey?: string; // node节点中匹配搜索过滤的字段名
  pattern?: RegExp; // 搜索过滤时匹配的正则表达式
}
```
