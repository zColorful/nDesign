import { defineComponent, toRefs } from 'vue';
import { CustomizeStepsProps, customizeStepsProps } from './customize-steps-types';
import { Icon } from '../../icon';
import './customize-steps.scss';
export default defineComponent({
  name: 'NCustomizeSteps',
  props: customizeStepsProps,

  setup(props: CustomizeStepsProps, {}) {
    const { stepsData, nowIndex, icon, iconClass } = toRefs(props);

    return () => (
      <div class="box-steps">
        {stepsData?.value &&
          stepsData.value.length >= 1 &&
          stepsData.value.map((item: any, index) => (
            <div
              key={index}
              class={{
                step: true,
                active: index === nowIndex.value,
                finished: index < nowIndex.value,
              }}
              style={{ width: `${100 / stepsData.value.length}` + '%' }}>
              <div class="step-words">
                {index < nowIndex.value ? (
                  <div class="step-nub">
                    {icon.value && <Icon name={icon.value} size="var(--nancalui-font-size, 12px)" color="" class={iconClass.value} />}
                  </div>
                ) : (
                  <div class="step-nub">{index + 1}</div>
                )}
                {<span> {item.label}</span>}
              </div>
              {index !== stepsData.value.length - 1 ? <div class="step-line"></div> : ''}
            </div>
          ))}
      </div>
    );
  },
});
