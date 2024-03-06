import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { TagProps } from '../tag-types';

export default function (props: TagProps): ComputedRef<string> {
  return computed(() => {
    const { color, type } = props;
    const typeMap = {
      primary: 'var(--nancalui-primary, #447DFD)',
      success: 'var(--nancalui-success, #50d4ab)',
      warning: 'var(--nancalui-warning, #fac20a)',
      danger: 'var(--nancalui-danger, #f66f6a)',
    };
    const colorMap = {
      'blue-w98': '#3383ff',
      'aqua-w98': '#39afcc',
      'olivine-w98': '#2fa898',
      'green-w98': '#4eb15e',
      'yellow-w98': '#b08d1a',
      'orange-w98': '#d47f35',
      'red-w98': '#f66f6a',
      'pink-w98': '#F63838',
      'purple-w98': '#a97af8',
    };

    if (!color && type) {
      return typeMap[type];
    }
    // 判断传入的color是colorMap成员or颜色码
    const themeColor = colorMap[color] || color;
    return themeColor;
  });
}
