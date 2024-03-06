# table v 虚拟列表组件

虚拟列表组件。

#### 何时使用

数据量过大又无需翻页时，防止页面卡顿，使用虚拟列表。

### 基本用法

::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :width="850" :height="400" fixed style="width:100%" />
  <!-- <n-my-table :attrList="attrList" :tableData="dataSource" :isAction="true" borderType="bordered">
    <template #action="scoped">
      <n-button type="text" @click="test(scoped)">测试</n-button>
    </template>
  </n-my-table> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(2);
    const data = generateData(columns, 100000);

    return { data, columns };
  },
});
</script>

<style></style>
```

:::

### 自动调整大小

如果您不想手动设置表格的 `width` 和 `height` ，可以使用 `AutoResizer` 组件包裹表格组件，这将会自动更新表格的宽度和高度。
尝试调整您的浏览器大小来看看它是如何工作的。

由于 `AutoResizer` 组件的默认高度是 100%， 所以请确保 该组件的父元素被设置了一个固定的高度 也可以通过 设置 `style` 属性为 `AutoResizer` 指定高度。

::: demo

```vue
<template>
  <div style="height: 400px">
    <n-auto-resizer>
      <template #default="{ height, width }">
        <n-table-v :columns="columns" :data="data" :width="width" :height="height" fixed />
      </template>
    </n-auto-resizer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 1000);

    return { data, columns };
  },
});
</script>

<style></style>
```

:::

### 自定义单元格渲染

您可以自由定制表格单元格的渲染内容，下面是一个简单例子。
Markdown 限制赞不能展示返回节点，待修复后展示

::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :width="700" :height="400" fixed />
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let id = 0;

    const dataGenerator = () => ({
      id: `random-id-${++id}`,
      name: 'Tom',
      date: '2020-10-1',
    });

    const columns = [
      {
        key: 'date',
        title: 'Date',
        dataKey: 'date',
        width: 150,
        fixed: 'right',
        // cellRenderer: ({ cellData: date }) => {
        //   return (
        //     <n-tooltip content="test">
        //       <span class="flex items-center">tooltip</span>
        //     </n-tooltip>
        //   );
        // },
      },
      {
        key: 'name',
        title: 'Name',
        dataKey: 'name',
        align: 'center',
        width: 200,
        cellRenderer: ({ cellData: name }) => {
          return 666;
        },
      },
      {
        key: 'operations',
        title: 'Operations',
        width: 200,
        // cellRenderer: () => (
        //   <>
        //     <n-button size="small">Edit</n-button>
        //     <n-button size="small" type="danger">
        //       Delete
        //     </n-button>
        //   </>
        // ),
        align: 'center',
      },
    ];

    const data = ref(Array.from({ length: 200 }).map(dataGenerator));
    return { data, columns };
  },
});
</script>

<style></style>
```

:::

