# Status

Pass interaction results.

### When To Use

Indicates the execution result of a task.

### Basic Usage

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

### n-status parameter

| Parameter |                              Type                              |  Default  |                                      Description                                       |
| :-------: | :------------------------------------------------------------: | :-------: | :------------------------------------------------------------------------------------: |
|   type    | `success\|error\|warning\|initial\|waiting\|running\| invalid` | 'invalid' | Required. The value can be success、error、warning、initial、waiting、running、invalid |
