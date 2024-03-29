import { defineComponent, provide } from 'vue';
import { breadcrumbProps, BreadcrumbProps, SourceConfig } from './breadcrumb-types';
import NBreadcrumbItem from './breadcrumb-item';
import { getPropsSlot } from '../../shared/utils/props-util';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './breadcrumb.scss';

export default defineComponent({
  name: 'NBreadcrumb',
  components: {
    NBreadcrumbItem,
  },
  props: breadcrumbProps,
  setup(props: BreadcrumbProps, { slots }) {
    const separatorIcon = getPropsSlot(slots, props, 'separatorIcon') ?? '/';
    provide('separatorIcon', separatorIcon);
    const ns = useNamespace('breadcrumb');

    const renderBreadcrumbItemRouted = (item: SourceConfig) => {
      return (
        <n-breadcrumb-item to={`path: ${item.link}`} replace={item.replace}>
          {item.title}
        </n-breadcrumb-item>
      );
    };
    const renderBreadcrumbItemDropdown = (item: SourceConfig) => {
      return (
        <n-breadcrumb-item menuList={item.children} showMenu={item.showMenu} to={`path: ${item.link}`} replace={item.replace}>
          {/* hrefLink */}
          {!item.noNavigation && (!item.linkType || item.linkType === 'hrefLink') ? (
            <a href={item.link} target={item.target ? item.target : '_self'}>
              {item.title}
            </a>
          ) : null}
          {/* normal */}
          {item.noNavigation ? <span>{item.title}</span> : null}
        </n-breadcrumb-item>
      );
    };
    const renderBreadItemList = (source: SourceConfig[]) => {
      return source.map((item: SourceConfig) => {
        if (!item.noNavigation && item.linkType === 'routerLink') {
          return renderBreadcrumbItemRouted(item);
        }
        if (item.children && item.children.length > 0) {
          return renderBreadcrumbItemDropdown(item);
        }
        return (
          <n-breadcrumb-item>
            {/* hrefLink */}
            {!item.noNavigation && (!item.linkType || item.linkType === 'hrefLink') ? (
              <a href={item.link} target={item.target ? item.target : '_self'}>
                {item.title}
              </a>
            ) : null}
            {/* normal */}
            {item.noNavigation ? <span>{item.title}</span> : null}
          </n-breadcrumb-item>
        );
      });
    };
    return () => {
      return <div class={ns.b()}>{props.source && props.source.length ? renderBreadItemList(props.source) : slots?.default?.()}</div>;
    };
  },
});
