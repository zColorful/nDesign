/**
 * 多选模式下的内容框中的选中tag
 * tag组件还未开发完成，所以暂时使用自定义组件
 */
import { defineComponent, PropType } from 'vue';
import { CascaderOption, CascaderOptionInfo } from '../../src/interface';
import './index.scss';

interface PropsType {
  tag: CascaderOption;
}

export default defineComponent({
  name: 'CTag',
  props: {
    tag: Object as PropType<CascaderOption>,
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const deleteCurrentTag = (e: Event) => {
      e.stopPropagation();
      emit('remove', props.tag?.value);
    };
    return () => (
      <div class="nancalui-cascader-tag">
        <span>{props.tag?.label || props.tag?.value}</span>
        <div class="nancalui-cascader-tag__close" onClick={deleteCurrentTag}>
          <n-icon name="close"></n-icon>
        </div>
      </div>
    );
  },
});
