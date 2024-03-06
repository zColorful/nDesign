import { defineComponent, ref, reactive, watch } from 'vue';
import { LeftTreeProps, leftTreeProps } from './left-tree-types';
import './left-tree.scss';
import TreeArrowSvg from './assets/icon-tree-arrow.svg';
import TreeParent from './assets/tree-parent.svg';
import TreeChild from './assets/tree-child.svg';
import TreeAdd from './assets/tree-add-icon.svg';
import TreeEdit from './assets/tree-edit-icon.svg';
import TreeDel from './assets/tree-del-icon.svg';
import TreeMore from './assets/tree-more-icon.svg';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NLeftTree',
  props: leftTreeProps,
  setup(props: LeftTreeProps, { emit, slots }) {
    const ns = useNamespace('tree');

    const checkCName = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('请输入名称'));
      }
      const regex = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_0-9-]){2,20}$/;
      const res = regex.test(value);
      if (res && value.length > 1 && value.length < 21) {
        return callback();
      } else {
        return callback(new Error('支持汉字、英文、数字、中划线、下划线，2~20个字符'));
      }
    };

    const treeRef = ref();

    const formRef = ref();

    const treeData: any[] = reactive([]);

    const treeAttrData = ref({
      isHideSearch: false, // 是否隐藏左侧顶部搜索框
      isHideTree: false, // 是否左侧隐藏树
      hasLoad: false, // 是否已加载
      filterText: '', // 过滤内容
      nodeKey: 'id',
      expand: true, // 是否在点击节点的时候展开或者收缩节点
      showCheckbox: false, // 是否显示选择框
      showControl: false, // 显示控制按钮
      showLeftIcon: false, // 显示左侧icon图标
      parentControl: '', // 父元素要展示的控制项1.增加 2.编辑 3.删除
      childControl: '', // 子元素要展示的控制项1.增加 2.编辑 3.删除
      showAddDialog: false, // 展示弹窗
      isEditDialog: false, // 判断是否是编辑状态
      dialogTitle: '目录', // 弹窗顶部名称
      dialogName: '名称', // 弹窗输入目录名称
      dialogDesc: '描述', // 弹窗描述
      childTitle: '', // 二级父类元素新增名称
      checkItem: {}, // 选中的节点
      ruleForm: {
        name: '',
        desc: '',
        type: '',
      },
      rules: {
        name: [{ required: true, validator: checkCName, trigger: 'blur' }],
        desc: [{ required: false, message: '请输入描述', trigger: 'blur' }],
      },
    });

    // 设置节点是否被选中, 使用此方法必须设置 node-key 属性 (key/data, checked, deep) 接收三个参数
    const setChecked = (id: any, checked: boolean) => {
      treeData.forEach((val: any) => {
        if (val.id === id) {
          val.checked = true;
          if (val.children) {
            val.children.forEach((v: any) => {
              setChecked(v.id, true);
            });
          }
        }
      });
    };

    watch(
      () => props.data,
      (newVal: any) => {
        treeData.length = 0;
        treeData.push(...newVal);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      () => props.treeAttrData,
      (newVal: any) => {
        if (newVal) {
          treeAttrData.value = Object.assign(treeAttrData.value, newVal);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // watch(
    //   () => props.checkedNodes,
    //   (newVal: any) => {
    //     if (newVal) {
    //       newVal.forEach((val: any) => {
    //         setChecked(val, true);
    //       });
    //     }
    //   },
    //   {
    //     immediate: true,
    //     deep: true,
    //   }
    // );

    // 隐藏树事件
    const hideFn = () => {
      treeAttrData.value.isHideTree = !treeAttrData.value.isHideTree;
    };

    // 输入过滤数据
    const onFilter = (value: any) => {
      treeRef.value.treeFactory.searchTree(value, { isFilter: true });
    };

    // 传递事件
    const operationFn = (name: any, item: any) => {
      emit(name, item);
    };

    // 点击添加或修改节点事件
    const updateFn = (item: any, isEdit: boolean) => {
      if (item) {
        // 判断是打开弹窗
        treeAttrData.value.showAddDialog = true;
        treeAttrData.value.isEditDialog = isEdit;
        treeAttrData.value.ruleForm.type = item.type;
        if (isEdit) {
          treeAttrData.value.ruleForm = {
            name: item.label,
            desc: item.description,
            type: item.type,
          };
        }
        treeAttrData.value.checkItem = { ...item };
      } else {
        // 判断是提交
        formRef.value.validate((valid: any) => {
          if (valid) {
            operationFn('treeUpdateNode', {
              checkItem: treeAttrData.value.checkItem,
              ruleForm: { ...treeAttrData.value.ruleForm },
              isEdit: treeAttrData.value.isEditDialog,
            });
          }
        });
      }
    };

    // 初始化
    const clearFn = () => {
      formRef.value.resetFields();
      treeAttrData.value.ruleForm = {
        name: '',
        desc: '',
        type: '',
      };
      treeAttrData.value.showAddDialog = false;
    };

    // 点击删除节点事件
    const delFn = (item: any) => {
      operationFn('treeDelNode', item);
    };

    // 取消弹框
    const cancelFn = () => {
      treeAttrData.value.showAddDialog = false;
      if (formRef.value) {
        formRef.value.resetFields();
        treeAttrData.value.ruleForm = {
          name: '',
          desc: '',
          type: '',
        };
      }
    };

    // 自定义树子节点
    const renderTreeNodeItem = (item: any) => {
      if (item.children?.length > 0) {
        return (
          <div class="tree-node">
            {treeAttrData.value.showLeftIcon ? (
              <div class="tree-node-icon">
                <n-icon name="" component={TreeParent}></n-icon>
              </div>
            ) : null}
            <div class="short tree-node-name parent"> {item.label}</div>
            <div class="tree-node-control">
              <n-popover position={['top-start']} align="start" trigger="hover">
                {{
                  default: (scoped: any) => {
                    return (
                      <div class="tree-node-control-operation hover-show">
                        <n-icon name="" size="16px" component={TreeMore}></n-icon>
                      </div>
                    );
                  },
                  content: (scoped: any) => {
                    return (
                      <div class="popover-tree-body">
                        <div class="popover-tree-name" onClick={() => updateFn(item, false)}>
                          <n-icon name="" component={TreeAdd}></n-icon>
                          新增{item.type === 'ROOT' ? treeAttrData.value.dialogTitle : treeAttrData.value.childTitle}
                        </div>
                        {item.type === 'ROOT' ? null : (
                          <div class="popover-tree-name" onClick={() => updateFn(item, true)}>
                            <n-icon name="" component={TreeEdit}></n-icon>
                            编辑{treeAttrData.value.dialogTitle}
                          </div>
                        )}

                        {item.type === 'ROOT' ? null : (
                          <div class="popover-tree-name" onClick={() => delFn(item)}>
                            <n-icon name="" component={TreeDel}></n-icon>
                            删除{treeAttrData.value.dialogTitle}
                          </div>
                        )}
                      </div>
                    );
                  },
                }}
              </n-popover>
            </div>
          </div>
        );
      } else {
        return (
          <div class="tree-node">
            {treeAttrData.value.showLeftIcon ? (
              <div class="tree-node-icon">
                {/* <n-icon name="" component={TreeChild}></n-icon>*/}
                <n-icon size="18px" name="file"></n-icon>
              </div>
            ) : null}
            <div class="short tree-node-name"> {item.label}</div>
            <div class="tree-node-control">
              <span class="tree-node-control-operation hover-show" onClick={() => updateFn(item, false)}>
                <n-icon name="" component={TreeAdd}></n-icon>
              </span>
              <span class="tree-node-control-operation hover-show" onClick={() => updateFn(item, true)}>
                <n-icon name="" component={TreeEdit}></n-icon>
              </span>
              <span class="tree-node-control-operation hover-show" onClick={() => delFn(item)}>
                <n-icon name="" component={TreeDel}></n-icon>
              </span>
            </div>
          </div>
        );
      }
    };

    return () => (
      <div class={{ 'left-tree': true, hide: treeAttrData.value.isHideTree }}>
        <div class="tree-top">
          <div class={ns.e('pageTop')}>{slots.pageTop?.()}</div>
        </div>
        {treeAttrData.value.isHideSearch ? null : (
          <div class="left-tree-search">
            {treeAttrData.value.isHideTree ? null : (
              <n-input v-model={treeAttrData.value.filterText} onInput={onFilter} placeholder="搜索" />
            )}
          </div>
        )}
        <div class="left-tree-content-box">
          <div class="left-tree-content">
            <n-tree ref={treeRef} data={treeData} check={treeAttrData.value.showCheckbox}>
              {{
                content: (scoped: any) => {
                  return renderTreeNodeItem(scoped.nodeData);
                },
                icon: (scoped: any) => {
                  if (scoped.nodeData.isLeaf) {
                    return <span class="nancalui-tree-node__indent"></span>;
                  } else {
                    return (
                      <span
                        style={{
                          transform: scoped.nodeData.expanded ? 'rotate(90deg)' : '',
                          marginLeft: '-4.5px',
                          marginRight: '14.5px',
                          cursor: 'pointer',
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          scoped.toggleNode(scoped.nodeData);
                        }}
                      >
                        <n-icon name="code-editor-run"></n-icon>
                      </span>
                    );
                  }
                },
              }}
            </n-tree>
          </div>
        </div>
        <div class={{ knob: true, hide: treeAttrData.value.isHideTree }} onClick={hideFn}>
          <div class={{ pic: true, rotate: treeAttrData.value.isHideTree }}>
            <n-icon name="" component={TreeArrowSvg} />
          </div>
        </div>
        <n-modal v-model={treeAttrData.value.showAddDialog} beforeClose={cancelFn}>
          {{
            default: () => {
              return (
                <div class="form-body">
                  <n-form
                    ref={formRef}
                    data={treeAttrData.value.ruleForm}
                    rules={treeAttrData.value.rules}
                    labelSize="sm"
                    labelAlign="end"
                    popPosition={['right']}
                  >
                    <n-form-item field="name" label={treeAttrData.value.dialogName + '：'}>
                      <n-input v-model={treeAttrData.value.ruleForm.name} maxlength="20" placeholder="请输入名称" clearable />
                    </n-form-item>
                    <n-form-item field="desc" label={treeAttrData.value.dialogDesc + '：'}>
                      <n-textarea v-model={treeAttrData.value.ruleForm.desc} maxlength="200" rows="5" placeholder="请输入描述" clearable />
                    </n-form-item>
                  </n-form>
                </div>
              );
            },
            header: () => {
              return (
                <n-module-name>
                  {treeAttrData.value.isEditDialog ? '修改' : '新增'}
                  {treeAttrData.value?.ruleForm?.type === 'ROOT' ? treeAttrData.value.dialogTitle : treeAttrData.value.childTitle}
                </n-module-name>
              );
            },
            footer: () => {
              return (
                <div class="nancalui-modal-btn">
                  <n-button variant="solid" color="primary" onClick={() => updateFn(false, true)}>
                    保存
                  </n-button>
                  <n-button color="secondary" onClick={cancelFn}>
                    取消
                  </n-button>
                </div>
              );
            },
          }}
        </n-modal>
      </div>
    );
  },
});
