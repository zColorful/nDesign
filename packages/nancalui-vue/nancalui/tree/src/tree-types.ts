import type { ExtractPropTypes, PropType } from 'vue';
import type { ICheck, IOperate, ITreeNode, IDragdrop, IInnerTreeNode, PropIndex } from './composables/use-tree-types';

const commonProps = {
  check: {
    type: [Boolean, String] as PropType<ICheck>,
    default: false,
  },
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
    default: false,
  },
  operate: {
    type: [Boolean, String, Array] as PropType<IOperate>,
    default: false,
  },
  prop: {
    type: Object as PropType<PropIndex>,
    default: {
      id: 'id',
      label: 'label',
      children: 'children',
    },
  },
};

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    default: [],
  },
  ...commonProps,
  height: {
    type: [Number, String] as PropType<number | string>,
  },
  canDragNode: {
    type: Function,
  },
  canDropNode: {
    type: Function,
  },
};

export const treeNodeProps = {
  data: {
    type: Object as PropType<IInnerTreeNode>,
    default: {},
  },
  ...commonProps,
  canDragNode: {
    type: Function,
  },
  canDropNode: {
    type: Function,
  },
  dragData: {
    type: Object,
    default: {},
  },
  dropData: {
    type: Object,
    default: {},
  },
  dropType: {
    type: String,
    default: '',
  },
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
