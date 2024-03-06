import { defineComponent, Teleport, Transition } from 'vue';
import { drawerProps, DrawerProps } from './drawer-types';
import DrawerOverlay from './components/drawer-overlay';
import { useDrawer } from './use-drawer';
import './drawer.scss';
import ModuleName from '../../module-name/src/module-name';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NDrawer',
  inheritAttrs: false,
  props: drawerProps,
  emits: ['close', 'update:modelValue', 'open'],
  setup(props: DrawerProps, { emit, slots, attrs }) {
    const ns = useNamespace('drawer');
    const { overlayRef, drawerRef, drawerClasses, handleOverlayClick } = useDrawer(props, emit);
    return () => (
      <Teleport to="body">
        {props.showOverlay && (
          <DrawerOverlay ref={overlayRef} visible={props.modelValue} style={{ zIndex: props.zIndex - 1 }} onClick={handleOverlayClick} />
        )}
        <Transition name={`drawer-fly-${props.position}`}>
          {props.modelValue && (
            <div ref={drawerRef} class={drawerClasses.value} style={{ zIndex: props.zIndex, width: props.size + 'px' }} {...attrs}>
              {props.title && (<div class={ns.e('title')}><ModuleName>{props.title}</ModuleName></div>)}
              {slots.default?.()}
            </div>
          )}
        </Transition>
      </Teleport>
    );
  },
});
