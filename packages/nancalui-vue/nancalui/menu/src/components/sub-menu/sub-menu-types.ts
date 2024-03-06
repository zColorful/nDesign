import { ExtractPropTypes } from 'vue';

export const subMenuProps = {
  title: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否需要hover展开子菜单
  isHover: {
    type: Boolean,
    default: false,
  },
} as const;

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>;
