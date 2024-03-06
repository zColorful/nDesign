import { computed, defineComponent, getCurrentInstance, inject, PropType, ref } from 'vue';
import { Checkbox } from '../../../checkbox';
import { Icon } from '../../../icon';
import { Input } from '../../../input';
import TransferListItem from './transfer-list-item';
import { DataInfo, TransferItem } from '../interface';
import { transferInjectionKey } from '../context';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../../locale/create';
import NCheckboxGroup from '../../../checkbox/src/checkbox-group';
import SearchIcon from './search-icon';

export default defineComponent({
  name: 'TransferView',
  props: {
    type: {
      type: String as PropType<'source' | 'target'>,
      required: true,
    },
    dataInfo: {
      type: Object as PropType<DataInfo>,
      required: true,
    },
    title: String,
    data: {
      type: Array as PropType<TransferItem[]>,
      required: true,
    },
    allowClear: Boolean,
    selected: {
      type: Array as PropType<string[]>,
      required: true,
    },
    showSearch: Boolean,
    showSelectAll: Boolean,
    simple: Boolean,
    placeholder: String,
    filterFunc: Function as PropType<(item: TransferItem, value: string, type: 'source' | 'target') => boolean>,
  },
  emits: ['search'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('transfer-view');
    const filter = ref('');
    const transferCtx = inject(transferInjectionKey, undefined);
    const countSelected = computed(() => props.dataInfo.selected.length);
    const countRendered = computed(() => props.dataInfo.data.length);
    const app = getCurrentInstance();
    const t = createI18nTranslate('NTransferBody', app);

    const checked = computed(
      () => props.dataInfo.selected.length > 0 && props.dataInfo.selected.length === props.dataInfo.allValidValues.length
    );
    const indeterminate = computed(
      () => props.dataInfo.selected.length > 0 && props.dataInfo.selected.length < props.dataInfo.allValidValues.length
    );

    const handleSelectAllChange = (v: boolean) => {
      if (v) {
        transferCtx?.onSelect([...props.selected, ...props.dataInfo.allValidValues]);
      } else {
        transferCtx?.onSelect(props.selected.filter((value) => !props.dataInfo.allValidValues.includes(value)));
      }
    };

    const filteredData = computed(() =>
      props.dataInfo.data.filter((item) => {
        if (filter.value) {
          return props.filterFunc ? props.filterFunc(item, filter.value, props.type) : item.label.includes(filter.value);
        }
        return true;
      })
    );

    const handleSearch = (value: string) => {
      emit('search', value, props.type);
    };

    const handleClear = () => {
      transferCtx?.moveTo(props.dataInfo.allValidValues, 'source');
    };

    const renderList = () => {
      if (filteredData.value.length > 0) {
        return slots?.default ? (
          slots?.default({
            data: filteredData.value,
            selectedKeys: transferCtx?.selected,
            onSelect: transferCtx?.onSelect,
          })
        ) : (
          <NCheckboxGroup
            modelValue={transferCtx?.selected}
            onChange={(v: string[]) => {
              transferCtx?.onSelect(v);
            }}
            class={ns.e('body-list')}>
            {filteredData.value.map((item) => (
              <TransferListItem
                key={item.value}
                type={props.type}
                data={item}
                simple={props.simple}
                allowClear={props.allowClear}
                disabled={item.disabled}
              />
            ))}
          </NCheckboxGroup>
        );
      } else {
        return <div class={ns.e('body-list-empty')}>{t('noData')}</div>;
      }
    };

    return () => (
      <div class={ns.b()}>
        <div class={ns.e('header')}>
          {slots?.title ? (
            slots?.title({
              countTotal: props.dataInfo.data.length,
              countSelected: props.dataInfo.selected.length,
              searchValue: filter,
              checked: checked,
              indeterminate: indeterminate,
              onSelectAllChange: handleSelectAllChange,
              onClear: handleClear,
            })
          ) : (
            <>
              <span class={ns.e('header-title')}>
                {props.allowClear || props.simple || !props.showSelectAll ? (
                  <span class={ns.e('header-title-simple')}>{props.title}</span>
                ) : (
                  <Checkbox
                    class={ns.e('header-title-checkbox')}
                    modelValue={checked.value}
                    halfChecked={indeterminate.value}
                    onChange={handleSelectAllChange}>
                    {props.title}
                  </Checkbox>
                )}
                {!props.simple ? (
                  <span class={ns.e('header-count')}>
                    (
                    <span class={ns.e('header-count-num')}>
                      {props.dataInfo.selected.length
                        ? `${props.dataInfo.selected.length}/${props.dataInfo.data.length}`
                        : props.dataInfo.data.length}
                    </span>
                    <span class={ns.e('header-count-unit')}>项</span>)
                  </span>
                ) : null}
              </span>
              {props.allowClear ? <Icon name="delete" class={ns.e('header-clear-btn')} onClick={handleClear}></Icon> : null}
            </>
          )}
        </div>
        {props.showSearch ? (
          <div class={ns.e('search')}>
            <Input
              modelValue={filter.value}
              placeholder={props.placeholder}
              onInput={(v: string) => (filter.value = v)}
              onChange={handleSearch}
              v-slots={{
                suffix: <SearchIcon />,
              }}
            />
          </div>
        ) : null}
        <div class={ns.e('body')}>{renderList()}</div>
      </div>
    );
  },
});
