import { computed, defineComponent, nextTick, ref, toRefs, watch } from 'vue';
import type { SetupContext } from 'vue';
import { inputNumberProps, InputNumberProps } from './input-number-types';
import { IncIcon, DecIcon } from './input-number-icons';
import { useRender, useExpose } from './use-input-number';
import NP from 'number-precision';
import './input-number.scss';
import { isNumber, isUndefined } from 'lodash';
import { getKeyDownHandler, KEYBOARD_KEY } from '../../shared/_utils/keyboard';
import { useSize } from '../../shared/_utils/use-size';

type StepMethods = 'minus' | 'plus';

const SPEED = 150;
NP.enableBoundaryChecking(false);

export default defineComponent({
  name: 'NInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'input', 'focus', 'blur'],
  setup(props: InputNumberProps, ctx: SetupContext) {
    const { emit, slots } = ctx;
    const { disabled, size } = toRefs(props);
    const { mergedSize } = useSize(size);
    const { inputRef } = useExpose(ctx);

    const { wrapClass, customStyle, otherAttrs, controlButtonsClass, inputWrapClass, inputInnerClass } = useRender(props, ctx);
    //  获取精度
    const mergedPrecision = computed(() => {
      if (isNumber(props.precision)) {
        const decimal = `${props.step}`.split('.')[1];
        const stepPrecision = (decimal && decimal.length) || 0;
        return Math.max(stepPrecision, props.precision);
      }
      return undefined;
    });
    //  按精度计算
    const getStringValue = (number: number | undefined) => {
      if (!isNumber(number)) {
        return '';
      }

      const numString = mergedPrecision.value ? number.toFixed(mergedPrecision.value) : String(number);
      return props.formatter?.(numString) ?? numString;
    };

    // inner input value to display
    const _value = ref(getStringValue(props.modelValue ?? props.defaultValue));

    const valueNumber = computed(() => {
      if (!_value.value) {
        return undefined;
      }
      const number = Number(props.parser?.(_value.value) ?? _value.value);
      return Number.isNaN(number) ? undefined : number;
    });

    const isMin = ref(isNumber(valueNumber.value) && valueNumber.value <= props.min);
    const isMax = ref(isNumber(valueNumber.value) && valueNumber.value >= props.max);

    // 步长重复定时器
    let repeatTimer = 0;

    const clearRepeatTimer = () => {
      if (repeatTimer) {
        window.clearTimeout(repeatTimer);
        repeatTimer = 0;
      }
    };

    const getLegalValue = (value: number | undefined): number | undefined => {
      if (isUndefined(value)) {
        return undefined;
      }

      if (isNumber(props.min) && value < props.min) {
        value = props.min;
      }

      if (isNumber(props.max) && value > props.max) {
        value = props.max;
      }

      return isNumber(mergedPrecision.value) ? NP.round(value, mergedPrecision.value) : value;
    };

    const updateNumberStatus = (number: number | undefined) => {
      let _isMin = false;
      let _isMax = false;
      if (isNumber(number)) {
        if (number <= props.min) {
          _isMin = true;
        }
        if (number >= props.max) {
          _isMax = true;
        }
      }
      if (isMax.value !== _isMax) {
        isMax.value = _isMax;
      }
      if (isMin.value !== _isMin) {
        isMin.value = _isMin;
      }
    };

    const handleExceedRange = () => {
      const finalValue = getLegalValue(valueNumber.value);
      const stringValue = getStringValue(finalValue);
      if (finalValue !== valueNumber.value || _value.value !== stringValue) {
        _value.value = stringValue;
      }

      emit('update:modelValue', finalValue);
    };

    watch(
      () => props.min,
      (newVal) => {
        const _isMin = isNumber(valueNumber.value) && valueNumber.value <= newVal;
        if (isMin.value !== _isMin) {
          isMin.value = _isMin;
        }

        const isExceedMinValue = isNumber(valueNumber.value) && valueNumber.value < newVal;
        if (isExceedMinValue) {
          handleExceedRange();
        }
      }
    );
    watch(
      () => props.max,
      (newVal) => {
        const _isMax = isNumber(valueNumber.value) && valueNumber.value >= newVal;
        if (isMax.value !== _isMax) {
          isMax.value = _isMax;
        }

        const isExceedMaxValue = isNumber(valueNumber.value) && valueNumber.value > newVal;
        if (isExceedMaxValue) {
          handleExceedRange();
        }
      }
    );

    const nextStep = (method: StepMethods, event: Event) => {
      if (disabled.value || (method === 'plus' && isMax.value) || (method === 'minus' && isMin.value)) {
        return;
      }

      let nextValue: number | undefined;
      if (isNumber(valueNumber.value)) {
        nextValue = getLegalValue(NP[method](valueNumber.value, props.step));
      } else {
        nextValue = props.min === -Infinity ? 0 : props.min;
      }

      _value.value = getStringValue(nextValue);
      updateNumberStatus(nextValue);
      emit('update:modelValue', nextValue);
      emit('change', nextValue, event);
    };

    const handleStepButton = (event: Event, method: StepMethods, needRepeat = false) => {
      event.preventDefault();
      inputRef.value?.focus();

      nextStep(method, event);

      // 长按时持续触发
      if (needRepeat) {
        repeatTimer = window.setTimeout(() => (event.target as HTMLElement).dispatchEvent(event), SPEED);
      }
    };

    const handleInput = (value: string, ev: Event) => {
      value = value.trim().replace(/。/g, '.');
      value = props.parser?.(value) ?? value;

      if (isNumber(Number(value)) || /^(\.|-)$/.test(value)) {
        _value.value = props.formatter?.(value) ?? value;
        updateNumberStatus(valueNumber.value);
        if (props.modelEvent === 'input') {
          emit('update:modelValue', valueNumber.value);
        }
        emit('input', valueNumber.value, _value.value, ev);
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      emit('focus', ev);
    };

    const handleChange = (value: string, ev: Event) => {
      const finalValue = getLegalValue(valueNumber.value);
      const stringValue = getStringValue(finalValue);
      if (finalValue !== valueNumber.value || _value.value !== stringValue) {
        _value.value = stringValue;
        updateNumberStatus(finalValue);
      }

      nextTick(() => {
        if (isNumber(props.modelValue) && props.modelValue !== finalValue) {
          // TODO: verify number
          _value.value = getStringValue(props.modelValue);
          updateNumberStatus(props.modelValue);
        }
      });

      emit('update:modelValue', finalValue);
      emit('change', finalValue, ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      emit('blur', ev);
    };

    const handleClear = (ev: Event) => {
      _value.value = '';
      emit('update:modelValue', undefined);
      emit('change', undefined, ev);
      // eventHandlers.value?.onChange?.(ev);
      emit('clear', ev);
    };

    const onKeyDown = getKeyDownHandler(
      new Map([
        [
          KEYBOARD_KEY.ARROW_UP,
          (ev: Event) => {
            ev.preventDefault();
            !props.readOnly && nextStep('plus', ev);
          },
        ],
        [
          KEYBOARD_KEY.ARROW_DOWN,
          (ev: Event) => {
            ev.preventDefault();
            !props.readOnly && nextStep('minus', ev);
          },
        ],
      ])
    );

    watch(
      () => props.modelValue,
      (value: number | undefined) => {
        if (value !== valueNumber.value) {
          // TODO: verify number
          _value.value = getStringValue(value);
          updateNumberStatus(value);
        }
      }
    );

    const renderSuffix = () => {
      if (props.readOnly) {
        return null;
      }
      return (
        <>
          {slots.suffix?.()}

          <div class={controlButtonsClass.value}>
            <span
              class={['control-button control-inc', { disabled: disabled.value || isMax.value }]}
              onMousedown={(e) => handleStepButton(e, 'plus', true)}
              onMouseup={clearRepeatTimer}
              onMouseleave={clearRepeatTimer}>
              <IncIcon />
            </span>
            <span
              class={['control-button control-dec', { disabled: disabled.value || isMin.value }]}
              onMousedown={(e) => handleStepButton(e, 'minus', true)}
              onMouseup={clearRepeatTimer}
              onMouseleave={clearRepeatTimer}>
              <DecIcon />
            </span>
          </div>
        </>
      );
    };

    const renderPrependButton = () => {
      return (
        <n-button
          icon="minus"
          class={controlButtonsClass.value}
          disabled={disabled.value || isMin.value}
          onMousedown={(ev: MouseEvent) => handleStepButton(ev, 'minus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        />
      );
    };

    const renderAppendButton = () => {
      return (
        <n-button
          icon="add"
          class={controlButtonsClass.value}
          disabled={disabled.value || isMax.value}
          onMousedown={(ev: MouseEvent) => handleStepButton(ev, 'plus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        />
      );
    };

    const render = () => {
      const embedRender = {
        prepend: slots.prepend,
        prefix: slots.prefix,
        suffix: props.hideButton ? slots.suffix : renderSuffix,
        append: slots.append,
      };

      const buttonRender = {
        prepend: props.hideButton ? slots.prepend : renderPrependButton,
        prefix: slots.prefix,
        suffix: slots.suffix,
        append: props.hideButton ? slots.append : renderAppendButton,
      };
      const _slots = props.mode === 'embed' ? embedRender : buttonRender;

      return (
        <n-input
          key={`__nancal__${props.mode}`}
          v-slots={_slots}
          ref={inputRef}
          class={wrapClass.value}
          type="text"
          allowClear={props.allowClear}
          size={mergedSize.value}
          modelValue={_value.value}
          placeholder={props.placeholder}
          disabled={disabled.value}
          readonly={props.readOnly}
          error={props.error}
          inputAttrs={{
            role: 'spinbutton',
            'aria-valuemax': props.max,
            'aria-valuemin': props.min,
            'aria-valuenow': _value.value,
          }}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClear={handleClear}
          onChange={handleChange}
          onKeydown={onKeyDown}
        />
      );
    };

    return {
      inputRef,
      render,
    };
  },
  render() {
    return this.render();
  },
});
