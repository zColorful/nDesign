import { computed, CSSProperties, defineComponent, PropType, Comment, Fragment } from 'vue';

import { isArray, isNumber, getAllElements } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { spaceProps } from './space-types';
import './space.scss';
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

export default defineComponent({
  name: 'NSpace',
  props: spaceProps,
  /**
   * @zh 设置分隔符
   * @en Set separator
   * @slot split
   */
  setup(props: spaceProps, { slots }) {
    const prefixCls = useNamespace('space').namespace;
    console.log(prefixCls);

    const mergedAlign = computed(() => props.align ?? (props.direction === 'horizontal' ? 'center' : ''));

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-${props.direction}`]: props.direction,
        [`${prefixCls}-align-${mergedAlign.value}`]: mergedAlign.value,
        [`${prefixCls}-wrap`]: props.wrap,
        [`${prefixCls}-fill`]: props.fill,
      },
    ]);

    function getMargin(size: SpaceSize) {
      if (isNumber(size)) {
        return size;
      }
      switch (size) {
      case 'mini':
          return 4;
        case 'small':
          return 8;
        case 'medium':
          return 16;
        case 'large':
          return 24;
        default:
          return 8;
      }
    }

    const getMarginStyle = (isLast: boolean): CSSProperties => {
      const style: CSSProperties = {};

      const marginRight = `${getMargin(isArray(props.size) ? props.size[0] : props.size)}px`;
      const marginBottom = `${getMargin(isArray(props.size) ? props.size[1] : props.size)}px`;

      if (isLast) {
        return props.wrap ? { marginBottom } : {};
      }

      if (props.direction === 'horizontal') {
        style.marginRight = marginRight;
      }
      if (props.direction === 'vertical' || props.wrap) {
        style.marginBottom = marginBottom;
      }

      return style;
    };

    return () => {
      const children = getAllElements(slots.default?.(), true).filter((item) => item.type !== Comment);

      return (
        <div class={cls.value}>
          {children.map((child, index) => {
            const shouldRenderSplit = slots.split && index > 0;
            return (
              <Fragment key={child.key ?? `item-${index}`}>
                {shouldRenderSplit && (
                  <div class={`${prefixCls}-item-split`} style={getMarginStyle(false)}>
                    {slots.split?.()}
                  </div>
                )}
                <div class={`${prefixCls}-item`} style={getMarginStyle(index === children.length - 1)}>
                  {child}
                </div>
              </Fragment>
            );
          })}
        </div>
      );
    };
  },
});
