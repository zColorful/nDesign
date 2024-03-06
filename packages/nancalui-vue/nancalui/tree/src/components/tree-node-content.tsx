import { ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { IInnerTreeNode, useTreeNode, PropIndex } from '../composables';

export default defineComponent({
  name: 'NTreeNodeContent',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
    prop: {
      type: Object as PropType<PropIndex>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data, prop } = toRefs(props);
    const { nodeTitleClass, matchedContents, highlightCls } = useTreeNode(data as ComputedRef<IInnerTreeNode>, prop.value);

    return () => {
      const label = props.prop?.label ? props.prop.label : 'label';
      return (
        <span class={nodeTitleClass.value}>
          {!data.value?.matchedText && data.value[label]}
          {data.value?.matchedText &&
            matchedContents.value.map((item: string, index: number) => (index % 2 === 0 ? item : <span class={highlightCls}>{item}</span>))}
        </span>
      );
    };
  },
});
