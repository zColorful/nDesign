# RippleDirective

<span color="#409EFF">`v-ripple`</span>The v-ripple directive is used to show action from a user. It can be applied to any block level element.<span color="#409EFF">`tips: It can be applied to any block level element.`</span>

### When to Use

:::demo User can be use Basic ripple functionality can be enabled just by using v-ripple directive on a component or an HTML element <span color="#409EFF">`v-ripple`</span>Basic ripple functionality <span color="#409EFF">`v-ripple`</span> Directive `v-ripple` Accept an object

```vue
<template>
  <n-row :gutter="50">
    <n-col :span="12">
      <div class="ripple-button">
        <div class="ripple-htmlElement" v-ripple="{ color: '#447DFD', duration: 300 }">HTML element with v-ripple</div>
      </div>
    </n-col>
    <n-col :span="12">
      <div class="ripple-button">
        <div class="ripple-htmlElement" v-ripple="{ duration: 800 }">HTML element with v-ripple</div>
      </div>
    </n-col>
  </n-row>
</template>
<style scoped>
.ripple-button {
  display: flex;
}
</style>
```

:::

### Custom color

### Change the ripple color dynamically by changing the text color or the ripple color

:::demo

```vue
<template>
  <n-row>
    <n-col :span="12">
      <ul>
        <li
          v-for="item in [
            { color: '#409EFF', text: 'Item with Primary ripple' },
            { color: '#67C23A', text: 'Item with Success ripple' },
            { color: '#E6A23C', text: 'Item with Warning ripple' },
            { color: '#F56C6C', text: 'Item with Danger ripple' },
            { color: '#909399', text: 'Item with Info ripple' },
          ]"
          :style="{ color: item.color }"
        >
          <div class="ripple-changeTextColor" v-ripple="{ duration: 300 }">
            {{ item.text }}
          </div>
        </li>
      </ul>
    </n-col>
    <n-col :span="12">
      <ul>
        <li
          v-for="(item, index) in [
            { color: '#409EFF', text: 'Item with Primary ripple' },
            { color: '#67C23A', text: 'Item with Success ripple' },
            { color: '#E6A23C', text: 'Item with Warning ripple' },
            { color: '#F56C6C', text: 'Item with Danger ripple' },
            { color: '#909399', text: 'Item with Info ripple' },
          ]"
          :style="{ color: item.color }"
        >
          <div class="ripple-changeTextColor" v-ripple="{ duration: 300, color: `${item.color.slice(0, 4)}` }">
            {{ item.text }}
          </div>
        </li>
      </ul>
    </n-col>
  </n-row>
</template>
```

:::

### Ripple in components

### Some components provide the ripple prop that allows you to control the ripple effect.

Button Component

:::demo

```vue
<template>
  <n-row>
    <n-col :span="6">
      <n-button v-ripple="{ duration: 300 }" variant="text" style="margin-right: 20px">Text</n-button>
    </n-col>
    <n-col :span="6">
      <n-button v-ripple="{ duration: 300 }" variant="text-dark" style="margin-right: 20px">Text dark</n-button>
    </n-col>
    <n-col :span="6">
      <n-button v-ripple="{ duration: 300 }" icon="add" variant="text-dark" title="add"></n-button>
    </n-col>
    <n-col :span="6">
      <n-button v-ripple="{ duration: 300 }" icon="delete" variant="text-dark" title="delete"></n-button>
    </n-col>
  </n-row>
</template>
```

:::

Card Component

:::demo

```vue
<template>
  <n-card v-ripple="{ duration: 300 }" class="n-card" :src="'https://devui.design/components/assets/image1.png'">
    <template #cardAvatar>
      <n-avatar name="nancalui"></n-avatar>
    </template>
    <template #cardTitle> nancalui Course </template>
    <template #cardSubtitle class="icon"> <n-icon name="company-member"></n-icon><span>nancalui</span> </template>
    <template #cardContent>
      nancalui is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are
      basedon...
    </template>
    <template #cardActions>
      <div class="card-block"><n-icon name="like"></n-icon><span>12</span></div>
      <div class="card-block"><n-icon name="star-o"></n-icon><span>8</span></div>
      <div class="card-block"><n-icon name="message"></n-icon><span>8</span></div>
    </template>
  </n-card>
</template>
<style lang="scss">
.card-block {
  margin-right: 16px;
  i {
    cursor: pointer;
    font-size: 16px;
    vertical-align: middle;
  }
  i + span {
    vertical-align: middle;
  }
}
.n-card {
  cursor: pointer;
  transition: box-shadow 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
}
.card-container {
  width: 350px;
}
img {
  max-width: none;
}
.action-text {
  color: #8a8e99;
}
</style>
```

:::

<style>
.ripple-htmlElement {
    width: 600px;
    height: 150px; 
    text-align: center; 
    line-height: 150px;
    border: 1px solid #eee50;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
    user-select: none;
}
.ripple-changeTextColor {
    display: block;
    padding: 20px;
    user-select: none;
}
</style>

### API

|    parameter    |   type    |   default   |                                   introduce                                   |
| :-------------: | :-------: | :---------: | :---------------------------------------------------------------------------: |
|      color      | `string`  | `#00000050` |                       Choose Default current text color                       |
| initial-opacity | `number`  |    `0.1`    |                    Choose Initial interaction Opacity size                    |
|  final-opacity  | `number`  |    `0.1`    | Choose, end the interactive effect and press the Opacity size for a long time |
|    duration     | `number`  |    `400`    |                               Choose, duration                                |
|     easing      | `string`  | `ease-out`  |                           Choose, animation easing                            |
|      delay      | `number`  |    `75`     |           Choose, slow animation is delayed after debouceTime time.           |
|    disabled     | `boolean` |   `false`   |                        Choose, disabled ripple effect                         |
