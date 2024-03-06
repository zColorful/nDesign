# Status 状态

传达交互结果的组件。

#### 何时使用

表示一个任务的执行结果时使用。

### 基本用法

:::demo

```vue
<template>
  <n-status>Default</n-status>
  <n-status type="success">Success</n-status>
  <n-status type="error">Error</n-status>
  <n-status type="warning">Warning</n-status>
  <n-status type="initial">Initial</n-status>
  <n-status type="waiting">Waiting</n-status>
  <n-status type="running">Running</n-status>
  <n-status type="invalid">Invalid</n-status>
</template>
```

:::

### Status 参数

| 参数 |            类型             |   默认    |    说明    |
| :--: | :-------------------------: | :-------: | :--------: |
| type | [IStatusType](#istatustype) | 'invalid' | 可选，类型 |

### Status 类型定义

#### IStatusType

```ts
type IStatusType = 'success' | 'error' | 'initial' | 'warning' | 'waiting' | 'running' | 'invalid';
```
