import type { ExtractPropTypes } from 'vue';

export const messageBoxProps = {
  // 内容信息
  content: {
    type: String,
    default: '',
  },
  // 标题信息
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '430px',
  },
  cancel: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
  save: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  saveButtonText: {
    type: String,
    default: '确认',
  },
} as const;

export type MessageBoxProps = ExtractPropTypes<typeof messageBoxProps>;

export type VoidFn = () => void;

export type MessageBoxOption = Partial<MessageBoxProps>;
