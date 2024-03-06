# CardList 卡片列表组件

卡片列表组件

#### 如何使用

当用户需要展示卡片的列表时,卡片列表组件是绝对定位的，需要父元素设置相对定位，且固定好宽度和高度。

### 数据源管理

:::demo

```vue
<template>
  <div class="card-list-demo">
    <n-card-list :cardType="1" :data="data" :page="pageInfo" @cardSizeChange="cardSizeChange"></n-card-list>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const pageInfo = ref({
      size: 'sm',
      total: 1,
      pageSize: 12,
      pageIndex: 1,
      pageSizeOptions: [12, 24, 48], // 每次展示条数的可配置项
    });

    const data = reactive([
      {
        cardTitle: '数据库管理',
        cardDate: '2023-02-01 15:30:24',
        cardUser: '系统管理员',
        cardLogo: 'http://139.9.159.225:9006/static/css/MYSQL-b7481da6.png',
        cardStatus: 1,
        noCardContent: false,
        cardContentTitle: false,
        cardContentLabel: [
          { name: '实例名称', value: 'lyjtest', type: 1 },
          { name: '数据库类型', value: 'MYSQL', type: 1 },
        ],
        cardOperation: '125',
        showMore: false,
      },
    ]);

    const cardSizeChange = (e) => {
      console.log(e);
    };

    return {
      pageInfo,
      data,
      cardSizeChange,
    };
  },
});
</script>

<style scoped lang="scss">
.card-list-demo {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 360px;
  background-color: #f7f8fa;
  .cardList {
    top: 10px;
  }
}
</style>
```

:::

### 数据开发/采集

:::demo

```vue
<template>
  <div class="card-list-demo2">
    <n-card-list :cardType="2" :data="data" @cardDevelopFn="cardDevelopFn"></n-card-list>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const data = reactive([
      {
        cardTitle: '工序计划采集',
        cardDate: '2023-02-01 15:30:24',
        cardUser: '系统管理员',
        cardStatus: 0,
        noCardContent: false,
        cardOperation: '345',
        cardMappingTitle: '映射关系',
        cardMappingLabel: [
          { name: '数据源类型', value: 'MYSQL', type: 1 },
          { name: '采集规则', value: '增量采集', type: 1 },
          { name: '数据源', value: 'MYSQL专用', type: 1 },
          { name: '数据表', value: 'table_name', type: 1 },
          { name: '数据模型', value: 'table_model', type: 1 },
        ],
        cardContentTitle: '调度策略',
        cardContentLabel: [
          { name: '执行时间', value: '2023-01-05 14:42:48', type: 1 },
          { name: '调度频次', value: ['每日', '14:23:45'], type: 2 },
        ],
        cardRerunTitle: '重跑机制',
        cardRerunLabel: [
          { name: '失败重试', value: ['1次'], type: 2 },
          { name: '重试间隔', value: ['5分'], type: 2 },
        ],
        cardOperationLabel: '数据开发',
        showMore: false,
      },
    ]);

    const cardDevelopFn = (item) => {
      console.log(item);
    };

    return {
      data,
      cardDevelopFn,
    };
  },
});
</script>

<style scoped lang="scss">
.card-list-demo2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 630px;
  background-color: #f7f8fa;
  .cardList {
    top: 10px;
  }
}
</style>
```

:::

### 数据质量

:::demo

```vue
<template>
  <div class="card-list-demo3">
    <n-card-list :cardType="3" :data="data"></n-card-list>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const data = reactive([
      {
        cardTitle: '质量任务',
        cardDate: '2023-02-01 15:30:24',
        cardUser: '系统管理员',
        cardLogo: 'http://139.9.159.225:9006/static/css/MYSQL-b7481da6.png',
        cardStatus: 3,
        noCardContent: false,
        cardOperation: '123',
        cardContentTitle: '调度策略',
        cardContentLabel: [
          { name: '执行时间', value: '2023-01-05 14:42:48', type: 1 },
          { name: '调度频次', value: ['每日', '14:23:45'], type: 2 },
        ],
        cardRulerTitle: '校验规则名',
        cardRulerLabel: [
          { name: '都为整数', type: 2 },
          { name: '都大于0', type: 2 },
          { name: '都小于100', type: 2 },
        ],
        showMore: false,
      },
    ]);

    return {
      data,
    };
  },
});
</script>

<style scoped lang="scss">
.card-list-demo3 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 410px;
  background-color: #f7f8fa;
  .cardList {
    top: 10px;
  }
}
</style>
```

