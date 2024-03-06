# Form

A form that supports data collection, verification, and submission, including check boxes, option boxes, text boxes, and drop-down list boxes.

### When to use

Used for data collection, data verification, and data submission.

### Basic usage

In basic usage, the label is above the data box.

:::demo

```vue
<template>
  <n-form ref="nFormBasic" :formData="formModel" layout="vertical" @submit="onSubmitForm">
    <n-form-item prop="name">
      <n-form-label required hasHelp helpTips="You can input name or username">Name</n-form-label>
      <n-form-control extraInfo="Input your name">
        <n-input v-model="formModel.name" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label>Age</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.age" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="city">
      <n-form-label>City</n-form-label>
      <n-form-control>
        <n-select v-model="formModel.city" :options="selectOptions" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="loveFruits">
      <n-form-label>Favorite Fruits</n-form-label>
      <n-form-control>
        <n-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="Input what fruits you like "
          no-data="No Data"
        ></n-tag-input>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="sex">
      <n-form-label>Sex</n-form-label>
      <n-form-control>
        <n-radio v-model="formModel.sex" value="0">Male</n-radio>
        <n-radio v-model="formModel.sex" value="1">Female</n-radio>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="workOn">
      <n-form-label>Did you get off work?</n-form-label>
      <n-form-control>
        <n-switch v-model="formModel.workOn"></n-switch>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="interestedDomain">
      <n-form-label>Interested Domain</n-form-label>
      <n-form-control>
        <n-checkbox-group v-model="formModel.interestedDomain" label="Interested Domain">
          <n-checkbox label="Frontend" value="frontend" />
          <n-checkbox label="Backend" value="backend" />
          <n-checkbox label="Mobileend" value="mobileend" />
          <n-checkbox label="AI" value="ai" />
          <n-checkbox label="Algorithm" value="algorithm" />
        </n-checkbox-group>
      </n-form-control>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormBasic = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: 'Shenzhen',
      loveFruits: [{ name: 'apple' }],
      suggestionList: [{ name: 'apple' }, { name: 'watermelon' }, { name: 'peach' }],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
    const resetForm = () => {
      console.log('formData reset before', nFormBasic.value.formData);
      nFormBasic.value.resetFormFields();
      console.log('formData reset after', nFormBasic.value.formData);
    };
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel);
    };
    return {
      nFormBasic,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Label horizontal arrangement

Left-right layout of labels.

:::demo

```vue
<template>
  <n-form ref="nFormHorizontal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
    <n-form-item prop="name">
      <n-form-label required>Name</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.name" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label>Age</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.age" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="city">
      <n-form-label>City</n-form-label>
      <n-form-control>
        <n-select v-model="formModel.city" :options="selectOptions" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="loveFruits">
      <n-form-label>Favorite Fruits</n-form-label>
      <n-form-control>
        <n-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="Input what fruits you like "
          no-data="No Data"
        ></n-tag-input>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="sex">
      <n-form-label>Sex</n-form-label>
      <n-form-control>
        <n-radio v-model="formModel.sex" value="0">Male</n-radio>
        <n-radio v-model="formModel.sex" value="1">Female</n-radio>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="workOn">
      <n-form-label>Did you get off work?</n-form-label>
      <n-form-control>
        <n-switch v-model="formModel.workOn"></n-switch>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="interestedDomain">
      <n-form-label>Interested Domain</n-form-label>
      <n-form-control>
        <n-checkbox-group v-model="formModel.interestedDomain" label="Interested Domain">
          <n-checkbox label="Frontend" value="frontend" />
          <n-checkbox label="Backend" value="backend" />
          <n-checkbox label="Mobileend" value="mobileend" />
          <n-checkbox label="AI" value="ai" />
          <n-checkbox label="Algorithm" value="algorithm" />
        </n-checkbox-group>
      </n-form-control>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-form-demo-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormHorizontal = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: 'Shenzhen',
      loveFruits: [{ name: 'apple' }],
      suggestionList: [{ name: 'apple' }, { name: 'watermelon' }, { name: 'peach' }],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
    const resetForm = () => {
      console.log('nFormHorizontal', nFormHorizontal.value);
      nFormHorizontal.value.resetFormFields();
    };
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel);
    };
    return {
      nFormHorizontal,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Pop-up form

> todo <br>
> To replace it with Modal component

Pop-up form. The recommended pop-up box size is 400px, 550px, 700px, and 900px. The recommended aspect ratio is 16:9 or 3:2.

:::demo

```vue
<template>
  <n-button @click="openModal">Open Modal</n-button>
  <div class="form-demo-modal" v-show="showModal" @click="closeModal">
    <div class="form-demo-modal-content">
      <n-form ref="nFormModal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
        <n-form-item prop="name">
          <n-form-label required>Name</n-form-label>
          <n-form-control>
            <n-input v-model="formModel.name" />
          </n-form-control>
        </n-form-item>
        <n-form-item prop="age">
          <n-form-label>Age</n-form-label>
          <n-form-control>
            <n-input v-model="formModel.age" />
          </n-form-control>
        </n-form-item>
        <n-form-item prop="city">
          <n-form-label>City</n-form-label>
          <n-form-control>
            <n-select v-model="formModel.city" :options="selectOptions" />
          </n-form-control>
        </n-form-item>
        <n-form-item prop="loveFruits">
          <n-form-label>Favorite Fruits</n-form-label>
          <n-form-control>
            <n-tag-input
              v-model:tags="formModel.loveFruits"
              v-model:suggestionList="formModel.suggestionList"
              display-property="name"
              placeholder="Input what fruits you like "
              no-data="No Data"
            ></n-tag-input>
          </n-form-control>
        </n-form-item>
        <n-form-item prop="sex">
          <n-form-label>Sex</n-form-label>
          <n-form-control>
            <n-radio v-model="formModel.sex" value="0">Male</n-radio>
            <n-radio v-model="formModel.sex" value="1">Female</n-radio>
          </n-form-control>
        </n-form-item>
        <n-form-item prop="workOn">
          <n-form-label>Did you get off work?</n-form-label>
          <n-form-control>
            <n-switch v-model="formModel.workOn"></n-switch>
          </n-form-control>
        </n-form-item>
        <n-form-item prop="interestedDomain">
          <n-form-label>Interested Domain</n-form-label>
          <n-form-control>
            <n-checkbox-group v-model="formModel.interestedDomain" label="Interested Domain">
              <n-checkbox label="Frontend" value="frontend" />
              <n-checkbox label="Backend" value="backend" />
              <n-checkbox label="Mobileend" value="mobileend" />
              <n-checkbox label="AI" value="ai" />
              <n-checkbox label="Algorithm" value="algorithm" />
            </n-checkbox-group>
          </n-form-control>
        </n-form-item>
        <n-form-operation class="form-demo-form-operation">
          <n-button type="submit" class="form-demo-form-demo-demo-btn">Submit</n-button>
          <n-button bsStyle="common" @click="resetForm">Reset</n-button>
        </n-form-operation>
      </n-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormModal = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: 'Shenzhen',
      loveFruits: [{ name: 'apple' }],
      suggestionList: [{ name: 'apple' }, { name: 'watermelon' }, { name: 'peach' }],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
    const resetForm = () => {
      console.log('nFormModal', nFormModal.value);
      nFormModal.value.resetFormFields();
    };
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel);
    };
    const showModal = ref(false);
    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    return {
      nFormModal,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm,
      showModal,
      openModal,
      closeModal,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}

.form-demo-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-demo-modal-content {
  background-color: #fff;
  width: 40vw;
  padding: 20px;
}
</style>
```

:::

### Multiple Lists

Multiple lists.The value of layout should be `columns` ，together with the columnsclass attribute, and the value should be "u - [row] - [column]".For example, 'u-1-3' is 1 row and 3 columns.

:::demo

```vue
<template>
  <n-form ref="nFormColumn" layout="columns" :formData="formModel" @submit="onSubmitForm">
    <n-form-item prop="name" v-for="item in 6" :key="item" class="column-item">
      <n-form-label required hasHelp>Name</n-form-label>
      <n-form-control>
        <n-input />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="loveFruits" class="column-item">
      <n-form-label>Favorite Fruits</n-form-label>
      <n-form-control>
        <n-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="Input what fruits you like "
          no-data="No Data"
        ></n-tag-input>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="sex" class="column-item">
      <n-form-label>Sex</n-form-label>
      <n-form-control>
        <n-radio v-model="formModel.sex" value="0">Male</n-radio>
        <n-radio v-model="formModel.sex" value="1">Female</n-radio>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="goOffWork" class="column-item">
      <n-form-label>Did you get off work?</n-form-label>
      <n-form-control>
        <n-switch v-model="formModel.workOn"></n-switch>
      </n-form-control>
    </n-form-item>
    <n-form-item prop="interestedDomain" class="column-item">
      <n-form-label>Interested Domain</n-form-label>
      <n-form-control>
        <n-checkbox-group v-model="formModel.interestedDomain" label="Interested Domain">
          <n-checkbox label="Frontend" value="frontend" />
          <n-checkbox label="Backend" value="backend" />
          <n-checkbox label="Mobileend" value="mobileend" />
          <n-checkbox label="AI" value="ai" />
          <n-checkbox label="Algorithm" value="algorithm" />
        </n-checkbox-group>
      </n-form-control>
    </n-form-item>

    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-form-demo-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormColumn = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: 'Shenzhen',
      loveFruits: [{ name: 'apple' }],
      suggestionList: [{ name: 'apple' }, { name: 'watermelon' }, { name: 'peach' }],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']);
    const resetForm = () => {
      console.log('nFormColumn', nFormColumn.value);
      nFormColumn.value.resetFormFields();
    };
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel);
    };
    return {
      nFormColumn,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Template driven form validation

Use the `v-n-validate-rules` derective on form components such as `n-form` and `n-input` to configure verification rules.

#### Verify a single element, use the built-in validator, and configure error message

The following built-in validators are currently supported by nancalui：`required`,`minlength`,`maxlength`,`min`,`max`,`requiredTrue`,`email`,`pattern`,`whitespace`.

- To limit user input to not all spaces, use the `whitespace`built-in validator
- Setting the maximum limit to the actual check value `+1` is a good way to limit the length of user input.
- In addition to pattern, other built-in validators also provide built-in error alerts, which are used by default when you do not customize them.

- The message configuration supports both string and object forms (supports internationalized term configurations such as `'zh-cn'`, which defaults to `'default'`).

:::demo

```vue
<template>
  <n-form ref="nFormTemplateValidate1" :formData="formModel" labelSize="lg">
    <n-form-item prop="username">
      <n-form-label required>Username</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.username"
          v-n-validate-rules="[
            {
              maxlength: 8,
            },
            {
              pattern: /^[a-zA-Z\d]+(\s+[a-zA-Z\d]+)*$/,
              message: {
                'zh-cn': '只能包含数字与大小写字符',
                'en-us': 'The value cannot contain characters except uppercase and lowercase letters.',
                default: 'The value cannot contain characters except uppercase and lowercase letters.',
              },
            },
          ]"
        />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate1 = ref(null);
    let formModel = reactive({
      username: 'AlanLee',
    });

    return {
      nFormTemplateValidate1,
      formModel,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Validate individual elements, customize validators

Custom validators, which pass in `validators` field configuration checking rules, can simply return `true | false ` to identify whether the current check passes, to identify whether the current error is present, and to return an error message, suitable for dynamic error prompts. If it is an asynchronous validator, you can pass in the `asyncValidators` field to configure the validation rules.

:::demo

```vue
<template>
  <n-form ref="nFormTemplateValidate2" :formData="formModel" labelSize="lg">
    <n-form-item prop="sum">
      <n-form-label>Calculate: 1 + 1 = ?</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.sum"
          v-n-validate-rules="{
            validators: [
              { message: 'Wrong!', validator: customValidator },
              { message: 'Right!', validator: customValidator2 },
            ],
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="asyncSum">
      <n-form-label>Calculate: 1 + 2 = ? (async)</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.asyncSum"
          v-n-validate-rules="{
            asyncValidators: [
              { message: 'Wrong! (async)', asyncValidator: customAsyncValidator },
              { message: 'Right! (async)', asyncValidator: customAsyncValidator2 },
            ],
          }"
        />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate2 = ref(null);
    let formModel = reactive({
      sum: '',
      asyncSum: '',
    });

    const customValidator = (rule, value) => {
      return value == '2';
    };
    const customValidator2 = (rule, value) => {
      return value != '2';
    };

    const customAsyncValidator = (rule, value) => {
      return value == '3';
    };
    const customAsyncValidator2 = (rule, value) => {
      return value != '3';
    };
    return {
      nFormTemplateValidate2,
      formModel,
      customValidator,
      customValidator2,
      customAsyncValidator,
      customAsyncValidator2,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Verify a single element. The update policy errorStrategy is incorrectly configured and the validation moment updateOn is incorrectly configured.

- Set whether the `errorStrategy` property is checked when it is initialized

  - Default configuration is `dirty`, check does not pass error prompt
  - If you need to throw an error at initialization, configure it as `pristine`

- Set `updateOn`, specify the time of the check
  - Checker `updateOn` based on the `updateOn` settings of the model you are binding, you can specify them through `options`, defaulting to `change`
  - Optional values are also `blur, ` `input`, `submit`
  - Set to `submit`, then the check will be triggered when the form in which the element resides submits

:::demo

```vue
<template>
  <n-form ref="nFormTemplateValidate3" :formData="formModel" labelSize="lg">
    <n-form-item prop="sum">
      <n-form-label>Calculate: 1 + 1 = ?</n-form-label>
      <n-form-control
        extraInfo="updateOn is change, and when the input is complete, the value of the input box changes, triggering the validation rule"
      >
        <n-input
          v-model="formModel.sum"
          v-n-validate-rules="{
            rules: {
              validators: [
                { message: 'Wrong!', validator: customValidator },
                { message: 'Right!', validator: customValidator2 },
              ],
            },
            options: {
              updateOn: 'change',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="asyncSum">
      <n-form-label>Calculate: 1 + 2 = ? (async)</n-form-label>
      <n-form-control
        extraInfo="updateOn is input, and the value of the input box changes while it is being entered, triggering the validation rule"
      >
        <n-input
          v-model="formModel.asyncSum"
          v-n-validate-rules="{
            rules: {
              asyncValidators: [
                { message: 'Wrong! (async)', asyncValidator: customAsyncValidator },
                { message: 'Only numbers can be entered!', asyncValidator: customAsyncValidator2 },
              ],
            },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="errorSum">
      <n-form-label>Calculate: 1 + 1 = ?</n-form-label>
      <n-form-control extraInfo="errorStrategy is pristine, triggers validation rules at initialization">
        <n-input
          v-model="formModel.errorSum"
          v-n-validate-rules="{
            errorStrategy: 'pristine',
            rules: {
              validators: [{ message: 'Wrong!', validator: customValidator3 }],
            },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate3 = ref(null);
    let formModel = reactive({
      sum: '',
      asyncSum: '',
      errorSum: '3',
    });

    const customValidator = (rule, value) => {
      return value == '2';
    };
    const customValidator2 = (rule, value) => {
      return value != '2';
    };

    const customAsyncValidator = (rule, value) => {
      return value == '3';
    };
    const customAsyncValidator2 = (rule, value) => {
      let reg = /^[\d]+(\s+[\d]+)*$/;
      return reg.test(value);
    };

    const customValidator3 = (rule, value) => {
      return value == '2';
    };
    return {
      nFormTemplateValidate3,
      formModel,
      customValidator,
      customValidator2,
      customAsyncValidator,
      customAsyncValidator2,
      customValidator3,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Verify a single element and customize management message prompts

Configure `messageShowType` to choose how messages are automatically prompted, defaulting to `popover`.

- Set to `popover` error message will appear as `popover` when the element is focused.
- Set to `text` error messages will automatically appear as text beneath the element (required with the form control container).
- Error message set to `none` will not be automatically rendered to the view.
- Configure `popPosition` in `options` to customize `popover` content pop-up direction when the message prompt is `popover`, defaulting to `['right','bottom']`. More values refer to the Popover component.

:::demo

```vue
<template>
  <n-form ref="nFormTemplateValidate4" :formData="formModel" labelSize="lg">
    <n-form-item prop="sum">
      <n-form-label>Calculate: 1 + 1 = ?</n-form-label>
      <n-form-control extraInfo="messageageShowType is none, no prompt text is displayed">
        <n-input
          v-model="formModel.sum"
          v-n-validate-rules="{
            messageShowType: 'none',
            rules: {
              validators: [{ message: 'Wrong!', validator: customValidator }],
            },
            options: {
              updateOn: 'change',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="asyncSum">
      <n-form-label>Calculate: 1 + 2 = ?</n-form-label>
      <n-form-control extraInfo="messageShowType is popover, prompted with Popover">
        <n-input
          v-model="formModel.asyncSum"
          v-n-validate-rules="{
            rules: {
              asyncValidators: [{ message: 'Wrong! (async)', asyncValidator: customAsyncValidator }],
            },
            options: {
              updateOn: 'input',
              messageShowType: 'popover',
              popPosition: 'bottom',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate4 = ref(null);
    let formModel = reactive({
      sum: '',
      asyncSum: '',
    });

    const customValidator = (rule, value) => {
      return value == '2';
    };

    const customAsyncValidator = (rule, value) => {
      return value == '3';
    };

    return {
      nFormTemplateValidate4,
      formModel,
      customValidator,
      customAsyncValidator,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Verify a single element and customize asyncDebounceTime

For asynchronous validators, a default of 300ms debounce time is provided. Set `asyncDebounceTime`(ms) display settings in options.

:::demo

```vue
<template>
  <n-form ref="nFormTemplateValidate5" :formData="formModel" labelSize="lg">
    <n-form-item prop="asyncSum">
      <n-form-label>Calculate: 1 + 2 = ? (async)</n-form-label>
      <n-form-control extraInfo="asyncDebounceTime is 500ms">
        <n-input
          v-model="formModel.asyncSum"
          v-n-validate-rules="{
            rules: {
              asyncValidators: [{ message: 'Wrong! (async)', asyncValidator: customAsyncValidator }],
            },
            options: {
              updateOn: 'input',
              asyncDebounceTime: 500,
            },
          }"
        />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate5 = ref(null);
    let formModel = reactive({
      asyncSum: '',
    });

    const customAsyncValidator = (rule, value) => {
      return value == '3';
    };
    return {
      nFormTemplateValidate5,
      formModel,
      customAsyncValidator,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Form Validation and Submission

To validate when you click the submit button, you need to specify the name property and also bind the submit event of the `n-form` component to take effect.

:::demo

```vue
<template>
  <n-form name="userInfoForm" ref="nFormTemplateValidate6" :formData="formModel" labelSize="lg" @submit="onSubmit">
    <n-form-item prop="name">
      <n-form-label>Name</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.name"
          v-n-validate-rules="{
            rules: { minlength: 2, message: 'cannot less than 2 character' },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label>Age</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.age"
          v-n-validate-rules="{
            rules: { min: 1, message: 'age must be greater than 0' },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-form-demo-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate6 = ref(null);
    let formModel = reactive({
      name: '',
      age: '',
    });

    const resetForm = () => {
      nFormTemplateValidate6.value.resetFormFields();
    };

    const onSubmit = (e) => {
      console.log('@submit');
    };

    return {
      nFormTemplateValidate6,
      formModel,
      onSubmit,
      resetForm,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

#### Form verification and submission, user registration scenario

For automatic error prompting, it is recommended that `messageShowType` be set uniformly at the `n-form` component in the form, and ref property must be set at the same time to take effect.

:::demo

```vue
<template>
  <n-form
    name="userInfoForm2"
    ref="nFormTemplateValidate7"
    :formData="formModel"
    labelSize="lg"
    @submit="onSubmit"
    v-n-validate-rules="{
      rules: { message: 'validate fail' },
    }"
    messageShowType="text"
  >
    <n-form-item prop="name">
      <n-form-label>Name</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.name"
          v-n-validate-rules="{
            rules: { minlength: 2, message: 'cannot less than 2 character' },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label>Age</n-form-label>
      <n-form-control>
        <n-input
          v-model="formModel.age"
          v-n-validate-rules="{
            rules: { min: 1, message: 'age must be greater than 0' },
            options: {
              updateOn: 'input',
            },
          }"
        />
      </n-form-control>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTemplateValidate7 = ref(null);
    let formModel = reactive({
      name: '',
      age: '',
    });

    const resetForm = () => {
      nFormTemplateValidate7.value.resetFormFields();
    };

    const onSubmit = (e) => {
      console.log('@submit');
    };

    return {
      nFormTemplateValidate7,
      formModel,
      onSubmit,
      resetForm,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Reactive form validation

Specify the validate rules in the `n-form` component and the value of `prop` in the `n-form-item` is the validate field name.

:::demo

```vue
<template>
  <n-form ref="nFormReactiveValidate" :form-data="validateFormModel" :rules="rules">
    <n-form-item prop="name">
      <n-form-label :required="true">Name</n-form-label>
      <n-form-control>
        <n-input v-model="validateFormModel.name" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label :required="true">Age</n-form-label>
      <n-form-control>
        <n-input v-model="validateFormModel.age" />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormReactiveValidate = ref(null);
    let validateFormModel = reactive({
      name: 'AlanLee',
      age: '24',
    });
    const rules = reactive({
      name: [{ required: true, message: 'name field cannot be empty', trigger: 'blur' }],
      age: [
        {
          required: true,
          message: 'age must be greater than 0',
          trigger: 'blur',
          validator: (rule, value) => value > 0,
        },
        {
          required: true,
          message: 'age cannot greater than 120',
          trigger: 'input',
          validator: (rule, value) => value < 120,
        },
      ],
    });

    return {
      nFormReactiveValidate,
      rules,
      validateFormModel,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Feedback status of a specified form

You can manually specify the feedback status by setting `feedbackStatus` for `n-form-control`. Currently, the following statuses are supported: `success`, `error`, and `pending`.

:::demo

```vue
<template>
  <n-form ref="nFormFeedback" :form-data="formModel">
    <n-form-item prop="name">
      <n-form-label :required="true">Name</n-form-label>
      <n-form-control feedbackStatus="pending">
        <n-input v-model="formModel.name" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="nickname">
      <n-form-label :required="true">Nickname</n-form-label>
      <n-form-control feedbackStatus="success">
        <n-input v-model="formModel.nickname" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label :required="true">Age</n-form-label>
      <n-form-control feedbackStatus="error">
        <n-input v-model="formModel.age" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="sex">
      <n-form-label :required="true">Sex</n-form-label>
      <n-form-control feedbackStatus="error">
        <n-select v-model="formModel.sex" :options="sexSelectOptions" placeholder="Select your sex"></n-select>
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormFeedback = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: '24',
      sex: 'Male',
    });

    const sexSelectOptions = reactive(['Male', 'Female']);

    return {
      nFormFeedback,
      formModel,
      sexSelectOptions,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

You can customize the feedback status icon in `n-form-control` by `suffixTemplate` to a named slot.

:::demo

```vue
<template>
  <n-form ref="nFormFeedback2" :form-data="formModel">
    <n-form-item prop="address">
      <n-form-label :required="true">Address</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.address" />
        <template v-slot:suffixTemplate>
          <n-icon name="right-o" color="rgb(61, 204, 166)" />
        </template>
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormFeedback2 = ref(null);
    let formModel = reactive({
      address: 'Nanshan distrit, Shenzhen',
    });

    return {
      nFormFeedback2,
      formModel,
    };
  },
});
</script>
```

:::

### Form collaboration verification

In some scenarios, your multiple form components depend on each other and need to be checked together (for example, password entry and confirmation in registration scenarios) and implemented with a custom checker (comparing password entry with the value of confirmation).

:::demo

```vue
<template>
  <n-form name="togetherValidateForm" ref="nFormTogetherValidate" :form-data="formModel" labelSize="lg" @submit="onSubmit">
    <n-form-item prop="username">
      <n-form-label :required="true">Username</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.username" v-n-validate-rules="formRules.userNameRule" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="password">
      <n-form-label :required="true">Password</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.password" v-n-validate-rules="formRules.passwordRule" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="confirmPassword">
      <n-form-label :required="true">Confirm Password</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.confirmPassword" v-n-validate-rules="formRules.confirmPasswordRule" />
      </n-form-control>
    </n-form-item>
    <n-form-operation class="form-demo-form-operation">
      <n-button type="submit" class="form-demo-demo-btn">Submit</n-button>
      <n-button bsStyle="common" @click="resetForm">Reset</n-button>
    </n-form-operation>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormTogetherValidate = ref(null);
    let formModel = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    });

    const formRules = {
      userNameRule: {
        rules: {
          minlength: 6,
          message: 'minimum 6 characters',
        },
      },
      passwordRule: {
        rules: {
          minlength: 6,
          message: 'minimum 6 characters',
        },
      },
      confirmPasswordRule: {
        options: {
          updateOn: 'input',
        },
        rules: {
          minlength: 6,
          message: 'minimum 6 characters',
          validators: [
            {
              message: 'the confirmation password does not match the password',
              validator: (rule, value) => {
                return value === formModel.password;
              },
            },
          ],
        },
      },
    };

    const resetForm = () => {
      nFormTogetherValidate.value.resetFormFields();
    };

    const onSubmit = (e) => {
      console.log('@submit');
    };

    return {
      nFormTogetherValidate,
      formModel,
      formRules,
      resetForm,
      onSubmit,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### Cross-component verification

> todo

:::demo

```vue
<template>
  <n-form ref="nFormWithComponent" :form-data="formModel">
    <n-form-item prop="name">
      <n-form-label :required="true">Name</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.name" />
      </n-form-control>
    </n-form-item>
    <n-form-item prop="age">
      <n-form-label :required="true">Age</n-form-label>
      <n-form-control>
        <n-input v-model="formModel.age" />
      </n-form-control>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const nFormWithComponent = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
    });

    return {
      nFormWithComponent,
      formModel,
    };
  },
});
</script>

