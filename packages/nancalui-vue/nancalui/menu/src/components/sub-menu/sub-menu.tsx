import { randomId } from '../../../../shared/utils/random-id';
import type { ComponentInternalInstance, Ref } from 'vue';
import { defineComponent, getCurrentInstance, inject, onMounted, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useClick } from '../../composables/use-click';
import { addLayer, clearSelect, getLayer, pushElement } from '../../composables/use-layer-operate';
import { useNearestMenuElement } from '../../composables/use-nearest-menu-element';
import MenuTransition from '../menu-transition/menu-transition';
import { SubMenuProps, subMenuProps } from './sub-menu-types';
import { useShowSubMenu } from './use-sub-menu';
import { debounce } from 'lodash';

const ns = useNamespace('menu');
const subNs = useNamespace('submenu');

const subMenuClass = subNs.b();

interface clickEvent extends MouseEvent {
  path: HTMLElement[];
}
export default defineComponent({
  name: 'NSubMenu',
  props: subMenuProps,
  setup(props: SubMenuProps, ctx) {
    const isShow = ref(true);
    const {
      vnode: { key },
    } = getCurrentInstance() as ComponentInternalInstance;
    let key_ = String(key);
    const defaultOpenKeys = inject('openKeys') as Ref<string[]>;
    const isOpen = ref(defaultOpenKeys.value.includes(key_));
    const uniqueOpened: any = inject('uniqueOpened');
    const indent = inject('defaultIndent');
    const isCollapsed = inject('isCollapsed') as Ref<boolean>;
    const mode = inject('mode') as Ref<string>;
    const subMenuItemContainer = ref(null) as Ref<null>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentEmit = inject('rootMenuEmit') as (eventName: 'submenu-change', ...args: any[]) => void;
    const wrapper = ref(null);
    let wrapperDom: HTMLElement;
    const subMenu = ref(null);
    const title = ref(null);
    let oldPadding = '';
    const class_layer = ref('');
    const isHorizontal = mode.value === 'horizontal';
    if (key_ === 'null') {
      console.warn(`[nancalui][menu]: Key can not be null`);
      key_ = `randomKey-${randomId(16)}`;
    }
    const clickHandle = (e: MouseEvent, isLeave = false) => {
      e.stopPropagation();
      const ele = useNearestMenuElement(e.target as HTMLElement);
      if (ele.classList.contains(subMenuClass) && isHorizontal) {
        return;
      }
      if (isHorizontal) {
        clearSelect(ele, e, true);
        useClick(e as clickEvent);
      }
      if (!props.disabled && mode.value !== 'horizontal') {
        const cur = useNearestMenuElement(e.target as HTMLElement);
        const idx = defaultOpenKeys.value.indexOf(key_);
        if (idx >= 0 && cur.tagName === 'UL') {
          defaultOpenKeys.value.splice(idx, 1);
        } else {
          if (cur.tagName === 'UL') {
            if (uniqueOpened.value) {
              const parentKey = ele.getAttribute('parentKey');
              if (!parentKey || !defaultOpenKeys.value.includes(parentKey)) {
                defaultOpenKeys.value.length = 0;
              }
            }
            defaultOpenKeys.value.push(key_);
          }
        }
        if (isLeave) {
          isOpen.value = false;
        } else {
          isOpen.value = defaultOpenKeys.value.indexOf(key_) >= 0;
        }
        // 计算垂直菜单折叠状态下二级菜单的位置，采用fixed，防止滚动渲染遮挡
        if (!isCollapsed.value) {
          (subMenuItemContainer.value as unknown as Element as HTMLElement).style.position = 'unset';
        } else {
          if (isOpen.value && !isHorizontal) {
            const { top, right, bottom } = (subMenu.value as unknown as Element as HTMLElement).getBoundingClientRect();
            (subMenuItemContainer.value as unknown as Element as HTMLElement).style.position = 'fixed';
            if (window.innerHeight - top > 400) {
              (subMenuItemContainer.value as unknown as Element as HTMLElement).style.top = top + 'px';
              (subMenuItemContainer.value as unknown as Element as HTMLElement).style.bottom = 'unset';
            } else {
              (subMenuItemContainer.value as unknown as Element as HTMLElement).style.top = 'unset';
              (subMenuItemContainer.value as unknown as Element as HTMLElement).style.bottom = window.innerHeight - bottom + 'px';
            }
            (subMenuItemContainer.value as unknown as Element as HTMLElement).style.left = right + 10 + 'px';
          }
        }
        parentEmit('submenu-change', {
          type: 'submenu-change',
          state: isOpen.value,
          key: key_,
          el: ele,
        });
      }
    };

    watchEffect(
      () => {
        wrapperDom = wrapper.value as unknown as HTMLElement;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pushElement({ el: subMenu.value } as any);
      },
      { flush: 'post' }
    );
    watch(
      () => defaultOpenKeys,
      (n) => {
        if (n.value.includes(key_)) {
          isOpen.value = true;
        } else {
          isOpen.value = false;
        }
      },
      { deep: true }
    );
    const onHide = () => {
      isOpen.value = false;
      const idx = defaultOpenKeys.value.indexOf(key_);
      if (idx >= 0) {
        defaultOpenKeys.value.splice(idx, 1);
      }
    };
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onHide);
    });
    onMounted(() => {
      const subMenuTitle = title.value as unknown as HTMLElement;
      const subMenuWrapper = subMenu.value as unknown as HTMLElement;
      addLayer();
      class_layer.value = `layer_${Array.from(subMenuWrapper.classList).at(-1)?.replace('layer_', '')}`;
      const parentCL = subMenuWrapper.parentElement?.classList;
      const isCollapsedMenu = [...(parentCL as any)].indexOf('nancalui-menu-collapsed');
      if (isHorizontal && !props.disabled) {
        (subMenu.value as unknown as Element as HTMLElement).addEventListener('mouseenter', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseenter', ev, wrapperDom);
        });
        (subMenu.value as unknown as Element as HTMLElement).addEventListener('mouseleave', (ev: MouseEvent) => {
          ev.stopPropagation();
          useShowSubMenu('mouseleave', ev, wrapperDom);
        });
      }
      if (isCollapsedMenu !== -1 && !isHorizontal && props.isHover) {
        (subMenu.value as unknown as Element as HTMLElement).removeEventListener('click', clickHandle);
        (subMenu.value as unknown as Element as HTMLElement).addEventListener(
          'mouseenter',
          debounce((ev: MouseEvent) => {
            ev.stopPropagation();
            clickHandle(ev);
          }, 100)
        );
        (subMenu.value as unknown as Element as HTMLElement).addEventListener(
          'mouseleave',
          debounce((ev: MouseEvent) => {
            ev.stopPropagation();
            clickHandle(ev, true);
          }, 100)
        );
      }
      window.addEventListener('scroll', onHide);
      watch(isCollapsed, (newValue) => {
        // 折叠时，把展开的二级菜单收起
        if (isOpen.value) {
          isOpen.value = !isOpen.value;
        }
        const layer = Number(getLayer(subMenuWrapper));
        if (!Number.isNaN(layer)) {
          layer > 2 && (isShow.value = !isCollapsed.value);
        }
        if (newValue) {
          subMenuTitle.style.padding !== '0' && (oldPadding = subMenuTitle.style.padding);
          setTimeout(() => {
            subMenuTitle.style.padding = '0';
            subMenuTitle.style.width = '';
            subMenuTitle.style.textAlign = `center`;
          }, 300);
          subMenuTitle.style.display = `block`;
        } else {
          subMenuTitle.style.padding = `${oldPadding}`;
          subMenuTitle.style.textAlign = ``;
          subMenuTitle.style.display = `flex`;
        }
      });
    });

    return () => {
      return (
        <ul
          v-show={isShow.value}
          onClick={clickHandle}
          class={[subMenuClass, class_layer.value, props['disabled'] && `${subMenuClass}-disabled`]}
          ref={subMenu}
        >
          <div
            class={`${subMenuClass}-title ${isCollapsed.value ? 'collapsedSpanSub' : 'normalSpanSub'}`}
            style={`padding: 0 ${indent}px ${isCollapsed.value ? '5px' : '0'};height:auto`}
            ref={title}
          >
            {ctx.slots.icon !== undefined && <span class={`${ns.b()}-icon`}>{ctx.slots.icon?.()}</span>}
            <span class={`${subMenuClass}-title-content`}>{props.title}</span>
            <i
              v-show={!isCollapsed.value && key !== 'overflowContainer'}
              class={{
                'icon icon-chevron-up': class_layer.value !== `layer_${subMenuClass}`,
                'icon icon-chevron-right': class_layer.value === `layer_${subMenuClass}`,
                'is-opened': isOpen.value,
              }}
            ></i>
          </div>
          {isHorizontal ? (
            <div
              class={`${ns.b()}-item-horizontal-wrapper ${ns.b()}-item-horizontal-wrapper-hidden`}
              ref={wrapper}
              v-show={!props.disabled}
            >
              {ctx.slots.default?.()}
            </div>
          ) : (
            <MenuTransition>
              <div class={[`${subMenuClass}-menu-item-vertical-wrapper`]} ref={subMenuItemContainer} v-show={isOpen.value}>
                {ctx.slots.default?.()}
              </div>
            </MenuTransition>
          )}
        </ul>
      );
    };
  },
});
