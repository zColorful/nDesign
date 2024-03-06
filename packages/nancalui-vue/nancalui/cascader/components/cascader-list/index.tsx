import { CascaderOptionInfo } from '../../src/interface';
import { defineComponent, getCurrentInstance, PropType } from 'vue';
import { createI18nTranslate } from '../../../locale/create';
import { useUlClassName } from '../../hooks/use-cascader-class';
import { useDropdownStyle } from '../../hooks/use-cascader-style';
import { cascaderulProps, CascaderulProps } from '../../src/cascader-types';
import { NCascaderItem } from '../cascader-item';
import './index.scss';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NCascaderList',
  props: cascaderulProps,
  setup(props, { slots }) {
    const app = getCurrentInstance();

    const ulClass = useUlClassName(props as CascaderulProps);
    const ulStyle = useDropdownStyle(props as CascaderulProps);
    const ns = useNamespace('cascader');
    const prefixCls = 'cascader-list';

    const renderEmpty = () => {
      return slots.empty?.() ?? '无数据';
    };

    const renderColumn = (column: CascaderOptionInfo[], level = 0) => {
      return column.length ? (
        <ul role="menu" class={ulClass.value} style={{ ...ulStyle.dropdownWidth, zIndex: (props.totalLevel as number) - level }}>
          {column.map((item) => {
            return (
              <NCascaderItem
                key={item.key}
                option={item}
                active={props.selectedPath?.includes(item.key) || item.key === props.activeKey}
                selected={props.selectViewValue?.some((selectItem) => selectItem.option.path?.includes(item)) || false}
                multiple={props.multiple}
                checkStrictly={props.checkStrictly}
              />
            );
          })}
        </ul>
      ) : (
        <div class={ns.e('drop-no-data')} style={ulStyle.dropdownWidth}>
          {renderEmpty()}
        </div>
      );
    };

    const renderContent = () => {
      if (props.loading) {
        return (
          <div key="panel-column-loading" class={[`${prefixCls}-panel-column`, `${prefixCls}-panel-column-loading`]}>
            加载中...
          </div>
        );
      }

      if (props.displayColumns?.length) {
        return props.displayColumns?.map((column, index) => renderColumn(column, index));
      }

      return renderEmpty();
    };

    return () => <div class={`${props.menuOpenClass} ${ns.e('dropdown-menu')}`}>{renderContent()}</div>;
  },
});
