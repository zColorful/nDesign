# leftTree 左侧树

一种呈现嵌套结构的组件。

#### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树组件可以完整展现其中的层级关系，并具有展开/收起、选择等交互功能。

### 基本用法

:::demo

```vue
<template>
  <n-left-tree :data="data" :treeAttrData="treeAttrData" @treeDelNode="treeDelNode"></n-left-tree>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        id: 0,
        label: '全部',
        type: 'ROOT',
        children: [
          {
            id: 1,
            label: '组一',
            type: 'group',
            children: [{ id: 4, label: '组四', type: 'group', children: null }],
          },
          { id: 2, label: '组二', type: 'group', children: null },
          { id: 3, label: '组三', type: 'group', children: null },
        ],
      },
    ]);

    const treeAttrData = {
      showCheckbox: false,
      showControl: true,
      showLeftIcon: true,
    };

    const treeDelNode = (item) => {
      console.log(item);
    };

    return {
      data,
      treeAttrData,
      treeDelNode,
    };
  },
});
</script>
```

:::

### LeftTree 参数

| 参数名       | 类型   | 默认 | 说明                                                             |
| :----------- | :----- | :--- | :--------------------------------------------------------------- |
| data         | array  | []   | 必选，树基础数据,如 [{label:'节点',type:'tag',id:1,children:[]}] |
| treeAttrData | object | {}   | 可选，树属性数据                                                 |

### LeftTree 事件

| 事件名         | 回调参数         | 说明                                         |
| :------------- | :--------------- | :------------------------------------------- |
| treeUpdateNode | `Function(item)` | 新增或修改节点事件，返回修改后节点对象       |
| treeDelNode    | `Function(item)` | 删除节点事件，返回选中的节点对象             |
| treeCheckNode  | `Function(item)` | 选中状态发生变化事件，返回所有选中的节点对象 |

### LeftTree 插槽

| 插槽名  | 说明         |
| :------ | :----------- |
| pageTop | 头部内容替换 |

### LeftTree treeAttrData 定义

```ts
interface treeAttrData {
  isHideSearch: boolean; // 是否隐藏左侧顶部搜索框
  isHideTree: boolean; // 是否左侧隐藏树
  filterText: string; // 过滤内容
  showCheckbox: boolean; // 是否显示选择框checkbox
  showControl: boolean; // 显示控制按钮
  showLeftIcon: boolean; // 显示左侧icon图标
  dialogTitle: string; // 弹窗顶部名称
  dialogName: string; // 弹窗输入目录名称
  dialogDesc: string; // 弹窗描述名称
  childTitle: string; // 二级父类元素新增名称
}
```
