import { defineComponent, watch, inject, toRefs, shallowRef, ref, computed, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import Icon from '../../icon/src/icon';
import { inputProps, InputProps } from './input-types';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../form/src/components/form-item/form-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useInputRender } from './composables/use-input-render';
import { useInputEvent } from './composables/use-input-event';
import { useInputFunction } from './composables/use-input-function';
import './input.scss';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'NInput',
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'keydown', 'keyup', 'clear'],
  setup(props: InputProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('NInput', app);

    const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
    const { modelValue, readonly, maxLength } = toRefs(props);
    const ns = useNamespace('input');
    const slotNs = useNamespace('input-slot');
    const { inputDisabled, inputDisabledBorder, inputSize, isFocus, wrapClasses, inputClasses, customStyle, otherAttrs } = useInputRender(
      props,
      ctx
    );

    const input = shallowRef<HTMLInputElement>();
    const { select, focus, blur } = useInputFunction(input);

    const { onFocus, onBlur, onInput, onChange, onKeydown, onKeyup, onClear } = useInputEvent(isFocus, props, ctx, focus);

    const passwordVisible = ref(false);
    const clickPasswordIcon = () => {
      passwordVisible.value = !passwordVisible.value;
      blur();
    };

    const prefixVisible = ctx.slots.prefix || props.prefix;
    const suffixVisible = ctx.slots.suffix || props.suffix || props.showPassword || props.clearable;

    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value);
    const showClearable = computed(() => {
      return props.clearable && !inputDisabled.value && modelValue.value?.length > 0;
    });

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItemContext?.validate('change').catch((err) => console.warn(err));
        }
      }
    );

    ctx.expose({ select, focus, blur });

    return () => (
      <div class={inputClasses.value} {...customStyle}>
        {ctx.slots.prepend && <div class={slotNs.e('prepend')}>{ctx.slots.prepend?.()}</div>}
        <div class={wrapClasses.value}>
          {prefixVisible && (
            <span class={slotNs.e('prefix')}>
              {ctx.slots.prefix && ctx.slots.prefix?.()}
              {props.prefix && <Icon size={inputSize.value} name={props.prefix} />}
            </span>
          )}
          <input
            maxlength={maxLength?.value ? maxLength?.value : ''}
            ref={input}
            value={modelValue.value}
            disabled={inputDisabled.value}
            noborder={inputDisabledBorder.value}
            class={ns.e('inner')}
            readonly={readonly.value}
            placeholder={props.placeholder || t('placeholder')}
            {...otherAttrs}
            type={props.showPassword ? (passwordVisible.value ? 'text' : 'password') : 'text'}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            onKeydown={onKeydown}
            onKeyup={onKeyup}
          />
          {suffixVisible && (
            <span class={slotNs.e('suffix')}>
              {props.suffix && <Icon size={inputSize.value} name={props.suffix} />}
              {ctx.slots.suffix && ctx.slots.suffix?.()}
              {showPwdVisible.value &&
                // <Icon
                //   size={inputSize.value}
                //   class={ns.em('password', 'icon')}
                //   name={passwordVisible.value ? 'preview' : 'preview-forbidden'}
                //   onClick={clickPasswordIcon}
                // />

                (passwordVisible.value ? (
                  <svg
                    size={inputSize.value}
                    onClick={clickPasswordIcon}
                    version="1.1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16.0 16.0"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <clipPath id="i0">
                        <path d="M1440,0 L1440,900 L0,900 L0,0 L1440,0 Z"></path>
                      </clipPath>
                    </defs>
                    <g transform="translate(-1245.0 -463.0)">
                      <g clip-path="url(#i0)">
                        <g transform="translate(943.0 251.0)">
                          <g transform="translate(48.0 209.0)">
                            <g transform="translate(254.0 3.0)">
                              <g transform="translate(1.0 3.0)">
                                <path
                                  d="M7.00001505,0 C2.70856215,0 0.598161518,3.15103 0.0234284985,4.85761 C-0.00780949952,4.95037 -0.00780949952,5.04963 0.0234284985,5.14239 C0.598161518,6.84897 2.70856215,10 7.00001505,10 C11.291478,10 13.4018987,6.84897 13.9766016,5.14239 C14.0077995,5.04963 14.0077995,4.95037 13.9766016,4.85761 C13.4018987,3.15103 11.291478,0 7.00001505,0 Z"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-miterlimit="10"></path>
                                <g transform="translate(4.99372101621659 3.0)">
                                  <path
                                    d="M2.00629403,4 C3.11433963,4 4.01258806,3.1045695 4.01258806,2 C4.01258806,0.8954305 3.11433963,0 2.00629403,0 C0.898248434,0 0,0.8954305 0,2 C0,3.1045695 0.898248434,4 2.00629403,4 Z"
                                    stroke="#8A8A8A"
                                    stroke-width="1.1"
                                    fill="none"
                                    stroke-miterlimit="10"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    size={inputSize.value}
                    onClick={clickPasswordIcon}
                    version="1.1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16.0 16.0"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <clipPath id="i0">
                        <path d="M1440,0 L1440,900 L0,900 L0,0 L1440,0 Z"></path>
                      </clipPath>
                    </defs>
                    <g transform="translate(-1245.0 -463.0)">
                      <g clip-path="url(#i0)">
                        <g transform="translate(943.0 251.0)">
                          <g transform="translate(48.0 209.0)">
                            <g transform="translate(254.0 3.0)">
                              <g transform="translate(1.0 5.0)">
                                <path
                                  d="M13.74703,0 C13.45453,1.60042 12.61363,3.04896 11.36893,4.09666 C10.12433,5.14435 8.55355,5.72585 6.92669,5.74105 C5.29983,5.75625 3.71847,5.20435 2.45439,4.18016 C1.19031,3.15595 0.32246,1.72341 0,0.12876"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-miterlimit="10"></path>
                              </g>
                              <g transform="translate(13.27083000000039 9.14136000000002)">
                                <path
                                  d="M0,0 L1,1"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-miterlimit="10"></path>
                              </g>
                              <g transform="translate(9.341964999999618 11.05104999999998)">
                                <path
                                  d="M0.195435,0 L0.804565,1.3172"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-miterlimit="10"></path>
                              </g>
                              <g transform="translate(5.125385000000279 11.07225)">
                                <path
                                  d="M0.862205,0 L0.137795,1.2749"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-miterlimit="10"></path>
                              </g>
                              <g transform="translate(1.361189999999624 9.146214999999984)">
                                <path
                                  d="M1.19476,0.004865 L0,0.995135"
                                  stroke="#8A8A8A"
                                  stroke-width="1.1"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-miterlimit="10"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              {showClearable.value && <Icon size={inputSize.value} class={ns.em('clear', 'icon')} name="close" onClick={onClear} />}
            </span>
          )}
        </div>
        {ctx.slots.append && <div class={slotNs.e('append')}>{ctx.slots.append?.()}</div>}
      </div>
    );
  },
});