### 带状态的表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。
可以通过指定 `Table` 组件的 `row-class-name` 属性来为 `Table` 中的某一行添加 class， 表明该行处于某种状态。 每 10 行会自动添加 `bg-blue-200` 类名，每 5 行会添加 `bg-red-100` 类名。
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :row-class="rowClass" :width="700" :height="400" />
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    let id = 0;

    const dataGenerator = () => ({
      id: `random-id-${++id}`,
      name: 'Tom',
      date: '2020-10-1',
    });

    const columns = [
      {
        key: 'date',
        title: 'Date',
        dataKey: 'date',
        width: 150,
        fixed: 'left',
        // cellRenderer: ({ cellData: date }) => <div>test</div>,
      },
      {
        key: 'name',
        title: 'Name',
        dataKey: 'name',
        width: 150,
        align: 'center',
        // cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
      },
      {
        key: 'operations',
        title: 'Operations',
        // cellRenderer: () => (
        //   <>
        //     <ElButton size="small">Edit</ElButton>
        //     <ElButton size="small" type="danger">
        //       Delete
        //     </ElButton>
        //   </>
        // ),
        width: 150,
        align: 'center',
        flexGrow: 1,
      },
    ];

    const data = ref(Array.from({ length: 200 }).map(dataGenerator));

    const rowClass = ({ rowIndex }) => {
      if (rowIndex % 10 === 5) {
        return 'bg-red-100';
      } else if (rowIndex % 10 === 0) {
        return 'bg-blue-200';
      }
      return '';
    };
    return { columns, rowClass, data };
  },
});
</script>
<style>
.bg-blue-200 {
  background: blue;
}
.bg-red-100 {
  background: red;
}
</style>
```

:::

### 表格行的粘性布局

您可以简单地使用 `fixed-data` 属性来实现将某些行固定到表格的头部。

您可以使用滚动事件动态地设置粘性行，见此示例
::: demo

```vue
<template>
  <n-table-v
    :columns="columns"
    :data="tableData"
    :fixed-data="fixedData"
    :width="700"
    :height="400"
    :row-class="rowClass"
    fixed
    @scroll="onScroll"
  />
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 200);

    const rowClass = ({ rowIndex }) => {
      if (rowIndex < 0 || (rowIndex + 1) % 5 === 0) return 'sticky-row';
    };

    const stickyIndex = ref(0);

    const fixedData = computed(() => data.slice(stickyIndex.value, stickyIndex.value + 1));

    const tableData = computed(() => {
      return data.slice(1);
    });

    const onScroll = ({ scrollTop }) => {
      stickyIndex.value = Math.floor(scrollTop / 250) * 5;
    };

    return { columns, rowClass, tableData, onScroll, fixedData };
  },
});
</script>
```

:::

### 固定列表格

出于某些原因，您可能会让一些列固定在表格的左侧和右侧。您可以通过为表格添加特殊属性来实现。

您可以设置该行的 `fixed` 属性为 `true` （代表`left`）、`left` 或 `right`
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :sort-by="sortBy" :width="700" :height="400" fixed @column-sort="onSort" />
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    let data = generateData(columns, 200);

    const sortBy = ref<any>({
      key: 'column-0',
      order: 'asc',
    });

    const onSort = (_sortBy: any) => {
      data = data.reverse();
      sortBy.value = _sortBy;
    };

    columns[0].fixed = true;
    columns[1].fixed = 'left';
    columns[9].fixed = 'right';

    for (let i = 0; i < 3; i++) columns[i].sortable = true;

    return { columns, data, sortBy, onSort };
  },
});
</script>
```

:::

<!-- ### 表头分组

正如这个示例，通过自定义表头渲染以将表头分组。

在这种形况下，我们使用 JSX 特性（该功能在 `playground` 中不被支持，您可以在您的本地环境或在线 IDE （如 codesandbox ）中使用）

建议您使用 JSX 使用您的表格组件，因为它包含 VNode 操作。
::: demo

```vue
<template>
  <n-table-v
    fixed
    :columns="fixedColumns"
    :data="data"
    :header-height="[50, 40, 50]"
    :header-class="headerClass"
    :width="700"
    :height="400"
  >
    <template #header="props">
      <customized-header v-bind="props" />
    </template>
  </n-table-v>
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });
    const columns = generateColumns(15);
    const data = generateData(columns, 200);

    const fixedColumns = columns.map((column, columnIndex) => {
      let fixed = undefined;
      if (columnIndex < 3) fixed = TableV2FixedDir.LEFT;
      if (columnIndex > 12) fixed = TableV2FixedDir.RIGHT;
      return { ...column, fixed, width: 100 };
    });

    const CustomizedHeader: any = ({ cells, columns, headerIndex }) => {
      if (headerIndex === 2) return cells;

      const groupCells = [] as typeof cells;
      let width = 0;
      let idx = 0;

      columns.forEach((column, columnIndex) => {
        if (column.placeholderSign === TableV2Placeholder) groupCells.push(cells[columnIndex]);
        else {
          width += cells[columnIndex].props!.column.width;
          idx++;

          const nextColumn = columns[columnIndex + 1];
          if (
            columnIndex === columns.length - 1 ||
            nextColumn.placeholderSign === TableV2Placeholder ||
            idx === (headerIndex === 0 ? 4 : 2)
          ) {
            groupCells.push(
              <div
                class="flex items-center justify-center custom-header-cell"
                role="columnheader"
                style={{
                  ...cells[columnIndex].props!.style,
                  width: `${width}px`,
                }}>
                Group width {width}
              </div>
            );
            width = 0;
            idx = 0;
          }
        }
      });
      return groupCells;
    };

    const headerClass = ({ headerIndex }: any) => {
      if (headerIndex === 1) return 'el-primary-color';
      return '';
    };
    return { columns, data, sortBy, onSort };
  },
});
</script>

<style>
.el-el-table-v2__header-row .custom-header-cell {
  border-right: 1px solid var(--el-border-color);
}

.el-el-table-v2__header-row .custom-header-cell:last-child {
  border-right: none;
}

.el-primary-color {
  background-color: var(--el-color-primary);
  color: var(--el-color-white);
  font-size: 14px;
  font-weight: bold;
}

.el-primary-color .custom-header-cell {
  padding: 0 4px;
}
</style>
```

