import type { ExtractPropTypes, PropType, Ref } from 'vue';
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

export const spaceProps = {
  /**
   * @zh 对齐方式
   * @values 'start', 'end', 'center', 'baseline'
   */
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
  },
  /**
   * @zh 间距方向
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  /**
   * @zh 间距大小，支持分别制定横向和竖向的间距
   */
  size: {
    type: [Number, String, Array] as PropType<number | 'mini' | 'small' | 'medium' | 'large' | [SpaceSize, SpaceSize]>,
    default: 'small',
  },
  /**
   * @zh 环绕类型的间距，用于折行的场景。
   */
  wrap: {
    type: Boolean,
  },
  /**
   * @zh 充满整行
   */
  fill: {
    type: Boolean,
  },
} as const;
