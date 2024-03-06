import { ExtractPropTypes } from 'vue';

export const dynamicWidenProps = {
  pwidth: {
    type: Number,
    default: 210,
  },
  hwidth: {
    type: Number,
    default: 7,
  },
  bgcolor: {
    type: String,
    default: '#EFF1F5',
  },
  borderColor: {
    type: String,
    default: '#EBEDF0',
  },
} as const;

export type DynamicWidenProps = ExtractPropTypes<typeof dynamicWidenProps>;
