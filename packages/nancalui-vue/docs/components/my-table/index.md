# MyTable 自用复合列表组件

复合列表组件。

#### 何时使用

集合翻页、多页多选、手动操作等功能时使用。

### 基本用法（无翻页，操作栏使用插槽传入）

::: demo

```vue
<template>
  <n-my-table
    :attrList="attrList"
    isSelection
    :tableData="tableData"
    :headerBg="true"
    isPage
    rowKey="id"
    actionWidth="180px"
    :isAction="true"
    borderType="bordered"
    :currentPage="page.pageNum"
    :pageSize="page.pageSize"
    :total="page.total"
    @sizeChange="handleSizeChange"
    @pageChange="handleCurrentChange"
    @selectChange="handleSelectionChange"
    @selectAllChange="handleSelectionAllRow"
  >
    <template #action="scoped">
      <n-button type="text" @click="test(scoped)">测试</n-button>
    </template>
  </n-my-table>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const test = (scoped) => {
      console.log(scoped);
    };
    const page = reactive({
      pageNum: 1,
      pageSize: 5,
      total: 12,
    });

    const dataSource = ref([
      {
        id: 1,
        firstName: '',
        lastName: '',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 2,
        firstName: '22222222222222',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 3,
        firstName: '333333333333333333',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 4,
        firstName: '4',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 5,
        firstName: '5',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 6,
        firstName: '6',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 7,
        firstName: '7',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 8,
        firstName: '8',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 9,
        firstName: '9',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 10,
        firstName: '10',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 11,
        firstName: '11',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
    ]);
    const attrList = [
      {
        maxWdith: '200px',
        name: '对象名称',
        prop: 'firstName',
      },
      {
        maxWidth: '140px',
        name: '对象类型',
        prop: 'lastName',
        renders: (row, rowIndex) => rowIndex + '',
      },
      {
        maxWidth: '140px',
        name: '创建人',
        prop: 'gender',
      },
      {
        maxWidth: '140px',
        name: '对象创建时间',
        prop: 'date',
      },
    ];
    const tableData = ref([]);
    const handleSizeChange = (pageSize) => {
      page.pageSize = pageSize;
      page.pageNum = 1;
      tableData.value = dataSource?.value.slice(page.pageSize * (page.pageNum - 1), page.pageSize * page.pageNum);
    };
    const handleCurrentChange = (pageNum) => {
      page.pageNum = pageNum;
      tableData.value = dataSource.value.slice(page.pageSize * (pageNum - 1), page.pageSize * pageNum);
    };
    const handleSelectionAllRow = (checked, rows) => {
      console.log(rows);
    };
    const handleSelectionChange = (checked, row, selections) => {
      console.log(checked, row, selections);
    };
    onMounted(() => {
      tableData.value = dataSource.value.slice(0, 5);
      setTimeout(() => {
        tableData.value.push({
          id: 1999,
          firstName: '11999999999999',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        });
      }, 5000);
    });
    return {
      dataSource,
      tableData,
      attrList,
      test,
      page,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionAllRow,
      handleSelectionChange,
    };
  },
});
</script>

<style></style>
```

<!-- ### Layout

布局容器，可以与`n-header`, `n-content`, `n-footer`, `n-aside`组合实现布局； `n-layout`下可嵌套元素：`n-header`, `n-content`, `n-aside`, `n-layout`。

### Header

顶部布局，只能放在`n-layout`容器中，作为`n-layout`容器的顶部实现。 默认高度：40px。

### Footer

底部布局，只能放在`n-layout`容器中，作为`n-layout`容器的底部实现。

### Content

内容容器，只能放在`n-layout`容器中，作为`n-layout`容器`n-header`与`n-footer`之间的内容。

### Aside

侧边栏，只能放在`n-layout`容器中，作为`n-layout`容器的侧边栏部分。 -->
