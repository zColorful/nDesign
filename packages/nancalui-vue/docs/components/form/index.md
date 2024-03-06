# Form 表单

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

#### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

:::demo 默认提供水平布局，`data`参数用于设置表单数据，label-width 用于设置 label 宽度，默认 auto，仅 layout 为 horizontal 水平排列支持。

```vue
<template>
  <n-form :data="formModel" ref="formRefOne" labelSuffix="：" label-width="120px" message-type="text">
    <n-form-item field="name" label="Name" help-tips="This is the plan name." extra-info="Enter a short name that meets reading habits.">
      <n-input v-model="formModel.name" />
    </n-form-item>
    <n-form-item field="description" label="Description">
      <n-textarea v-model="formModel.description" />
    </n-form-item>
    <n-form-item field="select" label="Select" :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
      <n-select v-model="formModel.select">
        <n-option v-for="(item, index) in options.data" :key="item.value" :value="item.value" :name="item.name"></n-option
      ></n-select>
    </n-form-item>
    <n-form-item field="radio" label="Radio">
      <n-radio-group direction="row" v-model="formModel.radio">
        <n-radio value="0">Manual execution</n-radio>
        <n-radio value="1">Daily execution</n-radio>
        <n-radio value="2">Weekly execution</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item field="switch" label="Switch">
      <n-switch v-model="formModel.switch"></n-switch>
    </n-form-item>
    <n-form-item field="executionDay" label="Execution day">
      <template #label> test for custom label </template>
      <n-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <n-checkbox label="Mon" value="Mon" />
        <n-checkbox label="Tue" value="Tue" />
        <n-checkbox label="Wed" value="Wed" />
        <n-checkbox label="Thur" value="Thur" />
        <n-checkbox label="Fri" value="Fri" />
        <n-checkbox label="Sat" value="Sat" />
        <n-checkbox label="Sun" value="Sun" />
      </n-checkbox-group>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button variant="solid" @click="onSubmit">提交</n-button>
      <n-button>取消</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref, nextTick, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    // const formRefOne = ref(null);
    let formModel = reactive({
      name: '',
      description: '',
      select: 0,
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const options = reactive({
      data: items,
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    function onSubmit() {
      proxy.$refs['formRefOne'].validate((isValid, invalidFields) => {
        console.log(isValid);
        console.log(invalidFields);
      });
    }
    return {
      formModel,
      selectOptions,
      onSubmit,
      options,
    };
  },
});
</script>

<style>
.form-demo-form-operation > * {
  margin-right: 8px;
}
</style>
```

:::

### 表单样式

:::demo 水平排列模式下，`label-size`可以设置`label`的宽度，提供`sm`、`md`、`lg`三种大小，分别对应`80px`、`100px`、`150px`，默认为`md`；`label-align`可以设置`label`的对齐方式，可选值为`start`、`center`、`end`，默认为`start`。

```vue
<template>
  <div class="form-btn-groups">
    <div class="form-btn">
      大小：
      <n-radio-group direction="row" v-model="size">
        <n-radio v-for="item in sizeList" :key="item.label" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </div>
    <div class="form-btn">
      对齐方式：
      <n-radio-group direction="row" v-model="align">
        <n-radio v-for="item in alignList" :key="item.label" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </div>
  </div>
  <n-form :data="formModel" :label-size="size" :label-align="align">
    <n-form-item field="name" label="Name">
      <n-input v-model="formModel.name" />
    </n-form-item>
    <n-form-item field="description" label="Description">
      <n-textarea v-model="formModel.description" />
    </n-form-item>
    <n-form-item field="executionDay" label="Execution day">
      <n-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <n-checkbox label="Mon" value="Mon" />
        <n-checkbox label="Tue" value="Tue" />
        <n-checkbox label="Wed" value="Wed" />
        <n-checkbox label="Thur" value="Thur" />
        <n-checkbox label="Fri" value="Fri" />
        <n-checkbox label="Sat" value="Sat" />
        <n-checkbox label="Sun" value="Sun" />
      </n-checkbox-group>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button variant="solid">提交</n-button>
      <n-button>取消</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
    });
    const size = ref('md');
    const align = ref('start');
    const sizeList = [
      {
        label: 'Small',
        value: 'sm',
      },
      {
        label: 'Middle',
        value: 'md',
      },
      {
        label: 'Large',
        value: 'lg',
      },
    ];
    const alignList = [
      {
        label: 'Start',
        value: 'start',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'End',
        value: 'end',
      },
    ];

    return {
      formModel,
      size,
      sizeList,
      align,
      alignList,
    };
  },
});
</script>

<style>
.form-btn-groups {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.form-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
}
</style>
```