:::

### 业务域

:::demo

```vue
<template>
  <div class="card-list-demo4">
    <n-card-list :cardType="4" :data="data" :noHeaderStatus="true"></n-card-list>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const data = reactive([
      {
        cardTitle: '业务域',
        cardDate: '2023-02-01 15:30:24',
        cardUser: '系统管理员',
        cardLogo: 'http://139.9.159.225:9006/static/css/MYSQL-b7481da6.png',
        cardStatus: 4,
        cardOperation: '145',
        description: '上午9:00操作',
        showMore: false,
      },
    ]);

    return {
      data,
    };
  },
});
</script>

<style scoped lang="scss">
.card-list-demo4 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 300px;
  background-color: #f7f8fa;
  .cardList {
    top: 10px;
  }
}
</style>
```

:::

### CardList 参数

| 参数名         | 类型    | 默认  | 说明                                               |
| :------------- | :------ | :---- | :------------------------------------------------- |
| cardType       | number  | 1     | 必选，1.数据源 2.数据开发/采集 3.数据质量 4.业务域 |
| data           | array   | []    | 必选，列表数据                                     |
| noHeaderStatus | boolean | false | 可选，不显示头部                                   |

### CardList 事件

| 事件名              | 回调参数           | 说明                                     |
| :------------------ | :----------------- | :--------------------------------------- |
| cardDispatchFn      | `Function(item)`   | 调度策略图标点击事件，返回选中的节点对象 |
| cardRerunFn         | `Function(item)`   | 重跑机制图标点击事件，返回选中的节点对象 |
| cardShowMoreRulerFn | `Function(item)`   | 校检规则图标点击事件，返回选中的节点对象 |
| cardDevelopFn       | `Function(item)`   | 数据开发按钮点击事件，返回点击的节点对象 |
| cardSendFn          | `Function(item)`   | 发布图标点击事件，返回点击的节点对象     |
| cardDelFn           | `Function(item)`   | 删除图标点击事件，返回点击的节点对象     |
| cardEditFn          | `Function(item)`   | 编辑图标点击事件，返回点击的节点对象     |
| cardOffFn           | `Function(item)`   | 下架图标点击事件，返回点击的节点对象     |
| cardSeeFn           | `Function(item)`   | 查看图标点击事件，返回点击的节点对象     |
| cardRunFn           | `Function(item)`   | 执行图标点击事件，返回点击的节点对象     |
| cardCurrentChange   | `Function(number)` | 分页页码改变事件，返回最新的分页页码     |
| onPageSizeChange    | `Function(number)` | 分页单页数量改变事件，返回最新的分页数量 |

### CardList data 定义

```ts
interface IDataNode {
  cardTitle: string; // 卡片头部名称
  cardDate: string; // 卡片创建日期
  cardUser: string; // 卡片创建角色名
  cardLogo: string; // 卡片右边角图片
  cardStatus: string; // 卡片右上角状态 0-已下架 1-已发布 3-审核中 4-审核失败
  cardOperation: string; // '123456',卡片更多操作 1：发布 2：删除 3：编辑 4：下架 5：查看 6:立即执行
  cardOperationLabel: string; // 卡片右下角按钮名称
  cardContentTitle: string; // 卡片内容部分名称
  cardContentLabel: Array; // 卡片内容数组type:1表示普通文字 2表示数组按钮文字[{name:'执行时间',value:'2023-01-05 14:42:48',type:1},{name:'调度规则',value:['每天','15:01'],type:2}]
  cardRerunTitle: string; // 卡片重跑机制名称
  cardRerunLabel: Array; // 同cardContentLabel
  cardRulerTitle: string; // 卡片校验规则名称
  cardRulerLabel: Array; // ['为空效验','大于1校检'] 卡片展示规则列表
  description: string; // 业务域描述信息
}
```
