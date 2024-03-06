# Dragdrop 拖拽

拖拽组件。

#### 何时使用

当需要使用数个操作步骤，且步骤的顺序需要灵活调整时。

### 基本用法

:::demo 从一个 container 拖动到另外一个 container。

```vue
<template>
  <div class="dragdrop-card-container">
    <div class="dragdrop-card">
      <div class="dragdrop-card-header">Draggable Item</div>
      <div class="dragdrop-card-block drag">
        <div
          id="draggable-item"
          class="draggable-item"
          v-n-draggable="{
            dragScope: 'default-css',
            dragData: { item: 'item', parent: 'list1' },
          }"
        >
          VSCode
        </div>
        <div
          id="draggable-item2"
          class="draggable-item"
          v-n-draggable="{
            dragScope: 'default-css',
            dragData: { item: 'item', parent: 'list1' },
          }"
        >
          Sublime
        </div>
      </div>
    </div>
    <div class="dragdrop-card" v-n-droppable>
      <div class="dragdrop-card-header">Drop Area</div>
      <div class="dragdrop-card-block droppable"></div>
    </div>
    <div class="dragdrop-card" v-n-sortable>
      <div class="dragdrop-card-header">Drop Area With Sortable</div>
      <div class="dragdrop-card-block"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      msg: 'Dragdrop 拖拽 组件文档示例',
    };
  },
});
</script>

<style>
.dragdrop-card-container {
  display: flex;
}

.dragdrop-card {
  padding: 12px;
  margin-right: 12px;
  border: 1px solid #e1e1e1;
  border: 1px solid var(--nancalui-dividing-line, #e1e1e1);
}

.dragdrop-card .dragdrop-card-header {
  padding-bottom: 12px;
  font-size: 12px;
  font-size: var(--nancalui-font-size, 12px);
}

.draggable-item {
  padding: 0 16px;
  height: 30px;
  border: 1px solid #447dfd;
  border: 1px solid var(--nancalui-brand, #447dfd);
  color: #fff;
  color: var(--nancalui-light-text, #fff);
  margin-bottom: 5px;
  line-height: 1.5;
  background-color: #447dfd;
  background-color: var(--nancalui-brand, #447dfd);
  display: flex;
  align-items: center;
}
</style>
```

:::

### Draggable 参数

| 参数      | 类型                      | 默认      | 说明                                             | 跳转 Demo             |
| --------- | ------------------------- | --------- | ------------------------------------------------ | --------------------- |
| dragData  | any                       | --        | 可选，转递给 DropEvent 事件的数据                | [基本用法](#基本用法) |
| dragScope | string \| Array\<string\> | 'default' | 可选，限制 drop 的位置，必须匹配对应的 dropScope | [基本用法](#基本用法) |

### Draggable 事件

| 事件           | 类型                      | 说明                                                                            | 跳转 Demo             |
| -------------- | ------------------------- | ------------------------------------------------------------------------------- | --------------------- |
| dragStartEvent | EventEmitter\<DragEvent\> | 开始拖动的 DragStart 事件                                                       | [基本用法](#基本用法) |
| dragEndEvent   | EventEmitter\<DragEvent\> | 拖动结束的 DragEnd 事件                                                         | [基本用法](#基本用法) |
| dropEndEvent   | EventEmitter\<DragEvent\> | 放置结束的 Drop 事件                                                            | [基本用法](#基本用法) |
| dragEnterEvent | EventEmitter\<DragEvent\> | drag 元素进入的 dragenter 事件                                                  | [基本用法](#基本用法) |
| dragOverEvent  | EventEmitter\<DragEvent\> | drag 元素在 drop 区域上的 dragover 事件                                         | [基本用法](#基本用法) |
| dragLeaveEvent | EventEmitter\<DragEvent\> | drag 元素离开的 dragleave 事件                                                  | [基本用法](#基本用法) |
| dropEvent      | EventEmitter\<DropEvent\> | 放置一个元素, 接收的事件，其中 nativeEvent 表示原生的 drop 事件，其他见定义注释 | [基本用法](#基本用法) |
