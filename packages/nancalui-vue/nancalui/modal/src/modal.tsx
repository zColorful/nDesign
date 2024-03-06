import { computed, defineComponent, ref, Teleport, toRefs, Transition, watch, nextTick, onMounted, initCustomFormatter } from 'vue';
import { modalProps, ModalProps, ModalType } from './modal-types';
import { Fullscreen } from '../../fullscreen/';
import { Icon } from '../../icon';
import { FixedOverlay } from '../../overlay';
import { useModal, useModalRender } from './composables/use-modal';
import { useDraggable } from './composables/use-draggable';
import NModalHeader from './components/header';
import NModalBody from './components/body';
import NModalClose from './components/close';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';

interface TypeList {
  type: ModalType;
  text: string;
  icon: string;
}

export default defineComponent({
  name: 'NModal',
  inheritAttrs: false,
  props: modalProps,
  emits: ['update:modelValue', 'close'],
  setup(props: ModalProps, { slots, attrs, emit }) {
    const ns = useNamespace('modal');
    const { modelValue, title, showClose, showOverlay, appendToBody, closeOnClickOverlay, keepLast, fullscreen, bodyMaxHeight, bodyClass } =
      toRefs(props);
    const { execClose } = useModal(props, emit);
    useModalRender(props);
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const bodyRef = ref<HTMLElement>();
    const isFullscreen = ref<boolean>(false);
    const isForm = ref<boolean>(false);
    const draggable = computed(() => {
      if (fullscreen.value) {
        return false;
      } else {
        return props.draggable;
      }
    });
    const { clearPosition, modalPosition } = useDraggable(dialogRef, headerRef, draggable);
    watch(modelValue, (val) => {
      console.log(val, 'val');
      if (val) {
        nextTick(() => {
          const arr: any = bodyRef.value?.children || [];
          const node: HTMLHtmlElement = arr[arr.length - 1];
          if (node.tagName === 'FORM') {
            isForm.value = true;
          }
          fullscreen.value && (isFullscreen.value = true);
        });
      } else {
        isFullscreen.value = false;
        execClose();
      }
      if (val && !keepLast.value) {
        clearPosition();
      }
    });

    const renderType = () => {
      const typeList: TypeList[] = [
        {
          type: 'success',
          text: '成功',
          icon: 'right-o',
        },
        {
          type: 'failed',
          text: '错误',
          icon: 'error-o',
        },
        {
          type: 'warning',
          text: '警告',
          icon: 'warning-o',
        },
        {
          type: 'info',
          text: '信息',
          icon: 'info-o',
        },
      ];
      const item = typeList.find((i) => i.type === props.type);
      return (
        <div style={{ cursor: props.draggable ? 'move' : 'default' }} ref={headerRef}>
          <NModalHeader>
            <div class="type-content">
              <div class="type-content-icon">
                <Icon name={item?.icon}></Icon>
              </div>
              <div class="type-content-text">{item?.text}</div>
            </div>
          </NModalHeader>
        </div>
      );
    };

    // 渲染主要内容方法
    const renderContent = () => {
      return (
        <>
          {showClose.value && (
            <div onClick={execClose} class="btn-close">
              <NModalClose name="close" size="20px"></NModalClose>
            </div>
          )}
          {props.type ? (
            renderType()
          ) : (
            <div style={{ cursor: props.draggable ? 'move' : 'default' }} ref={headerRef}>
              {slots.header
                ? slots.header()
                : title.value && (
                  <NModalHeader>
                    <span class={ns.e('title')}> {title.value}</span>
                  </NModalHeader>
                )}
            </div>
          )}
          <NModalBody class={bodyClass?.value} maxHeight={bodyMaxHeight?.value}>
            <div ref={bodyRef}>{slots.default?.()}</div>
          </NModalBody>
          {slots.footer?.()}
        </>
      );
    };
    return () => (
      <Teleport to="body" disabled={!appendToBody.value}>
        {showOverlay.value && (
          <FixedOverlay
            modelValue={modelValue.value}
            {...{ 'onUpdate:modelValue': execClose }}
            class={ns.e('overlay')}
            lock-scroll={false}
            close-on-click-overlay={closeOnClickOverlay.value}
            style={{ zIndex: 'calc(var(--nancalui-z-index-modal, 1050) - 1)' }}
          />
        )}
        <Transition name={props.showAnimation ? ns.m('wipe') : ''}>
          {modelValue.value && (
            <Fullscreen modelValue={isFullscreen.value}>
              {isFullscreen.value ? (
                <div class={ns.e('fullscreen')}>{renderContent()}</div>
              ) : (
                <div
                  ref={dialogRef}
                  class={[ns.b(), isForm.value ? ns.e('isPadding') : '']}
                  {...attrs}
                  onClick={(e: Event) => e.stopPropagation()}
                  style={{ transform: modalPosition.value, width: props.width }}>
                  {renderContent()}
                </div>
              )}
            </Fullscreen>
          )}
        </Transition>
      </Teleport>
    );
  },
});
