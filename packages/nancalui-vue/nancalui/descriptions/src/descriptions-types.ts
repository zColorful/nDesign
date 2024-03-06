import { PropType,ExtractPropTypes } from 'vue';
type Size = 'lg' | 'md' | 'sm';

export const descriptionsProps = {
  border: {
    type: Boolean,
    default: false, // 是否带有边框
  },
  column: {
    type: Number,
    default: 3, // 一行 Descriptions Item 的数量
  },
  size: {
    type: String as PropType<Size>, // 列表的尺寸
    default: 'md',
  },
  labelClassName: {
    type: String, // 自定义标签类名
    default: '',
  },
  contentClassName: {
    type: String, // 自定义内容类名
    default: '',
  },
} as const;

export type descriptionsProps = ExtractPropTypes<typeof descriptionsProps>;
