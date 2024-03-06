# Comment

A comment displays user feedback and discussion to website content.

### When To Use

Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.

### Basic Usage

:::demo

```vue
<template>
  <n-comment>
    <template v-slot:actions>
      <p>MyAvatar</p>
    </template>
    <template v-slot:author>MyAvatar</template>
    <template v-slot:avatar>
      <n-avatar name="MyAvatar"></n-avatar>
    </template>
    <template v-slot:content>
      <p>Used to discuss things, such as pages, blog posts, questions, etc.</p>
    </template>
    <template v-slot:datetime>20:36</template>
  </n-comment>
</template>
```

:::

<style>

</style>

### API

n-comment
| Parameter | Type | Default | Description |
| :------: | :--: | :--: | :---------------------------------------------- |
| actions | - | - | - |
| author | - | - | The element to display as the comment author |
| avatar | - | - | The element to display as the comment avatar - generally an antd Avatar |
| content | - | - | The main content of the comment |
| datetime | - | - | A datetime element containing the time to be displayed |
