import { defineComponent, computed, SetupContext } from 'vue';
import { sliderProps, SliderProps } from './slider-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { isFunction } from '../../shared/utils';
import { useSliderEvent } from './use-slider';
import { Tooltip } from '../../tooltip';
import './slider.scss';

export default defineComponent({
  name: 'NSlider',
  props: sliderProps,
  emits: ['update:modelValue', 'change'],
  setup(props: SliderProps, ctx: SetupContext) {
    const ns = useNamespace('slider');
    const { sliderRunway, popoverShow, percentDisplay, currentValue, handleRunwayMousedown, handleButtonMousedown } = useSliderEvent(
      props,
      ctx
    );

    const disableClass = computed(() => {
      return props.disabled ? ' disabled' : '';
    });

    const tipsContent = computed(
      () => (props.tipsRenderer && isFunction(props.tipsRenderer) ? props.tipsRenderer(currentValue.value) : currentValue.value) as string
    );

    return () => (
      <div class={ns.b()}>
        <div
          ref={sliderRunway}
          class={[ns.e('runway'), disableClass.value]}
          onMousedown={handleRunwayMousedown}
          onMouseout={() => (popoverShow.value = false)}>
          <div class={[ns.e('bar'), disableClass.value]} style={{ width: percentDisplay.value }}></div>
          <Tooltip popupVisible={popoverShow.value} class={ns.e('popover')}>
            {{
              default: () => (
                <div
                  class={[ns.e('button'), disableClass.value]}
                  style={{ left: percentDisplay.value }}
                  onMousedown={handleButtonMousedown}
                  onMouseenter={() => (popoverShow.value = true)}
                  onMouseout={() => (popoverShow.value = false)}
                />
              ),
              content: () => <div class={ns.e('popover-content')}>{tipsContent.value}</div>,
            }}
          </Tooltip>

          {/* {props.tipsRenderer === null ? null : popoverShow.value ? (
            <div class={ns.e('popover')} style={{ left: percentDisplay.value }}>
              <div class={ns.e('popover-arrow')}></div>
              <div class={ns.e('popover-content')}>{tipsContent.value}</div>
            </div>
          ) : null} */}
        </div>
      </div>
    );
  },
});
