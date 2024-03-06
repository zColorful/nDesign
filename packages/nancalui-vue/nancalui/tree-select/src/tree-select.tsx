/* eslint-disable @typescript-eslint/indent */
import './tree-select.scss';
import {
  defineComponent,
  getCurrentInstance,
  toRefs,
  Transition,
  ref,
  onMounted,
  watch,
  computed,
  inject,
  onUnmounted,
  Teleport,
} from 'vue';
import type { SetupContext } from 'vue';
import { treeSelectProps, TreeSelectProps, TreeItem, TreeData } from './tree-select-types';
import { attributeExtension, className } from './utils';
import useToggle from '../hooks/use-toggle';
import useSelect from '../hooks/use-select';
import useClear from '../hooks/use-clear';
import IconOpen from '../assets/open';
import IconClose from '../assets/close';
import Checkbox from '../../checkbox/src/checkbox';
import ClickOutside from '../../shared/nancalui-directive/clickoutside';
import { createI18nTranslate } from '../../locale/create';
import { isArray, cloneDeep } from 'lodash';
import { FORM_TOKEN, FormContext } from '../../form';
import { FlexibleOverlay, Placement } from '../../overlay';
import SelectArrowIcon from '../../shared/components/dropdown-icon';
import SelectArrowGrayIcon from '../../shared/components/dropdowm-gray-icon';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  name: 'NTreeSelect',
  directives: { ClickOutside },
  props: treeSelectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: TreeSelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const reRenderTree: unknown = ref();
    const t = createI18nTranslate('NTree', app);
    const { treeData, placeholder, disabled, multiple, leafOnly, enableLabelization, prop, modelValue, size, filter, useGrayArrow } =
      toRefs(props);
    const { visible, selectToggle, treeToggle } = useToggle(props);
    const { inputValue, selectValue, handleClearAll, handleClearItem, clearSelect } = useSelect(props, ctx, modelValue);
    const { isClearable } = useClear(props);
    const formContext = inject(FORM_TOKEN, undefined) as FormContext;
    const inputSize = computed(() => size?.value || formContext?.size || '');
    const searchData = ref(); // 筛选后的数据
    const isFocus = ref(false); // 是否输入中
    const labelName = prop.value.label || 'label';
    const disabledName = prop.value.disabled || 'disabled';
    const valueName = prop.value.value || 'value';
    const childrenName = prop.value.children || 'children';
    const { slots } = ctx;
    const selectData = ref();
    const dropdownWidth = ref('0');
    const selectRef = ref();
    const selectOutRef = ref();

    const dropdownRef = ref();
    const isRender = ref<boolean>(false);
    const position = ref<Placement[]>(['bottom-start', 'top-start']);

    const updateDropdownWidth = () => {
      dropdownWidth.value = selectRef?.value?.clientWidth ? selectRef.value.clientWidth + 'px' : '100%';
    };

    const clickNode = (item: TreeItem, bloodSearch = false) => {
      // bloodSearch 是否在初始化选中节点
      isFocus.value = false;
      if (!leafOnly.value && !item.disabled) {
        // 都可点击
        selectValue(item, bloodSearch);
        !multiple.value && !bloodSearch && selectToggle(false);
      } else {
        // 仅选择子节点
        if (!item[childrenName] && !item.disabled) {
          selectValue(item, bloodSearch);
          !multiple.value && !bloodSearch && selectToggle(false);
        } else {
        }
      }
    };
    // const onClearItem = (item: TreeItem) => {
    //   handleClearItem()
    // };
    function getTreeItem(data: Array<TreeItem>, newData: unknown | Array<any>) {
      if (!modelValue.value && modelValue.value !== 0) {
        selectData.value = undefined;
        return;
      }
      for (const item of data) {
        if (item[valueName] === modelValue.value && !multiple.value) {
          selectData.value = item;
          clickNode(item, true);
          break;
        } else if (multiple.value && isArray(modelValue.value) && modelValue.value.includes(item[valueName]) && item[valueName]) {
          (newData as any[])?.push(item);
          clickNode(item, true);
        }
        if (item[childrenName]?.length) {
          getTreeItem(item[childrenName], newData);
        }
      }
    }

    const deleteNode = (e: MouseEvent, item: string) => {
      // handleClearItem(e, item);
      e.stopPropagation();
      selectValue(item);
    };
    const classSize = `nancalui-tree-select--${inputSize.value}`;
    const treeSelectCls = computed(() => {
      return className('nancalui-tree-select', {
        'nancalui-tree-select-open': visible.value,
        'nancalui-tree-select-disabled': disabled.value,
        [classSize]: Boolean(inputSize.value),
      });
    });

    const inputClassSize = `nancalui-tree-select-input--${inputSize.value}`;
    const treeInputCls = computed(() =>
      className('nancalui-tree-select-input', {
        [inputClassSize]: Boolean(inputSize.value),
        'nancalui-tree-select-input--hasvalue': Boolean(inputValue.value),
      })
    );

    const treeSelectInputItem = computed(() =>
      className('nancalui-tree-select-value', {
        'nancalui-tree-select-value-enableLabelization': enableLabelization.value,
      })
    );

    const toggleNode = (item: TreeItem) => {
      item.expanded = !item.expanded;
    };

    const renderDefaultIcon = (item: TreeItem) => {
      return item.expanded ? (
        <IconOpen class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} />
      ) : (
        <IconClose class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} />
      );
    };

    const renderGrayIcon = (item: TreeItem) => {
      return item.expanded ? (
        <SelectArrowGrayIcon class="mr-xs arrow-bottom" onClick={(e: MouseEvent) => treeToggle(e, item)} />
      ) : (
        <SelectArrowGrayIcon class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} />
      );
    };

    const renderIcon = (item: TreeItem) => {
      return slots.icon ? slots.icon({ nodeData: item, toggleNode }) : useGrayArrow.value ? renderGrayIcon(item) : renderDefaultIcon(item);
    };

    const checkItemIsSelected = (item: TreeItem) => {
      const itemValue = item[valueName];

      if (multiple.value) {
        if (Array.isArray(modelValue.value)) {
          return modelValue.value.includes(itemValue);
        }
      } else {
        return modelValue.value === itemValue;
      }

      return false;
    };

    const renderMutiContent = (item: TreeItem) => {
      const checked = ref(!!item.checked);

      return item.halfchecked ? (
        <Checkbox label={item[labelName]} halfchecked={item.halfchecked} disabled={item[disabledName]} />
      ) : (
        <Checkbox label={item[labelName]} v-model={checked.value} activeValue={true} unactiveValue={false} disabled={item[disabledName]} />
      );
    };

    const renderContent = (item: TreeItem) => {
      return slots.default ? slots.default({ item }) : multiple.value ? renderMutiContent(item) : item[labelName];
    };

    const renderNode = (item: TreeItem) => {
      const classNameStr = prop.value.class || 'class';
      return (
        <div
          class={['nancalui-tree-select-item', item[classNameStr], { 'nancalui-tree-select-selected': checkItemIsSelected(item) }]}
          style={{ paddingLeft: `${15 * (item.level - 1) + 10}px` }}
          onClick={() => clickNode(item)}>
          {/* 图标 */}
          {item[childrenName] && item[childrenName].length ? (
            renderIcon(item)
          ) : (
            <span style="margin-right:14px"> {'\u00A0\u00A0\u00A0'}</span>
          )}
          {/* 内容 */}
          <div class={['nancalui-tree-select-item__content', { 'is-disabled': item.disabled }]}>{renderContent(item)}</div>
        </div>
      );
    };

    const renderTree = (treeData2: TreeData): JSX.Element | JSX.Element[] => {
      const childrenNameStr = prop.value.children as keyof TreeItem;
      return treeData2.map((item) => {
        if (item[childrenNameStr]) {
          return (
            <div>
              {renderNode(item)}
              {item.expanded && renderTree(item[childrenNameStr])}
            </div>
          );
        }
        return renderNode(item);
      });
    };
    const rerenderTree = (data: TreeData) => {
      return renderTree(attributeExtension(data, prop.value));
    };
    const initValue = () => {
      let newData: unknown = null;
      if (multiple.value) {
        newData = [];
      }
      getTreeItem(treeData.value, newData);
      if (multiple.value) {
        selectData.value = newData;
      }

      if (!isArray(selectData.value) && !selectData.value) {
        clearSelect();
      }
      reRenderTree.value = rerenderTree(treeData.value);
    };
    const keyword = ref('');
    const filterItem = (item: TreeItem, name: string, e: MouseEvent) => {
      if (item[labelName].indexOf(name) !== -1) {
        return true;
      }
      if (item.children) {
        item.children = item.children.filter((sonEle: TreeItem) => {
          return filterItem(sonEle, name, e);
        });
        if (item.children.length > 0) {
          treeToggle(e, item);
          return true;
        }
      }
      return false;
    };
    const onFocus = () => {
      if (disabled.value) {
        return;
      }
      isFocus.value = true;
    };
    const onFilter = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      selectToggle(true);
      const query = (e.target as HTMLInputElement).value;
      if (query) {
        const data = cloneDeep(treeData.value);
        searchData.value = data.filter((item) => {
          return filterItem(item, query, e);
        });
      } else {
        searchData.value = cloneDeep(treeData.value);
      }
      reRenderTree.value = rerenderTree(searchData.value);
    };

    watch(visible, (val) => {
      if (val) {
        dropdownRef.value?.updatePosition();
        updateDropdownWidth();
      }
    });

    onMounted(() => {
      initValue();

      isRender.value = true;
      updateDropdownWidth();
      window.addEventListener('resize', updateDropdownWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateDropdownWidth);
    });

    watch(
      () => treeData.value,
      (val) => {
        if (val) {
          // initValue();//选中节点后，因节点checked发生改变，会引起clickNode事件触发两遍，暂时注销
          reRenderTree.value = rerenderTree(treeData.value);
          dropdownRef.value?.updatePosition(); // 收缩或者展开项时候更新弹出层位置
        }
      },
      {
        deep: true,
      }
    );
    watch(
      () => searchData.value,
      () => {
        let _a;
        reRenderTree.value = rerenderTree(searchData.value);
        (_a = dropdownRef.value) == null ? void 0 : _a.updatePosition();
      },
      {
        deep: true,
      }
    );

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          isFocus.value = true;
        } else {
          isFocus.value = false;
          reRenderTree.value = rerenderTree(treeData.value);
        }
      },
      {
        deep: true,
      }
    );

    watch(
      () => modelValue.value,
      () => {
        initValue();
      },
      {
        immediate: true,
      }
    );
    const hasData = computed(() => {
      return reRenderTree.value?.length > 0;
    });

    onClickOutside(
      dropdownRef,
      () => {
        visible.value = false;
      },
      { ignore: [selectRef] }
    );

    return () => {
      return (
        <div ref={selectOutRef} class={treeSelectCls.value}>
          <div
            class={isClearable.value ? 'nancalui-tree-select-clearable' : 'nancalui-tree-select-notclearable'}
            onClick={() => selectToggle()}
            ref={selectRef}>
            <div class={treeInputCls.value} onClick={onFocus} placeholder={placeholder.value || t('selectPlaceholder')}>
              {multiple.value
                ? inputValue.value.map((item) => {
                    if (item) {
                      return (
                        <div class={treeSelectInputItem.value} v-show={!isFocus.value}>
                          {item[labelName]}
                          <span class={'icon-box'}>
                            {enableLabelization.value ? (
                              <n-icon name="close" onClick={(e: MouseEvent) => deleteNode(e, item)} />
                            ) : (
                              <span>,</span>
                            )}
                          </span>
                        </div>
                      );
                    }
                  })
                : !Array.isArray(inputValue.value) && (
                    <div class={treeSelectInputItem.value} v-show={!isFocus.value}>
                      {inputValue.value}
                      <span class={'icon-box'}>
                        {enableLabelization.value && <n-icon name="close" onClick={(e: MouseEvent) => handleClearItem(e)} />}
                      </span>
                    </div>
                  )}
              <input
                disabled={disabled.value}
                value={keyword.value}
                onFocus={onFocus}
                onClick={onFocus}
                v-show={!inputValue.value.toString().length || filter.value}
                onInput={onFilter}
                placeholder={filter.value ? (inputValue.value.toString().length ? '' : placeholder.value) : placeholder.value}></input>
            </div>

            <span onClick={(e: MouseEvent) => handleClearAll(e)} class="nancalui-tree-select-clear">
              <n-icon name="close" />
            </span>
            <span class="nancalui-tree-select-arrow">
              <SelectArrowIcon />
            </span>
          </div>
          <Teleport to="body">
            <Transition name="fade" ref="dropdownRef">
              <FlexibleOverlay
                class={'nancalui-tree-select-popup'}
                v-model={isRender.value}
                ref={dropdownRef}
                origin={selectOutRef.value}
                align="start"
                offset={4}
                position={position.value}
                style={{
                  visibility: visible.value ? 'visible' : 'hidden',
                  'z-index': visible.value ? 9999 : -1,
                }}>
                <div
                  class="nancalui-tree-select-dropdown"
                  style={{ width: `${dropdownWidth.value}`, visibility: visible.value ? 'visible' : 'hidden', minWidth: '50px' }}>
                  <ul class="nancalui-tree-select-dropdown-list" v-show={hasData.value}>
                    {reRenderTree.value}
                  </ul>
                  <div class="nancalui-tree-select-empty" v-show={!hasData.value}>
                    暂无数据
                  </div>
                </div>
              </FlexibleOverlay>
            </Transition>
          </Teleport>
        </div>
      );
    };
  },
});
