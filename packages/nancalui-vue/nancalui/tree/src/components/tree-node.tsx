import type { ComputedRef, ComponentInternalInstance } from 'vue';
import { getCurrentInstance, ref, computed, defineComponent, inject, renderSlot, toRefs, useSlots, watch } from 'vue';
import { NODE_HEIGHT, TREE_INSTANCE, USE_TREE_TOKEN } from '../const';
import { treeNodeProps, TreeNodeProps } from '../tree-types';
import { IInnerTreeNode, IUseTree, useTreeNode } from '../composables';
import NTreeNodeToggle from './tree-node-toggle';
import NTreeNodeLoading from './tree-node-loading';
import { Checkbox } from '../../../checkbox';
import NTreeNodeContent from './tree-node-content';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { omit } from '../../../shared/utils';
import { formatCheckStatus } from '../utils';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'NTreeNode',
  props: treeNodeProps,
  emits: ['saveDragData', 'saveDropType'],
  setup(props: TreeNodeProps, { slots, emit }) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTree', app);

    const { data, check, dragdrop, operate, canDragNode, canDropNode, dragData, dropType, prop } = toRefs(props);
    const {
      toggleSelectNode,
      toggleCheckNode,
      toggleNode,
      getChildren,
      insertBefore,
      removeNode,
      getNode,
      onDragstart,
      onDragover,
      onDragleave,
      onDrop,
      onDragend,
    } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;

    const treeInstance = inject(TREE_INSTANCE) as ComponentInternalInstance | null;
    const ns = useNamespace('tree');
    const { nodeClass, nodeStyle, nodeContentClass, nodeVLineClass, nodeVLineStyles, nodeHLineClass, nodeOperationAreaClass } = useTreeNode(
      data as ComputedRef<IInnerTreeNode>,
      prop.value
    );
    const halfChecked = computed(() => {
      if (!data.value?.checked) {
        return false;
      }
      const checkFormat = formatCheckStatus(check.value);
      if (['upward', 'both'].includes(checkFormat)) {
        const children = getChildren?.(data.value) || [];
        const checkedChildren = children?.filter((item: IInnerTreeNode) => item.checked);
        return checkedChildren.length > 0 && checkedChildren.length < children.length;
      } else {
        return false;
      }
    });

    const checkboxProps = computed(() => {
      return {
        key: data.value?.id,
        disabled: data.value?.disableCheck,
        halfChecked: halfChecked.value,
        modelValue: data.value?.checked,
        'onUpdate:modelValue': () => {
          toggleCheckNode?.(data.value);
        },
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
        },
      };
    });

    const isShowOperationArea = ref(false);

    const showOperationArea = () => {
      isShowOperationArea.value = true;
    };

    const hideOperationArea = () => {
      isShowOperationArea.value = false;
    };
    const verifyDragNode = (event: DragEvent, dragNode: IInnerTreeNode): void => {
      if (canDragNode.value ? canDragNode.value(dragNode) : true) {
        emit('saveDragData', dragNode);
        onDragstart?.(event, dragNode);
      }
    };
    const verifyDropNode = (event: DragEvent, dropNode: IInnerTreeNode): void => {
      const res = dragData.value && (canDropNode.value ? canDropNode.value(dragData.value, dropNode, dropType.value) : true);
      localStorage.setItem('saveDropData', JSON.stringify(dropNode));
      localStorage.setItem('dropRes', res);
      onDrop?.(event, dropNode, res);
    };
    return () => {
      let dragdropProps = {};
      if (dragdrop.value && !data.value?.disableSelect) {
        dragdropProps = {
          draggable: true,
          onDragstart: (event: DragEvent) => verifyDragNode(event, data.value),
          onDragover: (event: DragEvent) => {
            emit('saveDropType', onDragover?.(event));
          },
          onDragleave: (event: DragEvent) => onDragleave?.(event),
          onDrop: (event: DragEvent) => verifyDropNode(event, data.value),
          onDragend: (event: DragEvent) => {
            const result = onDragend?.(event);
            if (JSON.parse(localStorage.getItem('dropRes'))) {
              treeInstance?.emit('drag-end', {
                event: event,
                dragData: data.value,
                dropData: getNode(JSON.parse(localStorage.getItem('saveDropData'))),
                type: dropType.value,
                treeData: result,
              });
            }
          },
        };

      }
      return (
        <div class={nodeClass.value} style={nodeStyle.value} onMouseenter={showOperationArea} onMouseleave={hideOperationArea}>
          {nodeVLineStyles.value.map((item) => (
            <span class={nodeVLineClass.value} style={item}></span>
          ))}
          <span class={nodeHLineClass.value} style={omit(nodeVLineStyles.value[0], ['height', 'top'])}></span>
          <div
            class={nodeContentClass.value}
            onClick={() => {
              if (!data.value.disableSelect) {
                toggleSelectNode?.(data.value);
                treeInstance?.emit('node-click', data.value);
              }
            }}
            {...dragdropProps}>
            {slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: data, toggleNode }) : <NTreeNodeToggle data={data.value} />}
            <div class={ns.em('node-content', 'value-wrapper')} style={{ height: `${NODE_HEIGHT}px` }}>
              {check.value && <Checkbox {...checkboxProps.value} />}
              {slots.default ? renderSlot(useSlots(), 'default', { nodeData: data }) : <NTreeNodeContent data={data.value} />}
              {getNode?.(data.value)?.loading ? slots.loading ? renderSlot(useSlots(), 'loading') : <NTreeNodeLoading /> : ''}
              {dragdrop.value && (
                <>
                  <div class={ns.em('node', 'drop-top')} />
                  <div class={ns.em('node', 'drop-bottom')} />
                  <div class={ns.em('node', 'drop-left')} />
                  <div class={ns.em('node', 'drop-right')} />
                </>
              )}
            </div>
            {operate.value && isShowOperationArea.value && (
              <div class={nodeOperationAreaClass.value}>
                <n-icon
                  name="add"
                  onClick={() => {
                    insertBefore?.(data.value, { label: t('newNode') || 'New node' });
                  }}
                />
                <n-icon
                  name="delete"
                  onClick={() => {
                    removeNode?.(data.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});
