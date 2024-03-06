import { defineComponent, toRefs, watch, onUnmounted } from 'vue';
import { tagProps, TagProps } from './tag-types';
import { useClass, useColor } from './composables';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tag.scss';

export default defineComponent({
  name: 'NTag',
  props: tagProps,
  emits: ['click', 'tagDelete', 'checkedChange'],
  setup(props: TagProps, { slots, emit }) {
    const ns = useNamespace('tag');
    const { type, color, checked, titleContent, deletable } = toRefs(props);
    const tagClass = useClass(props);
    const themeColor = useColor(props);
    const tagTitle = titleContent.value || '';
    const isDefaultTag = () => !type.value && !color.value;

    const handleClick = (e: MouseEvent) => {
      emit('click', e);
    };
    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      emit('tagDelete', e);
    };
    const closeIconEl = () => {
      return deletable.value ? (
        <a class="remove-button" onClick={handleDelete}>
          <n-icon size="12px" name="close" style="color:inherit" />
          {/* {isDefaultTag() ? <n-icon size="12px" name="close" /> : <n-icon size="12px" name="close" />} */}
        </a>
      ) : null;
    };
    const unWatch = watch(checked, (newVal) => {
      emit('checkedChange', newVal);
    });
    onUnmounted(() => unWatch());

    return () => (
      <div class={ns.b()} onClick={handleClick}>
        <span
          class={tagClass.value}
          style={{
            color: checked.value ? '#447DFD' : themeColor.value,
            backgroundColor: checked.value ? themeColor.value : !color.value ? '' : 'var(--nancalui-base-bg, #ffffff)',
          }}
          title={tagTitle}>
          {slots.default?.()}
          {closeIconEl()}
        </span>
      </div>
    );
  },
});
