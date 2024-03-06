import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NPanelFooter',
  setup(props, ctx) {
    return () => {
      const footerContent = ctx.slots.default ? <div class="nancalui-panel-footer">{ctx.slots.default?.()}</div> : null;
      return footerContent;
    };
  },
});
