import { computed, reactive, toRefs, watch, ref, inject } from 'vue';
import type { SetupContext, Ref, CSSProperties } from 'vue';
import { InputNumberProps, UseEvent, UseRender, IState, UseExpose, ISize } from './input-number-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { FORM_TOKEN, FormContext } from '../../form';

const ns = useNamespace('input-number');

export function useRender(props: InputNumberProps, ctx: SetupContext): UseRender {
  const { style, class: customClass, ...otherAttrs } = ctx.attrs;
  const customStyle = { style: style as CSSProperties };

  const wrapClass = computed(() => [
    {
      [ns.b()]: true,
      [ns.m(props.size)]: true,
      [ns.m(props.mode)]: true,
      [ns.m('only-suffix')]: !!ctx.slots.suffix?.() && props.hideButton && props.mode === 'embed',
      disabled: props.disabled,
    },
    customClass,
  ]);

  const controlButtonsClass = computed(() => ({
    [ns.e('control-buttons')]: true,
    [ns.e('show-control-buttons')]: true,
    disabled: props.disabled,
  }));

  const inputWrapClass = computed(() => ({
    [ns.e('input-wrap')]: true,
  }));

  const inputInnerClass = computed(() => ({
    [ns.e('input-box')]: true,
    disabled: props.disabled,
  }));

  return { wrapClass, customStyle, otherAttrs, controlButtonsClass, inputWrapClass, inputInnerClass };
}

export function useExpose(ctx: SetupContext): UseExpose {
  const inputRef = ref();
  const focus = () => {
    inputRef.value.focus();
  };
  const blur = () => {
    inputRef.value.blur();
  };
  const select = () => {
    inputRef.value.select();
  };
  ctx.expose({ focus, blur, select });

  return { inputRef };
}
