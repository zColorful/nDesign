/* eslint-disable @typescript-eslint/indent */
import { CascaderOptionInfo } from '../../src/interface';
import { defineComponent, getCurrentInstance, PropType } from 'vue';
import { createI18nTranslate } from '../../../locale/create';
import { useUlClassName } from '../../hooks/use-cascader-class';
import { useDropdownStyle } from '../../hooks/use-cascader-style';
import { NCascaderItem } from '../cascader-item';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NCascaderListSearch',
  props: {
    options: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    loading: Boolean,
    activeKey: String,
    multiple: Boolean,
    checkStrictly: Boolean,
    pathLabel: Boolean,
    menuOpenClass: String,
    dropdownWidth: [Number, String],
  },
  setup(props, { slots }) {
    const app = getCurrentInstance();

    const ulClass = useUlClassName(props as any);
    const ulStyle = useDropdownStyle(props as any);
    const prefixCls = 'cascader-list-search';
    const ns = useNamespace('cascader');

    const renderEmpty = () => {
      return slots.empty?.() ?? '无搜索结果';
    };

    const renderContent = () => {
      <div class={`${props.menuOpenClass} ${ns.e('dropdown-menu')}`}></div>;
      if (props.loading) {
        return (
          <div key="panel-column-loading" class={[`${prefixCls}-panel-column`, `${prefixCls}-panel-column-loading`]}>
            加载中...
          </div>
        );
      }

      return props.options?.length ? (
        <ul class={ulClass.value} style={ulStyle.dropdownWidth}>
          {props.options?.map((item) => (
            <NCascaderItem
              key={item.key}
              option={item}
              active={item.key === props.activeKey}
              selected={false}
              multiple={props.multiple}
              checkStrictly={props.checkStrictly}
              pathLabel={props.pathLabel}
              searchOption
            />
          ))}
        </ul>
      ) : (
        <div class={ns.e('drop-no-data')} style={ulStyle.dropdownWidth}>
          {renderEmpty()}
        </div>
      );
    };

    return () => <>{renderContent()}</>;
  },
});