:::

### 垂直排列

:::demo 设置`layout`参数为`vertical`可启用垂直布局，即`label`在输入控件的上方。

```vue
<template>
  <n-form layout="vertical" :data="formModel">
    <n-form-item field="name" label="Name">
      <n-input v-model="formModel.name" />
    </n-form-item>
    <n-form-item field="description" label="Description">
      <n-textarea v-model="formModel.description" />
    </n-form-item>
    <n-form-item field="select" label="Select">
      <n-select v-model="formModel.select" :options="selectOptions" />
    </n-form-item>
    <n-form-item field="radio" label="Radio">
      <n-radio-group direction="row" v-model="formModel.radio">
        <n-radio value="0">Manual execution</n-radio>
        <n-radio value="1">Daily execution</n-radio>
        <n-radio value="2">Weekly execution</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item field="switch" label="Switch">
      <n-switch v-model="formModel.switch"></n-switch>
    </n-form-item>
    <n-form-item field="executionDay" label="Execution day">
      <n-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <n-checkbox label="Mon" value="Mon" />
        <n-checkbox label="Tue" value="Tue" />
        <n-checkbox label="Wed" value="Wed" />
        <n-checkbox label="Thur" value="Thur" />
        <n-checkbox label="Fri" value="Fri" />
        <n-checkbox label="Sat" value="Sat" />
        <n-checkbox label="Sun" value="Sun" />
      </n-checkbox-group>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button variant="solid">提交</n-button>
      <n-button>取消</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';

export default defineComponent({
  setup() {
    let formModel = reactive({
      name: '',
      description: '',
      select: 'Options2',
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);

    return {
      formModel,
      selectOptions,
    };
  },
});
</script>
```

:::

### 多列表单

:::demo 搭配`Grid`栅格布局方案，即可方便的实现多列表单布局效果。

```vue
<template>
  <n-form layout="vertical" :data="formModel">
    <n-row :gutter="16">
      <n-col :span="7">
        <n-form-item field="name" label="Name" help-tips="This is the plan name.">
          <n-input v-model="formModel.name" />
        </n-form-item>
      </n-col>
      <n-col :span="7">
        <n-form-item field="select" label="Select">
          <n-select v-model="formModel.select" :options="selectOptions" />
        </n-form-item>
      </n-col>
      <n-col :span="7">
        <n-form-item field="multiSelect" label="Multiple Select">
          <n-select v-model="formModel.multiSelect" :options="selectOptions" multiple />
        </n-form-item>
      </n-col>
    </n-row>
    <n-row :gutter="16">
      <n-col :span="7">
        <n-form-item field="executionDay" label="Execution day">
          <n-checkbox-group v-model="formModel.executionDay" label="Execution day">
            <n-checkbox label="Mon" value="Mon" />
            <n-checkbox label="Tue" value="Tue" />
            <n-checkbox label="Wed" value="Wed" />
            <n-checkbox label="Thur" value="Thur" />
            <n-checkbox label="Fri" value="Fri" />
            <n-checkbox label="Sat" value="Sat" />
            <n-checkbox label="Sun" value="Sun" />
          </n-checkbox-group>
        </n-form-item>
      </n-col>
      <n-col :span="7">
        <n-form-item field="radio" label="Radio">
          <n-radio-group direction="row" v-model="formModel.radio">
            <n-radio value="0">Manual execution</n-radio>
            <n-radio value="1">Daily execution</n-radio>
            <n-radio value="2">Weekly execution</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-col>
      <n-col :span="7">
        <n-form-item field="switch" label="Switch">
          <n-switch v-model="formModel.switch"></n-switch>
        </n-form-item>
      </n-col>
    </n-row>
    <n-form-operation class="form-demo-form-operation">
      <n-button variant="solid">提交</n-button>
      <n-button>取消</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const formModel = reactive({
      name: '',
      select: 'Options2',
      multiSelect: ref([]),
      executionDay: [],
      radio: '0',
      switch: true,
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);

    return { formModel, selectOptions };
  },
});
</script>
```

:::

### 尺寸控制

:::demo 通过`size`属性可控制所有控件的尺寸。