::: -->

### 可排序表格

您可以使用排序状态来对表格进行排序。
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :sort-by="sortState" :width="700" :height="400" fixed @column-sort="onSort" />
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    let data = generateData(columns, 200);

    columns[0].sortable = true;

    const sortState = ref<any>({
      key: 'column-0',
      order: 'asc',
    });

    const onSort = (sortBy: any) => {
      console.log(sortBy);
      data = data.reverse();
      sortState.value = sortBy;
    };

    return { columns, data, onSort, sortState };
  },
});
</script>
```

:::

### 受控的排序

您可以在需要时定义多个可排序的列。 请记住，当您在定义了多个可排序的列时， UI 可能会显得有些奇怪，因为用户不知道哪一列被排序。
::: demo

```vue
<template>
  <n-table-v v-model:sort-state="sortState" :columns="columns" :data="data" :width="700" :height="400" fixed @column-sort="onSort" />
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = ref(generateData(columns, 200));

    columns[0].sortable = true;
    columns[1].sortable = true;

    const sortState = ref({
      'column-0': 'desc',
      'column-1': 'asc',
    });

    const onSort = ({ key, order }) => {
      sortState.value[key] = order;
      data.value = data.value.reverse();
    };

    return { columns, data, onSort, sortState };
  },
});
</script>
```

:::

<!-- ### 高亮显示鼠标悬停单元格

当数据列表很大时，有时候会忘记正在访问的行和列，使用这个属性可以给予你这个帮助。
::: demo

```vue
<template>
  <div style="height: 400px">
    <n-auto-resizer>
      <template #default="{ height, width }">
        <n-table-v :columns="columns" :cell-props="cellProps" :class="kls" :data="data" :width="width" :height="height" />
      </template>
    </n-auto-resizer>
  </div>
</template>

<script lang="tsx">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    columns.unshift({
      key: 'column-n-1',
      width: 50,
      title: 'Row No.',
      cellRenderer: ({ rowIndex }) => `${rowIndex + 1}`,
      align: 'center',
    });
    const data = generateData(columns, 200);

    const cellProps = ({ columnIndex }) => {
      const key = `hovering-col-${columnIndex}`;
      return {
        ['data-key']: key,
        onMouseenter: () => {
          kls.value = key;
        },
        onMouseleave: () => {
          kls.value = '';
        },
      };
    };

    const kls = ref<string>('');

    return { columns, data, cellProps, kls };
  },
});
</script>

<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(red);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>
```

::: -->

<!-- ### 横跨列

虚拟化表格没有使用内置的 `table` 元素，故 `colspan` 和 `rowspan` 与 `Table` 比较略有不同。 通过定制的行渲染器，我们仍然可以实现这个需求。 在如下例子，你会学习如何做到这一点。
::: demo

```vue
<template>
  <n-table-v fixed :columns="columns" :data="data" :width="700" :height="400">
    <template #row="props">
      <Row v-bind="props" />
    </template>
  </n-table-v>
</template>

