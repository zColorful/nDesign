import type { PropType, ExtractPropTypes, ComputedRef, Ref, CSSProperties, InputHTMLAttributes } from 'vue';

export type ISize = 'lg' | 'md' | 'sm';
export type IType = 'change' | 'input';

export const inputNumberProps = {
  /**
   * @zh 绑定值
   * @en Value
   */
  modelValue: Number,
  /**
   * @zh 默认值（非受控模式）
   * @en Default value (uncontrolled mode)
   */
  defaultValue: Number,
  /**
   * @zh 模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）
   * @en Mode (`embed`: button embedded mode, `button`: left and right button mode)
   * @values 'embed', 'button'
   */
  mode: {
    type: String as PropType<'embed' | 'button'>,
    default: 'embed',
  },
  /**
   * @zh 数字精度
   * @en Precision
   */
  precision: Number,
  /**
   * @zh 数字变化步长
   * @en Number change step
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 最大值
   * @en Max
   */
  max: {
    type: Number,
    default: Infinity,
  },
  /**
   * @zh 最小值
   * @en Min
   */
  min: {
    type: Number,
    default: -Infinity,
  },
  /**
   * @zh 定义输入框展示值
   * @en Define the display value of the input
   */
  formatter: {
    type: Function,
  },
  /**
   * @zh 从 `formatter` 转换为数字，和 `formatter` 搭配使用
   * @en Convert from `formatter` to number, and use with `formatter`
   */
  parser: {
    type: Function,
  },
  /**
   * @zh 输入框提示文字
   * @en Input prompt text
   */
  placeholder: String,
  /**
   * @zh 是否隐藏按钮
   * @en Whether to hide the button
   */
  hideButton: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 输入框大小
   * @en Input size
   * @values 'lg' | 'md' | 'sm'
   * @defaultValue 'md'
   */
  size: {
    type: String as PropType<ISize>,
    default: 'md',
  },
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   */
  allowClear: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 触发 `v-model` 的事件
   * @en Trigger event for `v-model`
   */
  modelEvent: {
    type: String as PropType<IType>,
    default: 'change',
  },
  /**
   * @zh 只读
   * @en Readonly
   */
  readOnly: {
    type: Boolean,
    default: false,
  },
} as const;

export const emits = {
  'update:modelValue': (value: number | undefined) => true,
  /**
   * @zh 值发生改变时触发
   * @en Triggered when the value changes
   * @param { number | undefined } value
   * @param {Event} ev
   */
  change: (value: number | undefined, ev: Event) => true,
  /**
   * @zh 输入框获取焦点时触发
   * @en Triggered when the input gets focus
   * @param {FocusEvent} ev
   */
  focus: (ev: FocusEvent) => true,
  /**
   * @zh 输入框失去焦点时触发
   * @en Triggered when the input box loses focus
   * @param {FocusEvent} ev
   */
  blur: (ev: FocusEvent) => true,
  /**
   * @zh 用户点击清除按钮时触发
   * @en Triggered when the user clicks the clear button
   * @param {Event} ev
   */
  clear: (ev: Event) => true,
  /**
   * @zh 输入时触发
   * @en Triggered on input
   * @param { number | undefined } value
   * @param {string} inputValue
   * @param {Event} ev
   */
  input: (value: number | undefined, inputValue: string, ev: Event) => true,
};

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

export interface IState {
  currentValue: number | string | undefined;
  userInputValue: number | string | undefined;
}

export interface UseExpose {
  inputRef: Ref<HTMLElement>;
}

export interface UseRender {
  wrapClass: ComputedRef<unknown[]>;
  customStyle: { style: CSSProperties };
  otherAttrs: InputHTMLAttributes;
  controlButtonsClass: ComputedRef<Record<string, boolean>>;
  inputWrapClass: ComputedRef<Record<string, boolean>>;
  inputInnerClass: ComputedRef<Record<string, boolean>>;
}

export interface UseEvent {
  inputVal: ComputedRef<number | string | undefined>;
  minDisabled: ComputedRef<boolean>;
  maxDisabled: ComputedRef<boolean>;
  onAdd: () => void;
  onSubtract: () => void;
  onInput: (val: Event) => void;
  onChange: (event: Event) => void;
}
