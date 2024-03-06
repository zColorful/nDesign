import { computed, defineComponent, getCurrentInstance, inject, toRefs } from 'vue';
import { stepProps, StepProps } from './step-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import { ACTIVE_STEP, STEPS, STEPS_PROPS } from './const';
import './step.scss';

export default defineComponent({
  name: 'NStep',
  props: stepProps,
  setup(props: StepProps, { slots }) {
    const { title, description, icon, status } = toRefs(props);
    const ns = useNamespace('step');
    const instance = getCurrentInstance();

    const activeStep = inject(ACTIVE_STEP);

    const steps = inject(STEPS);
    steps.value.push(instance);

    const stepsProps = inject(STEPS_PROPS);

    const currentStepIndex = steps.value.indexOf(instance);

    const stepClass = computed(() => {
      const activeClass = activeStep.value === currentStepIndex ? ' active' : '';
      const finishedClass = activeStep.value > currentStepIndex ? ' finished' : '';
      const centerClass = stepsProps.alignCenter ? ' center' : '';
      const statusClass = status?.value ? ` ${status?.value}` : '';
      const simpleClass = stepsProps.simple ? ` ${ns.m('simple')}` : '';
      const labelRightClass = stepsProps.labelRight ? ` label-right` : '';


      return `${ns.b()}${activeClass}${finishedClass}${centerClass}${statusClass}${simpleClass}${labelRightClass}`;
    });
    const stepStyle = computed(() => {
      const styleObj = {};

      if (stepsProps.space) {
        styleObj.width = `${stepsProps.space}px`;
      } else {
        styleObj.flexBasis =
          stepsProps.alignCenter || stepsProps.simple ? `${100 / steps.value.length}%` : `${100 / (steps.value.length - 1)}%`;
      }
      return styleObj;
    });

    const iconColor = computed(() => {
      const isActive = activeStep.value === currentStepIndex;
      const isFinished = activeStep.value > currentStepIndex;

      return isActive ? 'var(--nancalui-brand)' : isFinished ? 'var(--nancalui-brand)' : 'var(--nancalui-placeholder)';
    });

    const statusMap = {
      finish: <svg version="1.1" width="24px" height="24px" viewBox="0 0 24.0 24.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><clipPath id="i0"><path d="M1440,0 L1440,2062 L0,2062 L0,0 L1440,0 Z"></path></clipPath><clipPath id="i1"><path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z"></path></clipPath><clipPath id="i2"><path d="M10.3366146,0 L11.7508282,1.41421356 L4.47876434,8.68627743 L0,4.20751309 L1.41421356,2.79329953 L4.47876434,5.85785031 L10.3366146,0 Z"></path></clipPath></defs><g transform="translate(-106.0 -390.0)"><g clip-path="url(#i0)"><g transform="translate(90.0 390.0)"><g transform="translate(16.0 0.0)"><g clip-path="url(#i1)"><polygon points="0,0 24,0 24,24 0,24 0,0" stroke="none" fill="#FFFFFF"></polygon><path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" stroke="#447CFD" stroke-width="4" fill="none" stroke-miterlimit="5"></path></g><g transform="translate(6.292893218813451 8.292893218813454)"><g clip-path="url(#i2)"><polygon points="0,0 11.7508282,0 11.7508282,8.68627743 0,8.68627743 0,0" stroke="none" fill="#447CFD"></polygon></g></g></g></g></g></g></svg>,
      success: <svg version="1.1" width="24px" height="24px" viewBox="0 0 24.0 24.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><clipPath id="i0"><path d="M1440,0 L1440,2062 L0,2062 L0,0 L1440,0 Z"></path></clipPath><clipPath id="i1"><path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z"></path></clipPath><clipPath id="i2"><path d="M10.3366146,0 L11.7508282,1.41421356 L4.47876434,8.68627743 L0,4.20751309 L1.41421356,2.79329953 L4.47876434,5.85785031 L10.3366146,0 Z"></path></clipPath></defs><g transform="translate(-106.0 -390.0)"><g clip-path="url(#i0)"><g transform="translate(90.0 390.0)"><g transform="translate(16.0 0.0)"><g clip-path="url(#i1)"><polygon points="0,0 24,0 24,24 0,24 0,0" stroke="none" fill="#FFFFFF"></polygon><path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" stroke="#447CFD" stroke-width="4" fill="none" stroke-miterlimit="5"></path></g><g transform="translate(6.292893218813451 8.292893218813454)"><g clip-path="url(#i2)"><polygon points="0,0 11.7508282,0 11.7508282,8.68627743 0,8.68627743 0,0" stroke="none" fill="#447CFD"></polygon></g></g></g></g></g></g></svg>,
      error: <Icon name="warning-o" color="var(--nancalui-danger)" size="24px"></Icon>,
    };

    const renderDot = () => {
      return slots.icon ? (
        slots.icon?.(iconColor.value)
      ) : icon.value ? (
        <Icon name={icon.value} color={iconColor.value} size="24px"></Icon>
      ) : status.value && statusMap[status.value] ? (
        statusMap[status.value]
      ) : activeStep.value > steps.value.indexOf(instance) ? (
        <svg version="1.1" width="24px" height="24px" viewBox="0 0 24.0 24.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><clipPath id="i0"><path d="M1440,0 L1440,2062 L0,2062 L0,0 L1440,0 Z"></path></clipPath><clipPath id="i1"><path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z"></path></clipPath><clipPath id="i2"><path d="M10.3366146,0 L11.7508282,1.41421356 L4.47876434,8.68627743 L0,4.20751309 L1.41421356,2.79329953 L4.47876434,5.85785031 L10.3366146,0 Z"></path></clipPath></defs><g transform="translate(-106.0 -390.0)"><g clip-path="url(#i0)"><g transform="translate(90.0 390.0)"><g transform="translate(16.0 0.0)"><g clip-path="url(#i1)"><polygon points="0,0 24,0 24,24 0,24 0,0" stroke="none" fill="#FFFFFF"></polygon><path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" stroke="#447CFD" stroke-width="4" fill="none" stroke-miterlimit="5"></path></g><g transform="translate(6.292893218813451 8.292893218813454)"><g clip-path="url(#i2)"><polygon points="0,0 11.7508282,0 11.7508282,8.68627743 0,8.68627743 0,0" stroke="none" fill="#447CFD"></polygon></g></g></g></g></g></g></svg>
      ) : (
        <span class={ns.e('dot')}>{currentStepIndex + 1}</span>
      );
    };

    return () => {
      return (
        <>
          {stepsProps.simple ? (
            <div class={stepClass.value} style={stepStyle.value}>
              {title.value}
            </div>
          ) : (
            stepsProps.labelRight ? (
              <div class={stepClass.value} style={stepStyle.value}>
                <div class={ns.e('dot-container')}>
                  {renderDot()}
                  <div class={ns.e('content')}>
                    <span class={ns.e('title')}>{title.value}</span>
                    {description.value && <span class={ns.e('description')}>{description.value}</span>}
                  </div>
                  <div class={ns.e('line')}></div>
                </div>
              </div>
            ) : (
              <div class={stepClass.value} style={stepStyle.value}>
                <div class={ns.e('dot-container')}>
                  {renderDot()}
                  <div class={ns.e('line')}></div>
                </div>
                <div class={ns.e('content')}>
                  <span class={ns.e('title')}>{title.value}</span>
                  {description.value && <span class={ns.e('description')}>{description.value}</span>}
                </div>
              </div>
            )
          )}
        </>
      );
    };
  },
});
