import { ExtractPropTypes, PropType } from 'vue';

export const handleWidthProps = {
  type: {
    type: String as PropType<'width' | 'height'>, // width:横向拖拽，height:竖向拖拽
    default: 'width',
  },
  bgcolor: {
    type: String,
    default: '#ffffff',
  },
  hwidth: {
    type: Number,
    default: 16, // width:元素高度或者宽度
  },
  borderColor: {
    type: String,
    default: '#EBEDF0',
  },
} as const;

export type HandleWidthProps = ExtractPropTypes<typeof handleWidthProps>;