<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>
```

:::

### API

n-form Attribute

| Attribute  | Type                                  | Default      | Description                                                                    | Jump to Demo                |
| ---------- | ------------------------------------- | ------------ | ------------------------------------------------------------------------------ | --------------------------- |
| name       | string                                |              | Optional, set the form name property. Required for form submission validation. | [Basic usage](#basic-usage) |
| formData   | object                                |              | Required, form data                                                            | [Basic usage](#basic-usage) |
| layout     | 'horizontal' \|'vertical' \|'columns' | 'horizontal' | Optional, set the way the forms are arranged                                   | [Basic usage](#basic-usage) |
| labelSize  | 'sm' \|'lg'                           |              | Optional, set the width of label, no default of 100px, sm is 80px,lg is 150px  | [Basic usage](#basic-usage) |
| labelAlign | 'start' \|'center' \|'end'            | 'start'      | Optional, set horizontal layout, label alignment                               | [Basic usage](#basic-usage) |

| rules | object | | Optional, set form validate rules | [Reactive form validation](#reactive-form-validation) |

n-form Event

| Event Name | Type       | Description                  | Jump to Demo                                                      |
| ---------- | ---------- | ---------------------------- | ----------------------------------------------------------------- |
| submit     | () => void | Optional, submit form events | [Form Validation and Submission](#Form Validation and Submission) |

n-form-item Attribute

| Attribute    | Type    | Default | Description                                                                                        | Jump to Demo                                                                |
| ------------ | ------- | ------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| prop         | string  |         | Optional, specify the field to validate the form and select this property when validating the form | [Basic usage](#basic-usage)                                                 |
| dHasFeedback | boolean | 'false' | Optional, set whether the current form-control displays feedback icons                             | [Feedback status of a specified form](#feedback-status-of-a-specifien-form) |

n-form-label Attribute

| Attribute | Type    | Default | Description                                                                                                                                                     | Jump to Demo                |
| --------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| required  | boolean | 'false' | Optional, is form item required                                                                                                                                 | [Basic usage](#basic-usage) |
| hasHelp   | boolean | 'false' | Optional, Whether form items need help                                                                                                                          | [Basic usage](#basic-usage) |
| helpTips  | string  |         | Optional, the form item help guide prompt content needs to be used with `hasHelp`, and the value of `helpTips` cannot be an empty string for it to take effect. | [Basic usage](#basic-usage) |

n-form-control Attribute

| Attribute      | Type    | Default | Description                                                                                  | Jump to Demo                                                                |
| -------------- | ------- | ------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| extraInfo      | string  |         | Optional, additional information, usually used to supplement the description of form options | [Basic usage](#basic-usage)                                                 |
| feedbackStatus | boolean | 'false' | Optional, manually specify current control status feedback                                   | [Basic usage](#basic-usage)                                                 |
| suffixTemplate | string  |         | Optional, pass an icon template as input box suffix (passing in icon component via slot)     | [Feedback status of a specified form](#feedback-status-of-a-specifien-form) |

### Directives

v-n-validate-rules

| Attribute | Type   | Default | Description                                                                                                        | Jump to Demo                                                        |
| --------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| rules     | object |         | Required, form validate rules, see [async-validator](https://www.npmjs.com/package/async-validator) for more rules | [Template driven form validation](#template-driven-form-validation) |
| options   | object |         | Optional, options                                                                                                  | [Template driven form validation](#template-driven-form-validation) |

> This directive is only valid on form class components such as the `n-form` label or `n-input`.

- The rules are written as follows

```js
{[validatorKey]: validatorValue, message: 'some tip messages.'}
```

The current nancalui-supported built-in validator keys are: `required`, `minlength`, `maxlength`, `min`, `max`, `requiredTrue`, `email`, `pattern`, `whitespace`. More rule references [async-validator](https://www.npmjs.com/package/async-validator).

<br>

- options

  - errorStrategy，error update policy：`dirty`(default)、`prestine`

  - updateOn，check timing，optional value：`change`(default)、 `blur`、 `input`

  - popPosition，customize `popover` content pop-up direction. The default is `['right','bottom']`, and more values refer to the Popover component.

### Interface & Types

IForm

```typescript
export interface IForm {
  formData: any;
  labelData: IFormLabel;
  formMitt: Emitter<any>;
  rules: any;
  messageShowType: string;
}
```

IFormLabel

```typescript
export interface IFormLabel {
  layout: string;
  labelSize: string;
  labelAlign: string;
}
```

IFormItem

```typescript
export interface IFormItem {
  dHasFeedback: boolean;
  prop: string;
  formItemMitt: Emitter<any>;
  resetField(): void;
}
```

IFormControl

```typescript
export interface IFormControl {
  feedbackStatus: string;
  extraInfo: string;
  formItemMitt: Emitter<any>;
  resetField(): void;
}
```
