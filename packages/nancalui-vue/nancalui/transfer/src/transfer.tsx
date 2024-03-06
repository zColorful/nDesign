import { computed, defineComponent, PropType, provide, reactive, ref, toRef } from 'vue';
import { Button } from '../../button';
import TransferView from './components/transfer-view';
import { DataInfo, TransferItem } from './interface';
import { transferInjectionKey } from './context';
import { useFormItem } from '../../shared/_utils/use-form-item';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './transfer.scss';

export default defineComponent({
  name: 'NTransfer',
  props: {
    /**
     * @zh 穿梭框的数据
     * @en Data of the transfer
     */
    data: {
      type: Array as PropType<TransferItem[]>,
      default: () => [],
    },
    /**
     * @zh 目标选择框中的值
     * @en Value in the target selection box
     * @vModel
     */
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    /**
     * @zh 目标选择框中默认的值（非受控状态）
     * @en The default value in the target selection box (uncontrolled state)
     */
    defaultValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 选中的选项值
     * @en Selected option value
     * @vModel
     */
    selected: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    /**
     * @zh 默认选中的选项值（非受控状态）
     * @en The option value selected by default (uncontrolled state)
     */
    defaultSelected: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启简单模式（点击选项即移动）
     * @en Whether to open the simple mode (click the option to move)
     */
    simple: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启单向模式（仅可移动到目标选择框）
     * @en Whether to open the one-way mode (only move to the target selection box)
     */
    oneWay: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示搜索框
     * @en Whether to show the search input
     */
    showSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 搜索框提示
     * @en Whether to show the search input
     */
    placeholder: {
      type: String,
      default: '请输入',
    },
    /**
     * @zh 自定义搜索
     * @en Whether to show the search input
     */
    filter: {
      type: Function as PropType<(item: TransferItem, value: string, type: 'source' | 'target') => boolean>,
      default: undefined,
    },
    /**
     * @zh 是否展示全选勾选框
     * @en Whether show select all checkbox on the header
     */
    showSelectAll: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 源选择框和目标选择框的标题
     * @en The title of the source and target selection boxes
     */
    title: {
      type: Array as PropType<string[]>,
      default: () => ['选项合集', '选项合集'],
    },
  },
  emits: {
    'update:modelValue': (value: string[]) => true,
    'update:selected': (selected: string[]) => true,
    /**
     * @zh 目标选择框的值改变时触发
     * @en Triggered when the value of the target selection box changes
     * @property {string[]} value
     */
    change: (value: string[]) => true,
    /**
     * @zh 选中的值改变时触发
     * @en Triggered when the selected value changes
     * @property {string[]} selected
     */
    select: (selected: string[]) => true,
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @property {string} value
     * @property {'target'|'source'} type
     */
    search: (value: string, type: 'target' | 'source') => true,
  },
  /**
   * @zh 选项
   * @en Option
   * @slot item
   * @binding {string} value
   * @binding {string} label
   */
  /**
   * @zh 源面板
   * @en Source content
   * @slot source
   * @binding {TransferItem[]} data
   * @binding {string[]} selectedKeys
   * @binding {(value: string[]) => void} onSelect
   */
  /**
   * @zh 目标面板
   * @en Target content
   * @slot target
   * @binding {TransferItem[]} data
   * @binding {string[]} selectedKeys
   * @binding {(value: string[]) => void} onSelect
   */
  /**
   * @zh 源标题插槽
   * @en Source Header
   * @slot source-title
   * @binding {number} countTotal
   * @binding {number} countSelected
   * @binding {string} searchValue
   * @binding {boolean} checked
   * @binding {boolean} indeterminate
   * @binding {(checked:boolean) => void} onSelectAllChange
   * @binding {() => void} onClear
   */
  /**
   * @zh 目标标题插槽
   * @en Target Header
   * @slot target-title
   * @binding {number} countTotal
   * @binding {number} countSelected
   * @binding {string} searchValue
   * @binding {boolean} checked
   * @binding {boolean} indeterminate
   * @binding {(checked:boolean) => void} onSelectAllChange
   * @binding {() => void} onClear
   */
  setup(props, { emit, slots }) {
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });
    const ns = useNamespace('transfer');

    const _target = ref(props.defaultValue);
    const computedTarget = computed(() => props.modelValue ?? _target.value ?? []);
    const _selected = ref(props.defaultSelected);
    const computedSelected = computed(() => props.selected ?? _selected.value ?? []);

    const sourceTitle = computed(() => props.title?.[0]);
    const targetTitle = computed(() => props.title?.[1]);

    const dataInfo = computed(() => {
      const sourceInfo: DataInfo = {
        data: [],
        allValidValues: [],
        selected: [],
        validSelected: [],
      };

      const targetInfo: DataInfo = {
        data: [],
        allValidValues: [],
        selected: [],
        validSelected: [],
      };

      for (const item of props.data) {
        if (computedTarget.value.includes(item.value)) {
          targetInfo.data.push(item);
          if (!item.disabled) {
            targetInfo.allValidValues.push(item.value);
          }
          if (computedSelected.value.includes(item.value)) {
            targetInfo.selected.push(item.value);
            if (!item.disabled) {
              targetInfo.validSelected.push(item.value);
            }
          }
        } else {
          sourceInfo.data.push(item);
          if (!item.disabled) {
            sourceInfo.allValidValues.push(item.value);
          }
          if (computedSelected.value.includes(item.value)) {
            sourceInfo.selected.push(item.value);
            if (!item.disabled) {
              sourceInfo.validSelected.push(item.value);
            }
          }
        }
      }

      return {
        sourceInfo,
        targetInfo,
      };
    });

    const handleSearch = (value: string, type: 'target' | 'source') => {
      emit('search', value, type);
    };

    const handleSelect = (values: string[]) => {
      _selected.value = values;
      emit('update:selected', values);
      emit('select', values);
    };

    const moveTo = (values: string[], target: 'target' | 'source') => {
      const newTarget =
        target === 'target' ? [...computedTarget.value, ...values] : computedTarget.value.filter((value) => !values.includes(value));
      handleSelect(dataInfo.value[target === 'target' ? 'targetInfo' : 'sourceInfo'].selected);
      _target.value = newTarget;
      emit('update:modelValue', newTarget);
      emit('change', newTarget);
      eventHandlers.value?.onChange?.();
    };

    const handleClick = (target: 'target' | 'source') => {
      const values = target === 'target' ? dataInfo.value.sourceInfo.validSelected : dataInfo.value.targetInfo.validSelected;
      moveTo(values, target);
    };

    provide(
      transferInjectionKey,
      reactive({
        selected: computedSelected,
        slots,
        moveTo,
        onSelect: handleSelect,
      })
    );

    const cls = computed(() => [
      ns.b(),
      {
        [ns.e('simple')]: props.simple,
        [ns.e('disabled')]: mergedDisabled.value,
      },
    ]);

    return () => (
      <div class={cls.value}>
        <TransferView
          type="source"
          class={ns.e('view-source')}
          title={sourceTitle.value}
          dataInfo={dataInfo.value.sourceInfo}
          data={dataInfo.value.sourceInfo.data}
          selected={computedSelected.value}
          showSearch={props.showSearch}
          showSelectAll={props.showSelectAll}
          simple={props.simple}
          onSearch={handleSearch}
          placeholder={props.placeholder}
          filterFunc={props.filter}
          v-slots={{
            default: slots?.source ? (slotData: any) => slots?.source?.(slotData) : undefined,
            title: slots?.['source-title'] ? (titleProps: any) => slots?.['source-title']?.(titleProps) : undefined,
          }}
        />
        {!props.simple ? (
          <div class={ns.e('operations')}>
            <Button
              variant="solid"
              class={ns.e('operations-btn')}
              icon="chevron-right"
              disabled={dataInfo.value.sourceInfo.validSelected.length === 0}
              onClick={() => handleClick('target')}></Button>

            {!props.oneWay ? (
              <Button
                variant="solid"
                class={ns.e('operations-btn')}
                icon="collapse"
                disabled={dataInfo.value.targetInfo.validSelected.length === 0}
                onClick={() => handleClick('source')}></Button>
            ) : null}
          </div>
        ) : null}

        <TransferView
          type="target"
          class={ns.e('view-target')}
          title={targetTitle.value}
          dataInfo={dataInfo.value.targetInfo}
          data={dataInfo.value.targetInfo.data}
          selected={computedSelected.value}
          allowClear={props.oneWay}
          showSearch={props.showSearch}
          showSelectAll={props.showSelectAll}
          simple={props.simple}
          onSearch={handleSearch}
          filterFunc={props.filter}
          placeholder={props.placeholder}
          v-slots={{
            default: slots?.target ? (slotData: any) => slots?.target?.(slotData) : undefined,
            title: slots?.['target-title'] ? (titleProps: any) => slots?.['target-title']?.(titleProps) : undefined,
          }}></TransferView>
      </div>
    );
  },
});
