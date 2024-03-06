import { ExtractPropTypes } from 'vue';

export const customizeStepsProps = {
  // 展示信息
  stepsData: {
    type: Array,
    default: () => [
      {
        label: '基础信息',
      },
    ],
  },
  // 当前进度
  nowIndex: {
    type: Number,
    default: 0,
  },
  // 完成步凑默认图标name
  icon: {
    type: String,
    default: 'right-o',
  },
  // 默认图标类名
  iconClass: {
    type: String,
    default: 'icon',
  },
} as const;

export type CustomizeStepsProps = ExtractPropTypes<typeof customizeStepsProps>;
