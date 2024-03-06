# PublicTable 复合 table 组件

复合 table 组件。

#### 何时使用

集合分页器翻页、多选、各列自定义插槽,列宽拖动宽度，回显勾选数据等功能时使用。

### 基本用法

::: demo

```vue
<template>
  <div>
    <n-public-table
      ref="publicTable1"
      :tableHeadTitles="attrList1"
      :tableData="dataSource1"
      :tableHeight="tableHeight"
      :isDisplayAction="false"
      :showTooltip="true"
      :loading="loading1"
      :actionWidth="200"
      :pagination="paginationData1"
      @tablePageChange="tablePageChange1"
      @handle-selection-change="getSelectData1"
    >
      <template #nameHeader="{ editor }">
        <div class="edit-box" :style="{ color: 'red' }">
          {{ editor.header }}
        </div>
      </template>
      <template #editor="{ editor }">
        <div class="edit-box">
          <n-button class="has-right-border" variant="text" @click.prevent="test1(editor)">解绑</n-button>
          <n-button class="has-right-border" variant="text" @click.prevent="test1(editor)">移除</n-button>
          <n-button class="has-right-border" variant="text" @click.prevent="test1(editor)">查看</n-button>
        </div>
      </template>
    </n-public-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const publicTable1 = ref();
    const loading1 = ref(false);
    const test1 = (editor) => {
      console.log(editor);
    };
    const paginationData1 = ref({
      pageSizes: [2, 4, 48],
      pageSize: 2,
    });
    const tableHeight = ref(300);

    const allData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 3,
        firstName: 'ssadsa',
        lastName: 'fdfd',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 4,
        firstName: 'ewew',
        lastName: 'rtt',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 5,
        firstName: 'ghgh',
        lastName: 'assa',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 6,
        firstName: 'oioi',
        lastName: 'mnmn',
        gender: 'Female',
        date: '1990/01/12',
      },
    ];
    const dataSource1 = ref({
      list: [
        {
          id: 1,
          firstName: 'Mark惆怅长岑长错错错错错错惆怅长岑长错错错错错错',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          id: 2,
          firstName: 'Jacob',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        },
      ],
      pageNum: 1,
      pageSize: 2,
      total: 6,
    });
    const attrList1 = [
      {
        name: '对象名称',
        prop: 'firstName',
        headerSlot: 'nameHeader',
      },
      {
        name: '对象类型',
        prop: 'lastName',
      },
      {
        name: '创建人',
        prop: 'gender',
      },
      {
        name: '对象创建时间',
        prop: 'date',
      },
    ];
    const tablePageChange1 = (a, b) => {
      loading1.value = true;
      let starPos = (a.currentPage - 1) * a.pageSize;
      let endPos = a.currentPage * a.pageSize;
      let _currentPageData = allData.slice(starPos, endPos);

      dataSource1.value = {
        list: _currentPageData,
        pageNum: a.currentPage,
        pageSize: a.pageSize,
        total: 6,
      };
      loading1.value = false;
    };
    const getSelectData1 = (data) => {
      console.log(data);
    };

    return { dataSource1, attrList1, test1, loading1, paginationData1, tablePageChange1, publicTable1, getSelectData1, tableHeight };
  },
});
</script>

<style></style>
```

:::

### 多选框

::: demo