<script lang="ts">
import { cloneVNode, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 200);

    const colSpanIndex = 1;
    columns[colSpanIndex].colSpan = ({ rowIndex }) => (rowIndex % 4) + 1;
    columns[colSpanIndex].align = 'center';

    const Row = ({ rowData, rowIndex, cells, columns }) => {
      const colSpan = columns[colSpanIndex].colSpan({ rowData, rowIndex });
      if (colSpan > 1) {
        let width = Number.parseInt(cells[colSpanIndex].props.style.width);
        for (let i = 1; i < colSpan; i++) {
          width += Number.parseInt(cells[colSpanIndex + i].props.style.width);
          cells[colSpanIndex + i] = null;
        }
        const style = {
          ...cells[colSpanIndex].props.style,
          width: `${width}px`,
          backgroundColor: 'var(--el-color-primary-light-3)',
        };
        cells[colSpanIndex] = cloneVNode(cells[colSpanIndex], { style });
      }

      return cells;
    };
    return { columns, data, Row };
  },
});
</script>
```

::: -->

### 树形数据

虚拟化表格当然可以渲染树形数据，您可以通过点击箭头图标来展开/折叠树节点。
::: demo

```vue
<template>
  <n-table-v
    v-model:expanded-row-keys="expandedRowKeys"
    :columns="columns"
    :data="treeData"
    :width="700"
    :expand-column-key="expandColumnKey"
    :height="400"
    fixed
    @row-expand="onRowExpanded"
    @expanded-rows-change="onExpandedRowsChange"
  />
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10).map((column, columnIndex) => {
      let fixed;
      if (columnIndex < 2) fixed = 'left';
      if (columnIndex > 8) fixed = 'right';
      return { ...column, fixed };
    });

    const data = generateData(columns, 200);

    const expandColumnKey = 'column-0';

    // add some sub items
    for (let i = 0; i < 50; i++) {
      data.push(
        {
          ...data[0],
          id: `${data[0].id}-sub-${i}`,
          parentId: data[0].id,
          [expandColumnKey]: `Sub ${i}`,
        },
        {
          ...data[2],
          id: `${data[2].id}-sub-${i}`,
          parentId: data[2].id,
          [expandColumnKey]: `Sub ${i}`,
        },
        {
          ...data[2],
          id: `${data[2].id}-sub-sub-${i}`,
          parentId: `${data[2].id}-sub-${i}`,
          [expandColumnKey]: `Sub-Sub ${i}`,
        }
      );
    }

    function unflatten(data: ReturnType<typeof generateData>, rootId = null, dataKey = 'id', parentKey = 'parentId') {
      const tree: any[] = [];
      const childrenMap = {};

      for (const datum of data) {
        const item = { ...datum };
        const id = item[dataKey];
        const parentId = item[parentKey];

        if (Array.isArray(item.children)) {
          childrenMap[id] = item.children.concat(childrenMap[id] || []);
        } else if (!childrenMap[id]) {
          childrenMap[id] = [];
        }
        item.children = childrenMap[id];

        if (parentId !== undefined && parentId !== rootId) {
          if (!childrenMap[parentId]) childrenMap[parentId] = [];
          childrenMap[parentId].push(item);
        } else {
          tree.push(item);
        }
      }

      return tree;
    }

    const treeData = computed(() => unflatten(data));

    const expandedRowKeys = ref<string[]>([]);

    const onRowExpanded = ({ expanded }) => {
      console.log('Expanded:', expanded);
    };

    const onExpandedRowsChange = (expandedKeys) => {
      console.log(expandedKeys);
    };

    return { columns, treeData, onExpandedRowsChange, onRowExpanded, expandedRowKeys, expandColumnKey };
  },
});
</script>
```

:::

### 动态高度

虚拟表格也支持渲染动态高度的单元格。当不知道一条数据具体的展示高度时，不妨使用动态渲染高度来解决。 通过设置预估行高度 `estimated-row-height` 来启用此 功能，估计值越接近，渲染效果将会越平滑。

每行的实际渲染高度是在渲染时动态测量的， 如果您尝试渲染大量数据，渲染界面 可能 会出现抖动。
::: demo

```vue
<template>
  <n-table-v
    :columns="columns"
    :data="data"
    :sort-by="sort"
    :estimated-row-height="80"
    :width="700"
    :height="400"
    fixed
    @column-sort="onColumnSort"
  />
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const longText = 'Quaerat ipsam necessitatibus eum quibusdam est id voluptatem cumque mollitia.';
    const midText = 'Corrupti doloremque a quos vero delectus consequatur.';
    const shortText = 'Eius optio fugiat.';

    const textList = [shortText, midText, longText];

    // generate random number in range 0 to 2

    let id = 0;

    const dataGenerator = () => ({
      id: `random:${++id}`,
      name: 'Tom',
      date: '2016-05-03',
      description: textList[Math.floor(Math.random() * 3)],
    });

    const columns = [
      {
        key: 'id',
        title: 'Id',
        dataKey: 'id',
        width: 150,
        sortable: true,
        fixed: 'left',
      },
      {
        key: 'name',
        title: 'Name',
        dataKey: 'name',
        width: 150,
        align: 'center',
        cellRenderer: ({ cellData: name }) => 'name',
      },
      {
        key: 'description',
        title: 'Description',
        dataKey: 'description',
        width: 150,
        cellRenderer: ({ cellData: description }) => 'description',
      },
      {
        key: 'operations',
        title: 'Operations',
        cellRenderer: () => 'test',
        // <>
        //   <ElButton size="small">Edit</ElButton>
        //   <ElButton size="small" type="danger">
        //     Delete
        //   </ElButton>
        // </>
        width: 150,
        align: 'center',
      },
    ];
    const data = ref(
      Array.from({ length: 200 })
        .map(dataGenerator)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    );

    const sort = ref({ key: 'name', order: 'asc' });

    const onColumnSort = (sortBy) => {
      const order = sortBy.order === 'asc' ? 1 : -1;
      const dataClone = [...data.value];
      dataClone.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
      sort.value = sortBy;
      data.value = dataClone;
    };

    return { columns, data, onColumnSort, sort };
  },
});
</script>
```

:::

<!-- ### 可展开的附加信息

通过动态高度渲染，我们可以在表格中显示可展开的更多附加信息。
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :estimated-row-height="50" :expand-column-key="columns[0].key" :width="700" :height="400">
    <template #row="props">
      <Row v-bind="props" />
    </template>
  </n-table-v>
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const detailedText = `Velit sed aspernatur tempora. Natus consequatur officiis dicta vel assumenda.
Itaque est temporibus minus quis. Ipsum commodiab porro vel voluptas illum.
Qui quam nulla et dolore autem itaque est.
Id consequatur ipsum ea fuga et odit eligendi impedit.
Maiores officiis occaecati et magnam et sapiente est velit sunt.
Non et tempore temporibus. Excepturi et quos. Minus distinctio aut.
Voluptatem ea excepturi omnis vel. Non aperiam sit sed laboriosam eaque omnis deleniti.
Est molestiae omnis non et nulla repudiandae fuga sit.`;

    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = ref(
      generateData(columns, 200).map((data) => {
        data.children = [
          {
            id: `${data.id}-detail-content`,
            detail: detailedText,
          },
        ];
        return data;
      })
    );

    const Row = ({ cells, rowData }) => {
      if (rowData.detail) return rowData.detail;
      return cells;
    };

    Row.inheritAttrs = false;

    return { columns, data, Row };
  },
});
</script>
```

