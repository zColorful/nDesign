/* eslint-disable @typescript-eslint/indent */
import { computed, inject, PropType, ref, watch } from 'vue';
import './index.scss';
import { Icon } from '../../../icon';
import { Checkbox } from '../../../checkbox';
import { CascaderOption, CascaderOptionInfo } from '../../src/interface';
import { CascaderContext, cascaderInjectionKey } from '../../src/context';
import { isFunction } from 'lodash';

import { useNamespace } from '../../../shared/hooks/use-namespace';
import { getCheckedStatus, getOptionLabel } from '../../src/utils';
const ns = useNamespace('cascader');

export const NCascaderItem = (props: {
  option: CascaderOptionInfo;
  active: boolean;
  selected: boolean;
  multiple: boolean;
  checkStrictly: boolean;
  searchOption?: boolean;
  pathLabel?: boolean;
}): JSX.Element => {
  const cascaderCtx = inject<Partial<CascaderContext>>(cascaderInjectionKey, {});

  const isLoading = ref(false);
  const events: Record<string, any> = {};

  const handlePathChange = (ev: Event) => {
    if (isFunction(cascaderCtx.loadMore) && !props.option.isLeaf) {
      const { isLeaf, children, key } = props.option;
      if (!isLeaf && !children) {
        isLoading.value = true;
        new Promise<CascaderOption[] | undefined>((resolve) => {
          cascaderCtx.loadMore?.(props.option.raw, resolve);
        }).then((c?: CascaderOption[]) => {
          isLoading.value = false;
          if (c) {
            cascaderCtx.addLazyLoadOptions?.(c, key);
          }
        });
      }
    }
    cascaderCtx.setSelectedPath?.(props.option.key);
  };

  if (!props.option.disabled) {
    events.onMouseenter = [() => cascaderCtx.setActiveKey?.(props.option.key)];
    events.onMouseleave = () => cascaderCtx.setActiveKey?.();
    events.onClick = [];
    if (cascaderCtx.expandTrigger === 'hover') {
      events.onMouseenter.push((ev: Event) => handlePathChange(ev));
    } else {
      events.onClick.push((ev: Event) => handlePathChange(ev));
    }
    if (props.option.isLeaf && !props.multiple) {
      events.onClick.push((ev: Event) => {
        handlePathChange(ev);
        cascaderCtx.onClickOption?.(props.option);
      });
    }
  }

  const checkedStatus = computed(() => {
    if (props.checkStrictly) {
      return {
        checked: cascaderCtx.valueMap?.has(props.option.key),
        indeterminate: false,
      };
    }
    return getCheckedStatus(props.option, cascaderCtx.valueMap);
  });

  const rootClasses = computed(() => {
    return {
      [`${ns.e('li')} dropdown-item`]: true,
      'leaf-active': props.active,
      'leaf-checked': props.multiple ? checkedStatus.value?.checked || checkedStatus.value?.indeterminate : props.selected,
      disabled: props.option.disabled,
    };
  });

  const renderLabelContent = () => {
    if (props.pathLabel) {
      return cascaderCtx?.formatLabel?.(props.option.path.map((item) => item.raw)) ?? getOptionLabel(props.option);
    }
    if (cascaderCtx.slots?.option) {
      return cascaderCtx.slots.option({ data: props.option });
    }
    if (isFunction(props.option.render)) {
      return props.option.render();
    }
    return props.option.label;
  };

  return (
    <li class={rootClasses.value} {...events}>
      {props.multiple && (
        <div class="cascader-li__checkbox">
          <Checkbox
            modelValue={checkedStatus.value?.checked}
            disabled={props.option.disabled || props.option.selectionDisabled}
            halfChecked={checkedStatus.value.indeterminate}
            onChange={(value: any, ev: Event) => {
              ev.stopPropagation();
              handlePathChange(ev);
              cascaderCtx.onClickOption?.(props.option, !checkedStatus.value.checked);
            }}
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        </div>
      )}
      <div class="cascader-li__wraper">
        {props.option.icon && (
          <div class={'cascader-li__icon' + (props.option.disabled ? ' disabled' : '')}>
            <Icon name={props.option.icon} size="inherit" />
          </div>
        )}
        <div class="dropdown-item-label">
          <span>{renderLabelContent()}</span>
        </div>
        {Boolean(props.option.children?.length) && <Icon name="chevron-right" class="icon-has-child" size="16px" color="inherit" />}
      </div>
    </li>
  );
};
