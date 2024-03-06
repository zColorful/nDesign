/**
 * 多选模式下的内容框
 */
import { defineComponent, PropType } from 'vue';
import NTag from '../cascader-tag';
import './index.scss';
export default defineComponent({
  name: 'CTag',
  props: {
    placeholder: String,
    tagList: Array as PropType<any[]>,
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const remove = (tag: string | number) => {
      emit('remove', tag);
    };

    return () => (
      <div class="nancalui-tags-input">
        <div class="nancalui-tags-box">
          {props?.tagList?.length ? (
            props?.tagList.map((item) => {
              return <NTag tag={item} onRemove={remove}></NTag>;
            })
          ) : (
            <div class="nancalui-tags-placeholder">{props.placeholder}</div>
          )}
        </div>
      </div>
    );
  },
});