::: -->

### 自定义页脚

自定义表格 footer， 通常用来展示一些汇总数据和信息。
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :row-height="40" :width="700" :height="400" :footer-height="50" fixed>
    <template #footer
      ><div
        class="flex items-center"
        style="
          justify-content: center;
          height: 100%;
          background-color: #447DFD;
        "
      >
        Display a message in the footer
      </div>
    </template>
  </n-table-v>
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 200);

    return { columns, data };
  },
});
</script>
```

:::

### 自定义空元素渲染器

渲染自定义的空元素
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="[]" :row-height="40" :width="700" :height="400" :footer-height="50">
    <template #empty>
      <div class="flex items-center justify-center h-100%">testEmpty</div>
    </template>
  </n-table-v>
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const columns = generateColumns(10);

    return { columns };
  },
});
</script>
```

:::

### 浮动遮罩层

当您想要显示加载指示器之类的浮动元素，可以通过渲染一个浮动在表格之上的遮罩层来实现。
::: demo

```vue
<template>
  <n-table-v :columns="columns" :data="data" :row-height="40" :width="700" :height="400">
    <template #overlay>
      <div class="el-loading-mask" style="display: flex; align-items: center; justify-content: center">
        <n-icon name="icon-loading" class="is-loading" :size="26" />
      </div>
    </template>
  </n-table-v>
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 200);

    return { columns };
  },
});
</script>
<style>
.example-showcase .nancalui-table-v__overlay {
  z-index: 9;
}
</style>
```

