import { ExtractPropTypes } from 'vue';

export const leftTreeProps = {
  data: {
    type: Object,
    default: [], // tree基本数据数据,如 [{label:'节点',id:1,children:[]}];
  },
  treeAttrData: {
    type: Object,
    default: {}, // tree的默认属性数据，如{showCheckbox:true,};
  },
  checkedNodes: {
    type: Object,
    default: [], // 设置已选节点,如 [{id:1},{id:2}]
  },
} as const;

export type LeftTreeProps = ExtractPropTypes<typeof leftTreeProps>;
