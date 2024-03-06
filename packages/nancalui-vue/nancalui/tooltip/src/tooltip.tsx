import { computed, CSSProperties, defineComponent, provide, ref, Teleport, toRefs, Transition } from 'vue';
import { TriggerPosition } from '../../shared/_utils/constant';
import { Trigger } from '../../shared/components/trigger';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { emits, tProps, TProps } from './interface';
import './tooltip.scss';

export default defineComponent({
  name: 'NTooltip',
  props: tProps,
  emits,
  setup(props: TProps, { slots, emit }) {
    const ns = useNamespace('tooltip');
    const _popupVisible = ref(props.defaultPopupVisible);
    const computedPopupVisible = computed(() => props.popupVisible ?? _popupVisible.value);

    const handlePopupVisibleChange = (visible: boolean) => {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    };

    const contentCls = computed(() => [ns.e('content'), props.contentClass, { [ns.e('mini')]: props.mini }]);

    const computedContentStyle = computed<CSSProperties | undefined>(() => {
      if (props.backgroundColor || props.contentStyle) {
        return {
          backgroundColor: props.backgroundColor,
          ...props.contentStyle,
        };
      }
      return undefined;
    });

    const arrowCls = computed(() => [ns.e(`popup-arrow`), props.arrowClass]);

    const computedArrowStyle = computed<CSSProperties | undefined>(() => {
      if (props.backgroundColor || props.arrowStyle) {
        return {
          backgroundColor: props.backgroundColor,
          ...props.arrowStyle,
        };
      }
      return undefined;
    });

    return () => (
      <Trigger
        class={ns.b()}
        trigger="hover"
        position={props.position}
        popupVisible={computedPopupVisible.value}
        popupOffset={props.popupOffset}
        showArrow={props.showArrow}
        contentClass={contentCls.value}
        contentStyle={computedContentStyle.value}
        arrowClass={arrowCls.value}
        arrowStyle={computedArrowStyle.value}
        popupContainer={props.popupContainer as any}
        animationName="zoom-in-fade-out"
        autoFitTransformOrigin
        mouseEnterDelay={props.mouseEnterDelay}
        mouseLeaveDelay={props.mouseLeaveDelay}
        popupHoverStay={props.enterable}
        onPopupVisibleChange={handlePopupVisibleChange}
        disabled={props.disabled}
        v-slots={{
          content: () => slots.content?.() ?? <div v-html={props.content}></div>,
        }}>
        {slots.default?.()}
      </Trigger>
    );
  },
});