```vue
<template>
  <n-form :data="formModel" disabled size="sm">
    <n-form-item field="name" label="Name" help-tips="This is the plan name." extra-info="Enter a short name that meets reading habits.">
      <n-input v-model="formModel.name" />
    </n-form-item>
    <n-form-item field="description" label="Description">
      <n-textarea v-model="formModel.description" />
    </n-form-item>
    <n-form-item field="select" label="Select">
      <n-select v-model="formModel.select" :options="selectOptions" />
    </n-form-item>
    <n-form-item field="autoComplete" label="AutoComplete">
      <n-auto-complete :source="source" v-model="formModel.autoComplete"></n-auto-complete>
    </n-form-item>
    <n-form-item field="radio" label="Radio">
      <n-radio-group direction="row" v-model="formModel.radio">
        <n-radio value="0">Manual execution</n-radio>
        <n-radio value="1">Daily execution</n-radio>
        <n-radio value="2">Weekly execution</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item field="switch" label="Switch">
      <n-switch v-model="formModel.switch"></n-switch>
    </n-form-item>
    <n-form-item field="executionDay" label="Execution day">
      <n-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <n-checkbox label="Mon" value="Mon" />
        <n-checkbox label="Tue" value="Tue" />
        <n-checkbox label="Wed" value="Wed" />
        <n-checkbox label="Thur" value="Thur" />
        <n-checkbox label="Fri" value="Fri" />
        <n-checkbox label="Sat" value="Sat" />
        <n-checkbox label="Sun" value="Sun" />
      </n-checkbox-group>
    </n-form-item>
    <n-form-item field="datePickerPro" label="Date Picker Pro">
      <n-date-picker-pro v-model="formModel.datePickerPro"></n-date-picker-pro>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button variant="solid">提交</n-button>
      <n-button>取消</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';

export default defineComponent({
  setup() {
    let formModel = reactive({
      name: '',
      description: '',
      select: '',
      autoComplete: '',
      radio: '0',
      switch: true,
      executionDay: [],
      datePickerPro: '',
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);
    return {
      formModel,
      source,
      selectOptions,
    };
  },
});
</script>

<style>
.form-demo-form-operation > * {
  margin-right: 8px;
}
</style>
```

:::

### 表单校验

:::demo

