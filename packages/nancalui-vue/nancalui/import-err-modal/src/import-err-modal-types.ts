import { ExtractPropTypes } from 'vue';

export const importErrModalProps = {
  // 是否展示
  isShow: {
    type: Boolean,
    default: false,
  },
  // 提示信息
  content: {
    type: String,
    default: '',
  },
} as const;

export type ImportErrModalProps = ExtractPropTypes<typeof importErrModalProps>;
