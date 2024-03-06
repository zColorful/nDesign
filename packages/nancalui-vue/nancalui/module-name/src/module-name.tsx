import { defineComponent, SetupContext } from 'vue';
import { ModuleNameProps, moduleNameProps } from './module-name-types';
import './module-name.scss';

export default defineComponent({
  name: 'NModuleName',
  props: moduleNameProps,
  setup(props: ModuleNameProps, ctx: SetupContext) {
    return () => (
      <div class={['module-name', props.size]}>
        <div
          class="module-name-border"
          style={{ backgroundColor: props.backgroundColor, width: props.width + 'px', height: props.height + 'px' }}
        />
        <div class="module-name-text" style={{ color: props.color, fontSize: props.fontSize + 'px' }}>
          {ctx.slots.default?.()}
        </div>
      </div>
    );
  },
});