:::

### 手动滚动

使用 Table V 暴露的方法进行手动或编程式滚动指定偏移或行。

`scrollToRow` 的第二个参数代表滚动策略，计算了要滚动的位置，其默认值是 `auto。` 如果你想要表格滚动到某个特定位置，可以额外配置。 可用的选项是 `"auto" | "center" | "end" | "start" | "smart"`

`smart` `和auto` 之间的区别是， `auto` 是 `smart` 滚动策略的子集。
::: demo

```vue
<template>
  <div class="mb-4 flex items-center">
    <n-form-item label="Scroll pixels" class="mr-4">
      <n-input v-model="scrollDelta" />
    </n-form-item>
    <n-form-item label="Scroll rows">
      <n-input v-model="scrollRows" />
    </n-form-item>
  </div>
  <div class="mb-4 flex items-center">
    <n-button @click="scrollByPixels"> Scroll by pixels </n-button>
    <n-button @click="scrollByRows"> Scroll by rows </n-button>
  </div>
  <div style="height: 400px">
    <n-auto-resizer>
      <template #default="{ height, width }">
        <n-table-v ref="tableRef" :columns="columns" :data="data" :width="width" :height="height" fixed />
      </template>
    </n-auto-resizer>
  </div>
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
      }));

    const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
            return rowData;
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
          }
        );
      });

    const columns = generateColumns(10);
    const data = generateData(columns, 200);
    const tableRef = ref();
    const scrollDelta = ref(200);
    const scrollRows = ref(10);

    function scrollByPixels() {
      tableRef.value?.scrollToTop(scrollDelta.value);
    }

    function scrollByRows() {
      tableRef.value?.scrollToRow(scrollRows.value);
    }

    return { columns, scrollRows, data, scrollDelta, scrollByPixels, scrollByRows, tableRef };
  },
});
</script>
```

:::

### TableV 参数

