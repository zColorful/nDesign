import { defineComponent, onMounted, reactive } from 'vue';
import { HandleWidthProps, handleWidthProps } from './handle-width-types';
// import { useNamespace } from '../../shared/hooks/use-namespace';
import './handle-width.scss';

export default defineComponent({
  name: 'NChandleWidth',
  props: handleWidthProps,
  emits: ['widthChange', 'heightChange', 'displayChange'],
  setup(props: HandleWidthProps, { emit, slots }) {
    const state = reactive({
      lastX: 0,
      lastY: 0,
    });
    const mouseMove = (e: MouseEvent) => {
      if (props.type === 'width') {
        emit('widthChange', e.screenX - state.lastX);
        state.lastX = e.screenX;
      } else {
        emit('heightChange', e.screenY - state.lastY);
        state.lastY = e.screenY;
      }
    };
    const handleDiaplay = () => {
      emit('displayChange');
    };
    const mouseDown = (e: MouseEvent) => {
      document.addEventListener('mousemove', mouseMove);
      state.lastX = e.screenX;
      state.lastY = e.screenY;
      e.preventDefault();
    };

    const mouseUp = () => {
      state.lastX = 0;
      state.lastY = 0;
      document.removeEventListener('mousemove', mouseMove);
    };
    onMounted(() => {
      document.addEventListener('mouseup', mouseUp);
    });
    return () => (
      // <div class={['card-container', ns.b(), ns.em('shadow', props.shadow)]}>
      //   {slots.default?.()}
      //   <div class={ns.e('header')}>
      //     {slots.avatar?.() ? <div class={ns.e('avatar')}>{slots.avatar?.()}</div> : ''}
      //     <div>
      //       <div class={ns.e('title')}>{slots.title?.()}</div>
      //       <div class={ns.e('subtitle')}>{slots.subtitle?.()}</div>
      //     </div>
      //   </div>
      //   {src.value !== '' ? <img src={src.value} alt="" class={ns.e('meta')} /> : ''}
      //   <div class={ns.e('content')}>{slots.content?.()}</div>
      //   <div class={alignClass.value}>{slots.actions ? slots.actions?.() : ''}</div>
      // </div>
      <div
        class={['xhandle', props.type]}
        style={{ background: props.bgcolor, borderColor: props.borderColor, [props.type]: props.hwidth + 'px' }}
        onMousedown={mouseDown}>
        {slots.content?.({ handleDiaplay: handleDiaplay })}
      </div>
    );
  },
});
