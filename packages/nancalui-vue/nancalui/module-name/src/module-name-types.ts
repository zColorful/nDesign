import { ExtractPropTypes } from 'vue';

export const moduleNameProps = {
  size: {
    type: String,
    default: 'sm', // 默认尺寸类型：大 'lg' | 中 'md' | 小 'sm'
  },
  width: {
    type: Number || null,
    default: null, // 左边宽度
  },
  height: {
    type: String || null,
    default: null, // 左边高度
  },
  backgroundColor: {
    type: String || null,
    default: null, // 左边颜色
  },
  color: {
    type: String || null,
    default: null, // 字体颜色
  },
  fontSize: {
    type: String || null,
    default: null, // 字体大小
  },
} as const;

export type ModuleNameProps = ExtractPropTypes<typeof moduleNameProps>;
