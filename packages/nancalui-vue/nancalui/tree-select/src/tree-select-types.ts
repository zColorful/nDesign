import { TriggerPosition } from '../../shared/components/trigger';
import type { PropType, ExtractPropTypes } from 'vue';
export type InputSize = 'sm' | 'md' | 'lg';
export interface TreeItem {
  id: number | string;
  label: string;
  parent?: TreeItem;
  children?: Array<TreeItem>;
  level?: number;
  loading?: boolean;
  expanded?: boolean;
  checked?: boolean;
  halfchecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;
}
export interface TreeProps {
  label?: string;
  disabled?: string | (() => string);
  value?: any;
  // isLeaf?: string | Function;
  class?: string | (() => string);
  children?: string;
}
export type TreeData = Array<TreeItem>;

export type ModelValue = number | string | Array<number | string>;

export const treeSelectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<ModelValue>,
    default: '' || [],
  },
  // 是否可筛选
  filter: {
    type: Boolean,
    default: false,
  },
  treeData: {
    type: Array as PropType<TreeData>,
    default: () => [],
  },
  prop: {
    type: Object as PropType<TreeProps>,
    default: {
      label: 'label',
      children: 'children',
      value: 'value',
      disabled: 'disabled',
      class: 'class',
    },
  },

  placeholder: {
    type: String,
    default: '请选择',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
  leafOnly: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  useGrayArrow: {
    type: Boolean,
    default: false,
  },
  enableLabelization: {
    type: Boolean,
    default: false,
  },
  onToggleChange: {
    type: Function as PropType<(bool: boolean) => void>,
    default: undefined,
  },
  onValueChange: {
    type: Function as PropType<(item: TreeItem, index: number) => void>,
    default: undefined,
  },
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer: {
    type: [String, Object] as PropType<string | HTMLElement | null | undefined>,
  },
} as const;

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>;
