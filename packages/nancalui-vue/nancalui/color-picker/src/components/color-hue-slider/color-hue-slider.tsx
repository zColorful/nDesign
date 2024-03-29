import { computed, defineComponent, ref, onMounted } from 'vue';
import { colorPickerHueSliderProps, ColorPickerHueSliderProps } from './color-picker-hue-slider-types';
import { DOMUtils } from '../../utils/dom-dragger';
import { fromHSVA } from '../../utils/color-utils';
import './color-hue-slider.scss';
type ColorPickerColor = NonNullable<ColorPickerHueSliderProps['modelValue']>;
type DefaultTransition = { transition: string };
export default defineComponent({
  name: 'ColorHueSlider',
  props: colorPickerHueSliderProps,
  emits: ['update:modelValue','change'],
  setup(props: ColorPickerHueSliderProps, ctx) {
    const DEFAULT_TRANSITION: DefaultTransition = { transition: 'all 0.3s ease' };
    const barElement = ref<HTMLElement | null>(null);
    const cursorElement = ref<HTMLElement | null>(null);
    const clickTransfrom = ref<DefaultTransition | null>(DEFAULT_TRANSITION);
    const getCursorLeft = () => {
      if (barElement.value && cursorElement.value) {
        const rect = barElement.value.getBoundingClientRect();
        const offsetWidth = cursorElement.value.offsetWidth;
        if (props.modelValue?.hue === 360) {
          return rect.width - offsetWidth / 2;
        }
        return (((props.modelValue as ColorPickerColor).hue % 360) * (rect.width - offsetWidth)) / 360 + offsetWidth / 2;
      }
      return 0;
    };

    const getCursorStyle = computed(() => {
      const left = getCursorLeft();
      return {
        left: left + 'px',
        top: 0,
        ...clickTransfrom.value,
      };
    });

    const onMoveBar = (event: MouseEvent) => {
      event.stopPropagation();
      if (barElement.value && cursorElement.value) {
        const rect = barElement.value.getBoundingClientRect();
        const offsetWidth = cursorElement.value.offsetWidth;
        let left = event.clientX - rect.left;
        left = Math.min(left, rect.width - offsetWidth / 2);
        left = Math.max(offsetWidth / 2, left);
        const hue = Math.round(((left - offsetWidth / 2) / (rect.width - offsetWidth)) * 360);
        ctx.emit(
          'update:modelValue',
          fromHSVA({
            h: hue,
            s: (props.modelValue as ColorPickerColor).hsva.s,
            v: (props.modelValue as ColorPickerColor).hsva.v,
            a: (props.modelValue as ColorPickerColor).hsva.a,
          })
        );
        ctx.emit(
          'change',
          fromHSVA({
            h: hue,
            s: (props.modelValue as ColorPickerColor).hsva.s,
            v: (props.modelValue as ColorPickerColor).hsva.v,
            a: (props.modelValue as ColorPickerColor).hsva.a,
          })
        );
      }
    };

    const onClickSider = (event: Event) => {
      const target = event.target;
      if (target !== barElement.value) {
        onMoveBar(event as MouseEvent);
      }
    };

    onMounted(() => {
      const dragConfig = {
        drag: (event: Event) => {
          clickTransfrom.value = null;
          onMoveBar(event as MouseEvent);
        },
        end: (event: Event) => {
          clickTransfrom.value = DEFAULT_TRANSITION;
          onMoveBar(event as MouseEvent);
        },
      };

      if (barElement.value && cursorElement.value) {
        DOMUtils.triggerDragEvent(barElement.value, dragConfig);
      }
    });
    return () => {
      return (
        <div class="nancalui-color-picker-hue-slider">
          <div ref={barElement} class="nancalui-color-picker-hue-slider__bar" onClick={onClickSider}>
            <div class="nancalui-color-picker-hue-slider__bar-pointer" ref={cursorElement} style={getCursorStyle.value}>
              <div class="nancalui-color-picker-hue-slider__bar-handle"></div>
            </div>
          </div>
        </div>
      );
    };
  },
});