```vue
<template>
  <n-form ref="formRef" layout="vertical" :data="formData" :rules="rules" :pop-position="['right']">
    <!-- <n-form-item
      :field="['user', 'username']"
      :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur' }]"
      :show-feedback="false"
      label="用户名"
    >
      <n-input v-model="formData.user.username" />
    </n-form-item> -->
    <n-form-item field="userInfo" label="用户信息">
      <n-textarea v-model="formData.userInfo"></n-textarea>
    </n-form-item>
    <n-form-item field="age" label="年龄">
      <n-input v-model="formData.age" />
    </n-form-item>
    <n-form-item field="select" label="Select">
      <n-select v-model="formData.select" allow-clear>
        <n-option v-for="(item, index) in options.data" :key="index" :value="item.value" :name="item.name"></n-option>
      </n-select>
    </n-form-item>
    <n-form-item field="select" label="Select">
      <n-select v-model="formData.select1" allow-clear>
        <n-option v-for="(item, index) in options.data1" :key="index" :value="item.value" :name="item.name"></n-option>
      </n-select>
    </n-form-item>
    <n-form-item field="autoComplete" label="AutoComplete">
      <n-auto-complete :source="source" v-model="formData.autoComplete"></n-auto-complete>
    </n-form-item>
    <n-form-item field="radio" label="Radio">
      <n-radio-group direction="row" v-model="formData.radio">
        <n-radio value="0">Manual execution</n-radio>
        <n-radio value="1">Daily execution</n-radio>
        <n-radio value="2">Weekly execution</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item field="executionDay" label="Execution day">
      <n-checkbox-group v-model="formData.executionDay" label="Execution day" direction="row">
        <n-checkbox label="Mon" value="Mon" />
        <n-checkbox label="Tue" value="Tue" />
        <n-checkbox label="Wed" value="Wed" />
        <n-checkbox label="Thur" value="Thur" />
        <n-checkbox label="Fri" value="Fri" />
        <n-checkbox label="Sat" value="Sat" />
        <n-checkbox label="Sun" value="Sun" />
      </n-checkbox-group>
    </n-form-item>
    <n-form-item field="datePickerPro" label="Date Picker Pro">
      <n-date-picker-pro v-model="formData.datePickerPro"></n-date-picker-pro>
    </n-form-item>
    <n-form-item field="rangeDatePickerPro" label="Range Date Picker Pro">
      <n-range-date-picker-pro v-model="formData.rangeDatePickerPro"></n-range-date-picker-pro>
    </n-form-item>
    <n-form-item field="timePicker" label="time Picker">
      <n-time-picker v-model="formData.timePicker" placeholder="请选择时间" />
    </n-form-item>

    <n-form-operation class="form-operation-wrap">
      <n-button variant="solid" @click="onClick">提交</n-button>
      <n-button @click="onClear">清除校验结果</n-button>
      <n-button @click="onReset">重置</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const formData = reactive({
      user: {
        username: '',
      },
      userInfo: '',
      age: '',
      select: '',
      select1: '',
      autoComplete: '',
      executionDay: ['Tue'],
      radio: '',
      datePickerPro: '',
      rangeDatePickerPro: ['', ''],
      timePicker: '',
    });
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const options = reactive({
      data: items,
      data1: items,
    });

    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (value < 18) {
          return callback(new Error('年龄不能小于18'));
        } else {
          callback();
        }
      }, 1000);
    };

    const checkRangeDatePickerPro = (rule, value, callback) => {
      console.log(value);
      if (!value || (!value[0] && !value[1])) {
        console.log(1);
        return callback(new Error('请选择日期范围'));
      } else if (!value[0]) {
        console.log(2);
        return callback(new Error('请选择开始日期'));
      } else if (!value[1]) {
        console.log(3);
        return callback(new Error('请选择结束日期'));
      } else {
        return callback();
      }
    };

    const rules = {
      username: [{ min: 3, max: 6, message: '用户名需不小于3个字符，不大于6个字符', trigger: 'change' }],
      userInfo: [{ required: true, message: '用户信息不能为空', trigger: 'blur' }],
      age: [{ validator: checkAge }],
      select: [{ required: true, message: '请选择', trigger: 'change' }],
      autoComplete: [{ required: true, message: '请选择', trigger: 'change' }],
      executionDay: [{ type: 'array', required: true, message: '请至少选择一个执行时间', trigger: 'change' }],
      radio: [{ required: true, message: '请选择', trigger: 'change' }],
      datePickerPro: [{ required: true, message: '请选择日期', trigger: 'change', type: 'object' }],
      rangeDatePickerPro: [
        { validator: checkRangeDatePickerPro },
        { required: true, message: '请选择日期范围', trigger: 'change', type: 'array' },
      ],
      timePicker: [{ required: true, message: '请选择', trigger: 'change' }],
    };

    const onClick = () => {
      formRef.value.validate((isValid, invalidFields) => {
        console.log(isValid);
        console.log(invalidFields);
      });
    };

    const onClear = () => {
      formRef.value.clearValidate();
    };

    const onReset = () => {
      formRef.value.resetFields();
    };

    return { formRef, formData, selectOptions, source, rules, onClick, onClear, onReset, options };
  },
});
</script>

<style>
.form-operation-wrap > * {
  margin-right: 8px;
}
</style>
```

:::

### Form 参数