```vue
<template>
  <div>
    <n-public-table
      ref="publicTable2"
      :tableHeadTitles="attrList2"
      :tableData="dataSource2"
      :isDisplayAction="true"
      :loading="loading2"
      :isNeedSelection="true"
      :pagination="paginationData2"
      @tablePageChange="tablePageChange2"
      @handle-selection-change="getSelectData2"
    >
      <template #firstName="{ editor }">
        <n-input v-model="editor.row.firstName">测试2</n-input>
      </template>
      <template #editor="{ editor }">
        <n-button type="text" @click="test2(editor)">测试</n-button>
      </template>
      <template #empty>
        <span>暂无数据</span>
      </template>
    </n-public-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const publicTable2 = ref();
    const loading2 = ref(false);
    const test2 = (editor) => {
      console.log(editor);
    };
    const paginationData2 = ref({
      pageSizes: [2, 4, 48],
      pageSize: 2,
    });
    const allData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 3,
        firstName: 'ssadsa',
        lastName: 'fdfd',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 4,
        firstName: 'ewew',
        lastName: 'rtt',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 5,
        firstName: 'ghgh',
        lastName: 'assa',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 6,
        firstName: 'oioi',
        lastName: 'mnmn',
        gender: 'Female',
        date: '1990/01/12',
      },
    ];
    const dataSource2 = ref({
      list: [
        {
          id: 1,
          firstName: 'Mark',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          id: 2,
          firstName: 'Jacob',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        },
      ],
      pageNum: 1,
      pageSize: 2,
      total: 6,
    });
    const attrList2 = [
      {
        name: '对象名称',
        prop: 'firstName',
        slot: 'firstName',
        resizeable: true,
      },
      {
        name: '对象类型',
        prop: 'lastName',
      },
      {
        name: '创建人',
        prop: 'gender',
      },
      {
        name: '对象创建时间',
        prop: 'date',
      },
    ];
    const tablePageChange2 = (a, b) => {
      let starPos = (a.currentPage - 1) * a.pageSize;
      let endPos = a.currentPage * a.pageSize;
      let _currentPageData = allData.slice(starPos, endPos);
      dataSource2.value = {
        list: _currentPageData,
        pageNum: a.currentPage,
        pageSize: a.pageSize,
        total: 6,
      };
    };
    const getSelectData2 = (data) => {
      console.log(data);
    };

    return { dataSource2, attrList2, test2, loading2, paginationData2, tablePageChange2, publicTable2, getSelectData2 };
  },
});
</script>

<style></style>
```

:::

### 多选框禁止编辑回显数据

::: demo

```vue
<template>
  <div>
    <n-button type="text" @click="getCheckedRows" style="margin-bottom:20px">获取勾选数据</n-button>
    <n-public-table
      ref="publicTable3"
      :tableHeadTitles="attrList3"
      :tableData="dataSource3"
      :isDisplayAction="true"
      :loading="loading3"
      :isNeedSelection="true"
      :pagination="paginationData3"
      :configData="configData3"
      @tablePageChange="tablePageChange3"
      @handle-selection-change="getSelectData3"
    >
      <template #firstName="{ editor }">
        <n-input v-model="editor.row.firstName">测试2</n-input>
      </template>
      <template #editor="{ editor }">
        <n-button type="text" @click="test3(editor)">测试</n-button>
      </template>
      <template #empty>
        <span>暂无数据</span>
      </template>
    </n-public-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const publicTable3 = ref();
    const loading3 = ref(false);
    const test3 = (editor) => {
      console.log(editor);
    };
    const paginationData3 = ref({
      pageSizes: [2, 4, 48],
      pageSize: 2,
    });

    const configData3 = ref({
      selectRow: [
        {
          id: 1,
          firstName: 'Mark',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          id: 5,
          firstName: 'Mark',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
      ],
    });
    const allData = [
      {
        id: 1,
        firstName: 'Mark33333',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 2,
        firstName: 'Jacob33333',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 3,
        firstName: 'ssadsa',
        lastName: 'fdfd',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 4,
        firstName: 'ewew',
        lastName: 'rtt',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        id: 5,
        firstName: 'ghgh',
        lastName: 'assa',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        id: 6,
        firstName: 'oioi',
        lastName: 'mnmn',
        gender: 'Female',
        date: '1990/01/12',
      },
    ];
    const dataSource3 = ref({
      list: [
        {
          id: 1,
          firstName: 'Mark33333',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          id: 2,
          firstName: 'Jacob33333',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        },
      ],
      pageNum: 1,
      pageSize: 2,
      total: 6,
    });
    const attrList3 = [
      {
        name: '对象名称',
        prop: 'firstName',
        slot: 'firstName',
        resizeable: true,
      },
      {
        name: '对象类型',
        prop: 'lastName',
      },
      {
        name: '创建人',
        prop: 'gender',
      },
      {
        name: '对象创建时间',
        prop: 'date',
      },
    ];
    const tablePageChange3 = (a, b) => {
      let starPos = (a.currentPage - 1) * a.pageSize;
      let endPos = a.currentPage * a.pageSize;
      let _currentPageData = allData.slice(starPos, endPos);
      dataSource3.value = {
        list: _currentPageData,
        pageNum: a.currentPage,
        pageSize: a.pageSize,
        total: 6,
      };
    };
    const getSelectData3 = (data, a) => {
      console.log(data);
      console.log(a);
    };
    const getCheckedRows = () => {
      let data = publicTable3.value?.getCheckedRows();
      console.log(data);
    };

    return {
      dataSource3,
      attrList3,
      test3,
      loading3,
      paginationData3,
      tablePageChange3,
      publicTable3,
      getSelectData3,
      configData3,
      getCheckedRows,
    };
  },
});
</script>

<style></style>
```