| 参数名                    | 类型                                     | 默认值    | 说明                                                                    | 跳转 Demo             |
| :------------------------ | :--------------------------------------- | :-------- | :---------------------------------------------------------------------- | :-------------------- |
| cache                     | `number`                                 | 2         | 为了更好的渲染效果预先多加载的行数据                                    | [基本用法](#基本用法) |
| estimated-row-height      | `number`                                 | --        | 渲染动态的单元格的预估高度隔                                            |                       |
| header-class              | `String/Function<HeaderClassGetter>`     | -         | header 部分的自定义 class 名 60px                                       |                       |
| header-props              | `Object/Function<HeaderPropsGetter>`     | --        | header 部分的自定义 props 名度                                          |                       |
| header-cell-props         | `Object/Function<HeaderCellPropsGetter>` | --        | header cell 部分的自定义 props 名度                                     |                       |
| header-height             | `Number/Array<Number>`                   | 50        | header 部分的高度。当传入数组时, 将会渲染和数组长度一样多的 header 行度 |                       |
| table-height              | `string`                                 | --        | 可选，表格高度                                                          |                       |
| footer-height             | `number`                                 | 0         | footer 部分的高度，当传入值时，这部分将被计算入 table 的高度里          |                       |
| row-class                 | `String/Function<RowClassGetter>`        | --        | row wrapper 部分的自定义 class 名部                                     |                       |
| row-key                   | `boolean`                                | false     | 每行的 key 值，如果不提供，将使用索引 index 代替                        |                       |
| row-props                 | `Object/Function<RowPropsGetter>`        | --        | row component 部分的自定义 class 名                                     |                       |
| row-height                | `number`                                 | 50        | 每行的高度, 用于计算表的总高度'auto'                                    | [表格样式](#表格样式) |
| cell-props                | `Object/Function<CellPropsGetter>`       | --        | 每个单元格 cell 的自定义 props (除了 header cell 以外)                  |                       |
| columns                   | `Array<Column>`                          | ''        | 列 column 的配置数组                                                    |                       |
| data                      | `Array<Data>`                            | []        | 要在表中渲染的数据数组                                                  |                       |
| fixed-data                | `Array<Data>`                            | --        | 渲染行在表格主内容上方和 header 下方区域的数据                          |                       |
| expanded-row-keys         | `Array<KeyType>`                         | --        | 存放行展开状态的 key 的数组，可以和 `v-model` 搭配使用                  |                       |
| default-expanded-row-keys | `Array<KeyType>`                         | --        | 默认展开的行的 key 的数组, 这个数据不是响应式的                         |                       |
| class                     | `String/Array/Object`                    | false     | 表格的类名称，将应用于表格的全部的三个部分 (左、右、主)                 |
| width \*                  | `Number`                                 | --        | 表的宽度，必填定                                                        |
| height \*                 | `Number`                                 | --        | 表的高度，必填定                                                        |
| max-height                | `Number`                                 | --        | 表格的最大高度                                                          |
| sort-by                   | `Object<SortBy>`                         | {}        | 排序方式                                                                |
| sort-state                | `Object<SortState>`                      | undefined | 多个排序                                                                |

### TableV 插槽

| 插槽名      | 说明 | 参数                |
| :---------- | :--- | :------------------ |
| cell        |      | CellSlotProps       |
| header      |      | HeaderSlotProps     |
| header-cell |      | HeaderCellSlotProps |
| row         |      | RowSlotProps        |
| footer      |      |                     |
| empty       |      |                     |
| overlay     |      |                     |

### TableV 事件

| 事件名               | 回调参数                     | 说明                               | 跳转 Demo |
| :------------------- | :--------------------------- | :--------------------------------- | :-------- |
| column-sort          | `Object<ColumnSortParam>`    | 列排序时调用                       |           |
| expanded-rows-change | `Array<KeyType>`             | 行展开状态改变时触发               |           |
| end-reached          | --                           | 到达表格末尾时触发                 |           |
| scroll               | ` Object<ScrollParams>`      | 表格被用户滚动后触发               |           |
| rows-rendered        | `Object<RowsRenderedParams>` | 当行被渲染后触发                   |           |
| row-expand           | `Object<RowExpandParams>`    | 点击箭头图标展开/折叠树节点时触发  |           |
| row-event-handlers   | `Object<RowEventHandlers>`   | 当每行添加了一系列事件处理器时触发 |           |

### TableV 方法

| 方法名       | 参数                                                             | 说明                           |
| :----------- | :--------------------------------------------------------------- | :----------------------------- |
| scrollTo     | `{ scrollLeft?: number, scrollTop?: number}`                     | 滚动到给定位置                 |
| scrollToLeft | `scrollLeft: number`                                             | 滚动到给定的水平位置           |
| scrollToTop  | `scrollTop: number`                                              | 滚动到给定的垂直位置           |
| scrollToRow  | `row: number, strategy?: "auto"/"center"/"end"/"start" /"smart"` | 使用给定的滚动策略滚动至指定行 |

### Column 属性

| 属性               | 描述                                         | 类型                                               | 默认值 |
| :----------------- | :------------------------------------------- | :------------------------------------------------- | ------ |
| align              | 表格单元格内容对齐方式                       | `Alignment`                                        | left   |
| class              | 列的类名                                     | `String`                                           | --     |
| fixed              | 固定列位置                                   | `Boolean/FixedDir`                                 | false  |
| flexGrow           | CSS 属性 flex grow, 仅当不是固定表时才生效   | `Number`                                           | 0      |
| flexShrink         | CSS 属性 flex shrink, 仅当不是固定表时才生效 | `Number`                                           | 1      |
| headerClass        | 自定义 header 头部类名                       | `String`                                           | --     |
| hidden             | 此列是否不可见                               | `Boolean`                                          | --     |
| style              | 自定义列单元格的类名，将会与 gird 单元格合并 | `CSSProperties`                                    | --     |
| sortable           | 设置列是否可排序                             | `Boolean`                                          | --     |
| title              | Header 头部单元格中的默认文本                | `String`                                           | --     |
| maxWidth           | 列的最大宽度                                 | `String`                                           | --     |
| minWidth           | 列的最小宽度                                 | `String`                                           | --     |
| width \*           | 列的宽度 必填                                | `Number`                                           | --     |
| cellRenderer       | 自定义单元格渲染器                           | `VueComponent/(props: CellRenderProps) => VNode`   | --     |
| headerCellRenderer | 自定义头部渲染器                             | `VueComponent/(props: HeaderRenderProps) => VNode` | --     |