| 参数名                  | 类型                        | 默认值             | 说明                                                                   | 跳转 demo             |
| :---------------------- | :-------------------------- | :----------------- | :--------------------------------------------------------------------- | :-------------------- |
| data                    | `object`                    | {}                 | 必选，表单数据                                                         | [基础用法](#基础用法) |
| layout                  | [Layout](#layout)           | 'horizontal'       | 可选，设置表单的排列方式                                               | [垂直排列](#垂直排列) |
| label-width             | `string`                    | 'auto'             | 用于设置 label 宽度，默认 auto，仅 layout 为 horizontal 水平排列支持。 |                       |
| label-size              | [LabelSize](#labelsize)     | 'md'               | 可选，设置 label 的宽度，默认为 100px，sm 对应 80px，lg 对应 150px     | [表单样式](#表单样式) |
| label-align             | [LabelAlign](#labelalign)   | 'start'            | 可选，设置水平布局方式下，label 对齐方式                               | [表单样式](#表单样式) |
| rules                   | [FormRules](#formrules)     | --                 | 可选，设置表单的校验规则                                               | [表单校验](#表单校验) |
| message-type            | [MessageType](#messagetype) | 'popover'          | 可选，设置校验信息的提示方式                                           |                       |
| pop-position            | [PopPosition](#popposition) | ['right','bottom'] | 可选，消息显示为 popover 时，popover 弹出方向                          |                       |
| validate-on-rule-change | `boolean`                   | false              | 可选，是否在 rules 改变后立即触发一次验证                              |                       |
| show-feedback           | `boolean`                   | false              | 可选，是否展示校验结果反馈图标                                         |                       |
| disabled                | `boolean`                   | false              | 可选，是否禁用该表单内的所有组件。                                     |                       |
| size                    | [FormSize](#formsize)       | --                 | 可选，用于控制该表单内组件的尺寸                                       |                       |

### Form 事件

| 事件名   | 回调参数                                                             | 说明               |
| :------- | :------------------------------------------------------------------- | :----------------- |
| validate | `Function(field: string, isValid: boolean, message: string) => void` | 表单项被校验后触发 |

### Form 方法

| 方法名         | 类型                                                             | 说明                                                      | 跳转 Demo             |
| :------------- | :--------------------------------------------------------------- | :-------------------------------------------------------- | :-------------------- |
| validate       | `(callback?: FormValidateCallback) => Promise`                   | 表单校验函数                                              | [表单校验](#表单校验) |
| validateFields | `(fields: string[], callback?: FormValidateCallback) => Promise` | 校验指定字段                                              |                       |
| resetFields    | `(fields: string[]) => void`                                     | 重置表单项的值，并移除校验结果                            |                       |
| clearValidate  | `(fields: string[]) => void`                                     | 清除校验结果，参数为需要清除的表单项`field`，默认清除全部 |                       |

### Form 插槽

| 插槽名  | 说明             |
| :------ | :--------------- |
| default | 包裹整个表单内容 |

### FormItem 参数

| 参数名          | 类型                                            | 默认值 | 说明                                                                       | 跳转 demo             |
| :-------------- | :---------------------------------------------- | :----- | :------------------------------------------------------------------------- | :-------------------- |
| field           | `string\|array`                                 | ''     | 可选，指定验证表单需验证的字段，验证表单时必选该属性                       | [基础用法](#基础用法) |
| required        | `boolean`                                       | false  | 可选，表单选项是否必填                                                     |                       |
| rules           | [FormRuleItem \| FormRuleItem[]](#formruleitem) | --     | 可选，表单项的校验规则                                                     | [表单校验](#表单校验) |
| message-type    | [MessageType](#messagetype)                     | --     | 可选，用法同父组件`message-type`参数，优先级高于父组件，默认继承父组件的值 |                       |
| pop-position    | [PopPosition](#popposition)                     | --     | 可选，用法同父组件`pop-position`参数，优先级高于父组件，默认继承父组件的值 |                       |
| show-feedback   | `boolean`                                       | --     | 可选，是否展示校验结果反馈图标，优先级高于父组件，默认继承父组件的值       |                       |
| help-tips       | `string`                                        | ''     | 可选，表单项帮助指引提示内容，空字符串表示不设置提示内容。                 | [基础用法](#基础用法) |
| extra-info      | `string`                                        | ''     | 可选，附件信息，一般用于补充表单选项的说明                                 | [基础用法](#基础用法) |
| feedback-status | [FeedbackStatus](#feedbackstatus)               | --     | 可选，手动指定当前 control 状态反馈                                        |                       |

### FormItem 方法

| 方法名        | 类型         | 说明                           |
| :------------ | :----------- | :----------------------------- |
| resetField    | `() => void` | 重置表单项的值，并移除校验结果 |
| clearValidate | `() => void` | 清除校验结果                   |

### FormItem 插槽

| 插槽名  | 说明                     |
| :------ | :----------------------- |
| default | 包裹单个表单项的输入控件 |

### Form 类型定义

#### Layout

```ts
type Layout = 'horizontal' | 'vertical';
```

#### LabelSize

```ts
type LabelSize = 'sm' | 'md' | 'lg';
```

#### LabelAlign

```ts
type LabelAlign = 'start' | 'center' | 'end';
```

#### FormRules

```ts
type FormRules = Partial<Record<string, Array<FormRuleItem>>>;
```

#### MessageType

```ts
type MessageType = 'popover' | 'text' | 'none';
```

#### PopPosition

```ts
type PopPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

#### FormSize

```ts
type FormSize = 'sm' | 'md' | 'lg';
```

#### FormValidateCallback

`ValidateFieldsError`类型参考[async-validator](https://github.com/yiminghe/async-validator)。

```ts
type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;
```

### FormItem 类型定义

#### FormRuleItem

`RuleItem`类型参考[async-validator](https://github.com/yiminghe/async-validator)。

```ts
interface FormRuleItem extends RuleItem {
  trigger?: Array<string>;
}
```

#### FeedbackStatus

```ts
type FeedbackStatus = 'success' | 'error' | 'pending';
```
