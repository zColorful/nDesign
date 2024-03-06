import type { PropType, ExtractPropTypes, Ref, UnwrapNestedRefs, ComputedRef, UnwrapRef } from 'vue';
import { CascaderFieldNames, CascaderOption, CascaderOptionInfo } from './interface';

type TriggerTypes = 'hover' | 'click';

export type SingleModelValue = string | number | Record<string, any>;
export type MultipleModelValue = SingleModelValue[];
export type CascaderModelValue = MultipleModelValue | SingleModelValue;
export type InputSize = 'sm' | 'md' | 'lg';
export type CascaderValueType = CascaderModelValue | [CascaderModelValue];
export const cascaderProps = {
  /**
   * @zh 绑定值是否为路径
   * @en Whether the value is a path
   */
  pathMode: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 输入框的值
   * @en The value of the input
   * @vModel
   */
  inputValue: {
    type: String,
    default: undefined,
  },
  /**
   * @zh 是否显示下拉框
   * @en Whether to show the dropdown
   * @vModel
   */
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 可选，指定展开次级菜单方式
   * @description 可选择的值 'hover', 'click'
   * @type {('hover'|'click')}
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<TriggerTypes>,
    default: 'hover',
  },
  /**
   * 可选，单位 px，用于控制组件输入框宽度和下拉的宽度
   * @type { Number | String }
   * @default 200
   */
  width: {
    type: [Number, String],
    default: 200,
  },
  /**
   * 可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等
   * @type { Number | String }
   * @default 200
   */
  dropdownWidth: {
    type: [Number, String],
  },
  /**
   * 必选，级联器的菜单信息
   * @type {CascaderItem[]}
   * @default []
   */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: [],
    required: true,
  },
  /**
   * 可选，级联器是否开启多选模式，开启后为 checkbox 选择
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，需要选中项的value集合
   * @type {CascaderValueType}
   * @default []
   */
  modelValue: {
    type: Array as PropType<CascaderValueType>,
    default: [],
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: boolean) => void>,
  },
  /**
   * 可选，级联器是否禁用
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选，没有选择时的输入框展示信息
   * @type {string}
   * @default '''
   */
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 300,
  },
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
   */
  maxTagCount: {
    type: Number,
    default: 0,
  },
  /**
   * @zh 格式化展示内容
   * @en Format display content
   */
  formatLabel: {
    type: Function as PropType<(options: CascaderOption[]) => string>,
  },
  /**
   * @zh 自定义选项过滤方法
   * @en Custom options filter method
   */
  filterOption: {
    type: Function as PropType<(inputValue: string, option: CascaderOptionInfo) => boolean>,
  },
  /**
   * @zh 数据懒加载函数，传入时开启懒加载功能
   * @en Data lazy loading function, open the lazy loading function when it is passed in
   */
  loadMore: {
    type: Function as PropType<(option: CascaderOption, done: (children?: CascaderOption[]) => void) => void>,
  },
  /**
   * @zh 是否为加载中状态
   * @en Whether it is loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 搜索下拉菜单中的选项是否仅展示标签
   * @en Whether the options in the search dropdown show only label
   */
  searchOptionOnlyLabel: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 自定义 `CascaderOption` 中的字段
   * @en Customize fields in `CascaderOption`
   */
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
  },
  /**
   * @zh 用于确定选项键值的属性名
   * @en Used to determine the option key value attribute name
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * @zh 是否展开子菜单
   * @en whether to expand the submenu
   */
  expandChild: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
} as const;

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>;

export interface PopupTypes {
  menuShow: Ref<boolean>;
  menuOpenClass: Ref<string>;
  stopDefault: Ref<boolean>;
  openPopup: (e?: MouseEvent) => void;
  updateStopDefaultType: () => void;
}

export type CaascaderOptionsType = UnwrapNestedRefs<[CascaderOption[]]>;
export interface OptionsCallback {
  cascaderOptions: never | CaascaderOptionsType;
  changeCascaderIndexs: (optionItem: CascaderOption, ulIndex: number) => void;
}

export interface CascaderItemNeedType {
  valueCache?: CascaderValueType;
  trigger?: TriggerTypes;
  value?: CascaderValueType;
  inputValueCache?: Ref<string>;
  confirmInputValueFlg?: Ref<boolean>;
  multiple?: boolean;
  stopDefault?: Ref<boolean>;
  activeIndexs?: number[];
  tagList?: UnwrapNestedRefs<CascaderOption[]>;
}
export interface UseCascaderItemCallback {
  cascaderItemNeedProps: CascaderItemNeedType;
}

export type CheckedType = 'checked' | 'halfChecked';

export interface RootStyleFeedback {
  inputWidth: string;
}

export const cascaderulProps = {
  displayColumns: {
    type: Array as PropType<CascaderOptionInfo[][]>,
    required: true,
  },
  selectedPath: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selectViewValue: {
    type: Array as PropType<any[]>,
  },
  activeKey: String,
  totalLevel: {
    type: Number,
    required: true,
  },
  multiple: Boolean,
  checkStrictly: Boolean,
  loading: Boolean,
  menuOpenClass: String,
  dropdownWidth: [Number, String],
};
export type CascaderulProps = ExtractPropTypes<typeof cascaderulProps> & {
  totalLevel: number;
  selectedPath: string[];
};
