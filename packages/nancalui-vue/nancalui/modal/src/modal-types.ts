import type { PropType, ExtractPropTypes } from 'vue';

export type ModalType = 'success' | 'failed' | 'warning' | 'info' | '';

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>,
  },
  open: {
    type: Function as PropType<() => void>,
  },
  close: {
    type: Function as PropType<() => void>,
  },
  escapable: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<ModalType>,
    default: '',
  },
  keepLast: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '800px',
  },
  height: {
    type: String,
    default: '200px',
  },
  bodyMaxHeight: {
    //  设置body的最大高度
    type: [String, Number],
    required: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  bodyClass: {
    type: String,
    required: false,
  },
};

export type EmitName = 'update:modelValue' | 'close';

export type EmitEventFn = (event: EmitName, result?: boolean) => void;

export interface UseModal {
  execClose: () => void;
}

export type ModalProps = ExtractPropTypes<typeof modalProps>;
export type ModalBodyProps = ExtractPropTypes<{ maxHeight: number | string }>;
