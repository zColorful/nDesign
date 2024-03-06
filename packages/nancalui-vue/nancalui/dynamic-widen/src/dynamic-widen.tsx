import { defineComponent, onMounted, ref } from 'vue';
import { DynamicWidenProps, dynamicWidenProps } from './dynamic-widen-types';
import './dynamic-widen.scss';
import NChandleWidth from '../../handle-width/src/handle-width';
export default defineComponent({
  name: 'NCdynamicWiden',
  components: {
    NChandleWidth,
  },
  props: dynamicWidenProps,
  setup(props: DynamicWidenProps, { slots }) {
    const width = ref(props.pwidth);
    const visible = ref(true);
    const leftNode = ref();
    const rightNode = ref();
    const widthChange = (movement: number) => {
      width.value += movement;
      if (width.value < 0) {
        width.value = 0;
      } else if (width.value > 500) {
        width.value = 500;
      } else {
        leftNode.value.style.setProperty('--lwidth', width.value + 'px');
        rightNode.value.style.setProperty('--rwidth', 'calc(100% - ' + (width.value + props.hwidth) + 'px)');
      }
    };
    const displayChange = () => {
      visible.value = !visible.value;
      if (visible.value) {
        width.value = props.pwidth;
      } else {
        width.value = 0;
      }

      leftNode.value.style.setProperty('--lwidth', width.value + 'px');
      rightNode.value.style.setProperty('--rwidth', 'calc(100% - ' + (width.value + props.hwidth) + 'px)');
    };
    onMounted(() => {
      leftNode.value.style.setProperty('--lwidth', props.pwidth + 'px');
      rightNode.value.style.setProperty('--rwidth', 'calc(100% - ' + (props.pwidth + props.hwidth) + 'px)');
    });
    return () => (
      <div class="container-main">
        <div class="container-left" ref={leftNode}>
          {slots.left?.()}
        </div>
        <NChandleWidth
          class="myxhandle"
          bgcolor={props.bgcolor}
          borderColor={props.borderColor}
          hwidth={props.hwidth}
          onDisplayChange={displayChange}
          onWidthChange={widthChange}>
          {{ content: ({ handleDiaplay }: any) => slots.hwContent?.({ handleDiaplay }) }}
        </NChandleWidth>
        <div class="container-right" ref={rightNode}>
          {slots.right?.()}
        </div>
      </div>
    );
  },
});
