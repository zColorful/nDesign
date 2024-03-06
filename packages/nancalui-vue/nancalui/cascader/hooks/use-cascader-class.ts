/**
 * 定义组件class
 */
import { computed, ComputedRef, Ref, toRefs } from 'vue';
import { CascaderProps, CascaderulProps } from '../src/cascader-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useSize } from '../../shared/_utils/use-size';
const ns = useNamespace('cascader');

// 根节点class
export const useRootClassName = (props: CascaderProps, menuShow: Ref<boolean>): ComputedRef => {
  return computed(() => ({
    [`${ns.b()} ${ns.e('dropdown')} ${ns.em('dropdown', 'animation')}`]: true,
    [ns.em('dropdown', 'open')]: menuShow.value,
    [ns.e('disbaled')]: props.disabled,
  }));
};

// 弹出层列 class
export const useUlClassName = (props: any): ComputedRef => {
  return computed(() => ({
    [ns.e('ul')]: true,
    [ns.e('drop-no-data')]: !props?.displayColumns?.length && !props?.options?.length,
  }));
};

// 为弹出层打开添加全局class
export const dropdownOpenClass = (status: boolean): string => {
  return status ? `${ns.e('drop-menu-wrapper')}` : '';
};
