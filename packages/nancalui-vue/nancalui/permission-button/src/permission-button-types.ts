import { ExtractPropTypes } from 'vue';

export const permissionButtonProps = {
  permCode: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'secondary',
  },
  size: {
    type: String,
    default: 'sm',
  },
  variant: {
    type: String,
    default: 'solid',
  },
};

export type PermissionButtonProps = ExtractPropTypes<typeof permissionButtonProps>;
