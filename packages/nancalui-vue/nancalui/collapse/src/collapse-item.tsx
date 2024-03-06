import { defineComponent, computed, inject, Transition, onMounted, shallowRef, ref, watch } from 'vue';
import { collapseItemProps } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import OpenIcon from './collapse-open-icon';
import { SELECT_TOKEN } from './const';

export default defineComponent({
  name: 'NCollapseItem',
  props: collapseItemProps,
  setup(props, ctx) {
    const ns = useNamespace('collapse');
    const transitionNs = useNamespace('collapse-transition');
    const collapseContent = shallowRef<any>();
    const collapse = inject(SELECT_TOKEN, null);
    const v: any = ref([]);
    const isOpen: any = computed(() => {
      if (props.disabled) {
        return false;
      }
      if (Array.isArray(v.value)) {
        return Boolean(v.value.length) && v.value.includes(props.name);
      } else {
        return Boolean(v.value) && v.value === props.name;
      }
    });
    watch(
      () => collapse?.activeNames,
      (val) => {
        v.value = val;
      },
      {
        immediate: true,
      }
    );
    const handlerTitleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!props.disabled) {
        collapse?.collapseItemClick(props.name);
      }
    };

    // slide up down transition
    onMounted(() => {
      if (collapseContent.value) {
        const dom = collapseContent.value;
        if (isOpen.value) {
          // dom.style.height = `${dom.offsetHeight}px`;
        }
      }
    });
    const enter = (element: Element) => {
      const el = element as HTMLElement;
      // el.style.height = '';
      // const height = el.offsetHeight;
      // el.style.height = '0px';
      // // 需要执行一次才会生效
      // el.offsetHeight;
      el.style.display = `block`;
    };
    const leave = (element: Element) => {
      const el = element as HTMLElement;
      el.style.display = `none`;
      // el.style.height = '0px';
    };
    return {
      ns,
      transitionNs,
      collapseContent,
      isOpen,
      handlerTitleClick,
      enter,
      leave,
      ctx,
      props,
    };
  },
  render() {
    return (
      <div class={this.ns.e('item')}>
        <div
          class={[
            this.ns.e('item-title'),
            this.ns.m('overflow-ellipsis'),
            this.isOpen && this.ns.m('open'),
            this.props.disabled && this.ns.em('item', 'disabled'),
          ]}
          onClick={this.handlerTitleClick}>
          {this.ctx.slots.title ? this.ctx.slots.title() : this.props.title}
          <span class={this.ns.e('open-icon')}>
            <OpenIcon />
          </span>
        </div>
        <Transition name={this.transitionNs.b()} onEnter={this.enter} onLeave={this.leave}>
          <div ref={this.collapseContent} class={this.ns.e('item-content')} style={{ display: this.isOpen ? 'block' : 'none' }}>
            {this.ctx.slots.default?.()}
          </div>
        </Transition>
      </div>
    );
  },
});
