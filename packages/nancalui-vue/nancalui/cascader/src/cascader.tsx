import { defineComponent, Transition, SetupContext, provide, Teleport, ref, computed } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import NCascaderList from '../components/cascader-list';
import NCascaderListSearch from '../components/cascader-list-search';
import NMultipleBox from '../components/cascader-multiple/index';
import { cascaderProps, CascaderProps } from './cascader-types';
import { useCascader } from '../hooks/use-cascader';
import { FlexibleOverlay, Placement } from '../../overlay';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import NInput from '../../input/src/input';
import './cascader.scss';
import SelectArrowIcon from '../../shared/components/dropdown-icon';

export default defineComponent({
  name: 'NCascader',
  components: { NInput },
  props: cascaderProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props: CascaderProps, ctx: SetupContext) {
    const ns = useNamespace('cascader');
    const {
      origin,
      overlayRef,
      rootClasses,
      menuOpenClass,
      inputValue,
      openPopup,
      rootStyle,
      showClearable,
      position,
      showClear,
      hideClear,
      multiple,

      optionInfos,
      filteredLeafOptions,
      selectedPath,
      activeKey,
      displayColumns,
      computedInputValue,
      computedPopupVisible,
      handleClear,
      selectViewValue,
      handleInputValueChange,
      showSearchPanel,
      handlePopupVisibleChange,
      handleFocus,
      handleBlur,
      handleRemove,
      mergedDisabled,
      totalLevel,
    } = useCascader(props, ctx);
    const { slots } = ctx;
    provide(POPPER_TRIGGER_TOKEN, origin);
    const focusing = ref<boolean>(false);

    const focus = (e: FocusEvent) => {
      handleFocus(e);
      focusing.value = true;
    };

    const blur = (e: FocusEvent) => {
      handleBlur(e);
      focusing.value = false;
    };

    const inputShowValue = computed(() => {
      return props.filterable
        ? focusing.value
          ? computedInputValue.value
          : selectViewValue.value?.[0]?.label
        : selectViewValue.value?.[0]?.label;
    });

    return () => (
      <div style={rootStyle.inputWidth}>
        <PopperTrigger>
          {ctx.slots.host ? (
            ctx.slots.host()
          ) : (
            <div class={rootClasses.value} {...ctx.attrs} onMouseenter={showClear} onMouseleave={hideClear}>
              {multiple.value ? (
                <NMultipleBox placeholder={props.placeholder} tagList={selectViewValue.value} onRemove={handleRemove}></NMultipleBox>
              ) : (
                <NInput
                  disabled={mergedDisabled}
                  placeholder={selectViewValue.value?.[0]?.label}
                  modelValue={inputShowValue.value}
                  size={props.size}
                  onInput={handleInputValueChange}
                  onFocus={focus}
                  onBlur={blur}
                  readonly={!props.filterable}
                />
              )}
              {!showClearable.value && (
                <div class={`${ns.e('icon')} ${ns.m('drop-icon-animation')}`}>
                  <SelectArrowIcon />
                </div>
              )}
              {showClearable.value && props.clearable && (
                <div class={`${ns.e('icon')} ${ns.e('close')}`} onClick={handleClear}>
                  <n-icon name="close" size="12px"></n-icon>
                </div>
              )}
            </div>
          )}
        </PopperTrigger>
        <Teleport to="body">
          <Transition name="fade">
            <FlexibleOverlay
              origin={origin.value}
              ref={overlayRef}
              v-model={computedPopupVisible.value}
              position={position.value as Placement[]}
              align="start"
              style={{ zIndex: 'var(--nancalui-z-index-dropdown, 1052)' }}>
              <div class={ns.e('drop-menu-animation')}>
                {showSearchPanel.value ? (
                  <NCascaderListSearch
                    options={filteredLeafOptions.value}
                    activeKey={activeKey.value}
                    multiple={multiple.value}
                    checkStrictly={props.checkStrictly}
                    loading={props.loading}
                    pathLabel={!props.searchOptionOnlyLabel}
                    menuOpenClass={menuOpenClass.value}
                    dropdownWidth={(props.dropdownWidth as any) ?? props.width}>
                    {slots?.empty?.()}
                  </NCascaderListSearch>
                ) : (
                  <NCascaderList
                    displayColumns={displayColumns.value}
                    selectViewValue={selectViewValue.value}
                    selectedPath={selectedPath.value}
                    activeKey={activeKey.value}
                    multiple={multiple.value}
                    totalLevel={totalLevel.value}
                    checkStrictly={props.checkStrictly}
                    loading={props.loading}
                    menuOpenClass={menuOpenClass.value}
                    dropdownWidth={(props.dropdownWidth as any) ?? props.width}>
                    {slots?.empty?.()}
                  </NCascaderList>
                )}
              </div>
            </FlexibleOverlay>
          </Transition>
        </Teleport>
      </div>
    );
  },
});