:::

### publicTable 参数

| 参数名          | 类型      | 默认值           | 说明                                                                                                                                                      |     |
| :-------------- | :-------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- |
| tableData       | `Boolean` | false            | table 数据,数据形式 `{list:[],pageNum:'',pageSize:'', total:''} `                                                                                         |     |
| striped         | `Boolean` | false            | 可选，是否显示斑马纹间隔                                                                                                                                  |     |
| borderType      | `String`  | ''               | 可选，表格边框类型，默认行边框；`bordered: 全边框；borderless: 无边框`                                                                                    |     |
| isDisplayAction | `Boolean` | false            | 可选，是否需要操作栏                                                                                                                                      |     |
| actionWidth     | `Number`  | 130              | 操作栏宽度，默认 130                                                                                                                                      |     |
| isNeedSelection | `Boolean` | false            | 可选，是否需要多选框度                                                                                                                                    |     |
| tableHeadTitles | `Array`   | []               | 必选，表头信息，slot 为列自定义插槽名，headerSlot 为列头自定义插槽名。格式:`[{name: '标题',prop: 'name',slot: 'nameSlot',headerSlot: 'headerNameSlot'}] ` |     |
| pagination      | `Object`  | {}               | 可选，分页器信息，内部默认设置为 `{ pageSizes: [12, 24, 48], layout: 'total,pager,sizes,jumper', currentPage: 1, pageSize: 12, maxItems: 5,size: 'sm'}`   |     |
| tableHeight     | `Number`  | 400              | 可选，表格高度                                                                                                                                            |     |
| maxHeight       | `Number`  | null             | 可选，表格最大高度--流体高度                                                                                                                              |     |
| showPagination  | `Boolean` | true             | 可选，是否显示页码                                                                                                                                        |     |
| rowKey          | `String`  | 'id'             | 可选，行数据的唯一表示字段名                                                                                                                              |     |
| editDisabled    | `Boolean` | true             | 可选，编辑回显时，禁止编辑已存在数据景                                                                                                                    |     |
| emptyText       | `String`  | '暂无数据'       | 可选，空数据文案                                                                                                                                          |     |
| loading         | `Boolean` | false            | 可选， loading 状态                                                                                                                                       |     |
| configData      | `Object`  | `{selectRow:[]}` | 可选，configData.selectRow(数组) 为回显需要勾选中的数据                                                                                                   |     |
| fixHeader       | `Boolean` | true             | 可选，是否固定表头本                                                                                                                                      |     |
|                 |

### Table 事件

| 事件名                  | 回调参数                      | 说明                                                  |
| :---------------------- | :---------------------------- | :---------------------------------------------------- |
|                         |
| cell-click              | `Function(obj: CellClickArg)` | 单元格点击事件，返回单元格信息                        |
| row-click               | `Function(obj: RowClickArg)`  | 某一行被点击时触发该事件，返回该行信息                |
| handle-selection-change | `Function( selection, row)`   | 勾选表格行回调事件，返回表格所有选中行数据和该行信息  |
| tablePageChange         | `Function(data)`              | 分页器变化返回的数据{ currentPage: '',pageSize: ''}。 |
| headerIconClickFn       | `Function()`                  | 表格头部图标点击事件                                  |
