import { defineComponent, getCurrentInstance, provide, ref, renderSlot, SetupContext, toRefs, TransitionGroup, useSlots, watch } from 'vue';
import NTreeNode from './components/tree-node';
import NTreeNodeContent from './components/tree-node-content';
import NTreeNodeToggle from './components/tree-node-toggle';
import NTreeNodeLoading from './components/tree-node-loading';
import { VirtualList } from '../../virtual-list';
import {
  useTree,
  useCheck,
  useSelect,
  useOperate,
  useMergeNodes,
  useSearchFilter,
  IInnerTreeNode,
  ICheckStrategy,
  useDragdrop,
} from './composables';
import { USE_TREE_TOKEN, NODE_HEIGHT, TREE_INSTANCE } from './const';
import { TreeProps, treeProps } from './tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { formatCheckStatus, formatBasicTree } from './utils';
import './tree.scss';

export default defineComponent({
  name: 'NTree',
  props: treeProps,
  emits: ['toggle-change', 'check-change', 'select-change', 'node-click', 'lazy-load', 'drag-end'],
  setup(props: TreeProps, context: SetupContext) {
    const { slots, expose } = context;
    const treeInstance = getCurrentInstance();
    const { check, dragdrop, operate, canDragNode, canDropNode } = toRefs(props);
    const ns = useNamespace('tree');
    const normalRef = ref();
    const dragData = ref({});
    const dropType = ref('');
    const key: string = props.prop.key || 'id';
    const children = props.prop.children || 'children';
    const data = ref<IInnerTreeNode[]>(formatBasicTree(props.data, key, children));
    const userPlugins = [useSelect(), useOperate(props.prop), useMergeNodes(props.prop), useSearchFilter(props.prop)];
    const checkOptions = ref<{ checkStrategy: ICheckStrategy }>({
      checkStrategy: formatCheckStatus(check.value),
    });

    if (check.value) {
      userPlugins.push(useCheck(checkOptions) as never);
    }

    if (dragdrop.value) {
      userPlugins.push(useDragdrop(props, data) as never);
    }

    const treeFactory = useTree(data.value, userPlugins as never[], context, data, children);
    const { setTree, getExpendedTree, toggleNode, virtualListRef } = treeFactory;
    const getExpanded = (newData: any, oldData: Array<any>) => {
      for (let i = 0; i < oldData.length; i++) {
        if (oldData[i][children] && Array.isArray(oldData[i][children])) {
          if (newData[key] === oldData[i][key]) {
            console.log(data, 'data');
            newData.expanded = oldData[i].expanded;
            break;
          }
          getExpanded(newData, oldData[i][children]);
        }
      }
    };
    const setExpanded = (newData: any, oldData: Array<any>) => {
      for (let i = 0; i < newData.length; i++) {
        if (newData[i][children] && Array.isArray(newData[i][children])) {
          getExpanded(newData[i], oldData);
          setExpanded(newData[i][children], oldData);
        }
      }
    };
    // 外部同步内部
    watch(data, (value) => {
      setTree(value);
    });

    watch(
      () => props.data,
      (newVal) => {
        setExpanded(newVal, data.value);
        data.value = formatBasicTree(newVal, key, children);
      },
      {
        deep: true,
      }
    );

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = formatCheckStatus(newVal);
    });

    provide(USE_TREE_TOKEN, treeFactory);
    provide(TREE_INSTANCE, treeInstance);

    expose({
      treeFactory,
    });
    const saveDragData = (nodeData: any) => {
      dragData.value = nodeData;
    };

    const saveDropType = (type: string) => {
      dropType.value = type;
    };

    const renderDTreeNode = (treeNode: IInnerTreeNode, index: number) =>
      slots.default ? (
        renderSlot(useSlots(), 'default', {
          treeFactory: treeFactory,
          nodeData: treeNode,
        })
      ) : (
        <NTreeNode
          data={treeNode}
          onSaveDragData={saveDragData}
          onSaveDropType={saveDropType}
          dragData={dragData.value}
          dropType={dropType.value}
          check={check.value}
          dragdrop={dragdrop.value}
          operate={operate.value}
          canDragNode={canDragNode.value}
          canDropNode={canDropNode.value}
          key={treeNode[key]}>
          {{
            default: () =>
              slots.content ? (
                renderSlot(useSlots(), 'content', { nodeData: treeNode, index })
              ) : (
                <NTreeNodeContent data={treeNode} prop={props.prop} />
              ),
            icon: () =>
              slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: treeNode, toggleNode }) : <NTreeNodeToggle data={treeNode} />,
            loading: () => (slots.loading ? renderSlot(useSlots(), 'loading', { nodeData: treeNode }) : <NTreeNodeLoading />),
          }}
        </NTreeNode>
      );
    // 数组根据某个属性进行分组
    const formattingData = (arr: Array<any>, group_key: string) => {
      // 先定义一个空对象和空数组；
      const map = {};
      const res = [];
      // 循环需要筛选的数组
      for (let i = 0; i < arr.length; i++) {
        const ai = arr[i];
        // 将需要筛选的属性的值作为新对象的键，并且判断是否已经存在
        if (!map[ai[group_key] + 'group']) {
          // 不存在的话就在map对象中创建一个属性的值作为键名，键值为空数组的新对象，并且把arr[i]放入
          map[ai[group_key] + 'group'] = [ai];
        } else {
          // 如果已经存在就直接把arr[i]放入
          map[ai[group_key] + 'group'].push(ai);
        }
      }
      // 循环后对map进行处理生成分组的数组
      Object.keys(map).forEach((k) => {
        res.push({
          [group_key]: k,
          list: map[k],
        });
      });

      return res;
    };
    const setDom = (arr: any) => {
      const dom = arr.list?.map((item: any, index: number) => {
        return renderDTreeNode(item, index);
      });
      return <div class={'nancalui-tree-group'}>{dom}</div>;
    };

    return () => {
      const treeData = getExpendedTree?.().value;
      const vSlotsProps = {
        item: (treeNode: IInnerTreeNode, index: number) => renderDTreeNode(treeNode, index),
      };
      let virtualListProps = {};
      if (props.height) {
        virtualListProps = {
          height: props.height,
          data: treeData,
          itemHeight: NODE_HEIGHT,
        };
      }
      return props.height ? (
        <VirtualList ref={virtualListRef} class={ns.b()} {...virtualListProps} v-slots={vSlotsProps} />
      ) : (
        <div ref={normalRef} class={ns.b()}>
          <TransitionGroup name={ns.m('list')}>
            {props.prop.group
              ? formattingData(treeData, 'groupName')?.map((item) => {
                const dom = setDom(item);
                return dom;
              })
              : treeData?.map((item, index) => {
                return renderDTreeNode(item, index);
              })}
          </TransitionGroup>
        </div>
      );
    };
  },
});
