import {
  defineComponent,
  provide,
  reactive,
  ref,
  Transition,
  toRefs,
  getCurrentInstance,
  onMounted,
  Teleport,
  watch,
  withModifiers,
  onUnmounted,
} from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps, SelectContext } from './select-types';
import { SELECT_TOKEN } from './const';
import { Checkbox } from '../../checkbox';
import Option from './components/option';
import { useNamespace } from '../../shared/hooks/use-namespace';
import SelectContent from './components/select-content';
import useSelectFunction from './composables/use-select-function';
import './select.scss';
import { createI18nTranslate } from '../../locale/create';
import { FlexibleOverlay, Placement } from '../../overlay';

export default defineComponent({
  name: 'NSelect',
  props: selectProps,
  emits: ['toggle-change', 'value-change', 'update:modelValue', 'focus', 'blur', 'remove-tag', 'clear'],
  setup(props: SelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DSelect', app);

    const selectRef = ref();
    const { isSelectFocus, focus, blur } = useSelectFunction(props, selectRef);
    const {
      selectDisabled,
      selectDisabledBorder,
      selectSize,
      originRef,
      dropdownRef,
      isOpen,
      selectCls,
      mergeOptions,
      selectedOptions,
      filterQuery,
      emptyText,
      isLoading,
      isShowEmptyText,
      valueChange,
      handleClear,
      updateInjectOptions,
      tagDelete,
      onFocus,
      onBlur,
      debounceQueryFilter,
      isDisabled,
      toggleChange,
      isShowCreateOption,
    } = useSelect(props, selectRef, ctx, focus, blur, isSelectFocus, t);

    const scrollbarNs = useNamespace('scrollbar');
    const ns = useNamespace('select');
    const dropdownCls = ns.e('dropdown');
    const listCls = {
      [ns.e('dropdown-list')]: true,
      [scrollbarNs.b()]: true,
    };
    const dropdownEmptyCls = ns.em('dropdown', 'empty');
    ctx.expose({ focus, blur, toggleChange });
    const isRender = ref<boolean>(false);
    const position = ref<Placement[]>(['bottom-start', 'top-start', 'bottom-end', 'top-end']);
    const dropdownWidth = ref('0');

    const updateDropdownWidth = () => {
      const defaultWidth = originRef?.value?.clientWidth ? originRef.value.clientWidth + 'px' : '100%';
      const configWidth = props.dropdownWidth;
      dropdownWidth.value = configWidth || defaultWidth;
    };

    watch(selectRef, (val) => {
      if (val) {
        originRef.value = val.$el;
        updateDropdownWidth();
      }
    });

    watch(isOpen, (val) => {
      if (val) {
        updateDropdownWidth();
      }
    });

    onMounted(() => {
      isRender.value = true;
      updateDropdownWidth();
      window.addEventListener('resize', updateDropdownWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateDropdownWidth);
    });

    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        selectDisabled,
        selectDisabledBorder,
        selectSize,
        isOpen,
        selectedOptions,
        filterQuery,
        valueChange,
        handleClear,
        updateInjectOptions,
        tagDelete,
        onFocus,
        onBlur,
        debounceQueryFilter,
      }) as SelectContext
    );
    return () => {
      return (
        <div
          class={selectCls.value}
          onClick={withModifiers(() => {
            isOpen.value ? blur() : '';
            toggleChange(!isOpen.value);
          }, ['stop'])}>
          <SelectContent ref={selectRef}></SelectContent>
          <Teleport to="body">
            <Transition name="fade">
              <FlexibleOverlay
                class={props?.popperClass ? props.popperClass : ''}
                v-model={isRender.value}
                ref={dropdownRef}
                origin={originRef.value}
                align="start"
                offset={4}
                position={position.value}
                style={{
                  visibility: isOpen.value ? 'visible' : 'hidden',
                  'z-index': isOpen.value ? 9999 : -1,
                }}>
                <div
                  class={dropdownCls}
                  style={{
                    minWidth: `${dropdownWidth.value}`,
                    width: props.dropdownWidth,
                    visibility: isOpen.value ? 'visible' : 'hidden',
                  }}>
                  <ul class={listCls} v-show={!isLoading.value}>
                    {isShowCreateOption.value && (
                      <Option value={filterQuery.value} name={filterQuery.value} create>
                        {props.multiple ? <Checkbox modelValue={false} label={filterQuery.value} /> : filterQuery.value}
                      </Option>
                    )}
                    {ctx.slots?.default && ctx.slots.default()}
                    {!ctx.slots?.default &&
                      mergeOptions.value.length >= 1 &&
                      mergeOptions.value.map((item) => (
                        <Option key={item.value} value={item.value} name={item.name} disabled={isDisabled(item)}>
                          {props.multiple ? (
                            <Checkbox modelValue={item._checked} label={item.name} disabled={isDisabled(item)} />
                          ) : (
                            item.name || item.value
                          )}
                        </Option>
                      ))}
                  </ul>
                  {isShowEmptyText.value && (
                    <div>
                      {ctx.slots?.empty && ctx.slots.empty()}
                      {!ctx.slots?.empty && <p class={dropdownEmptyCls}>{emptyText.value}</p>}
                    </div>
                  )}
                </div>
              </FlexibleOverlay>
            </Transition>
          </Teleport>
        </div>
      );
    };
  },
});
