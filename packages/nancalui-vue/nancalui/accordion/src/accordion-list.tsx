import { computed, defineComponent, getCurrentInstance, inject, toRefs } from 'vue';
import type { AccordionMenuItem, IAccordionContext } from './accordion.type';
import NAccordionMenu from './accordion-menu';
import NAccordionItem from './accordion-item';
import NAccordionItemHreflink from './accordion-item-hreflink';
import NAccordionItemRouterlink from './accordion-item-routerlink';
import { accordionProps } from './accordion-types';
import { getRootSlots } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'NAccordionList',
  components: {
    NAccordionMenu,
    NAccordionItem,
    NAccordionItemHreflink,
    NAccordionItemRouterlink,
  },
  inheritAttrs: false,
  props: {
    ...accordionProps,
    data: {
      type: Array as () => Array<AccordionMenuItem>,
      default: null,
    },
    deepth: {
      type: Number,
      default: 0,
    },
    parent: {
      type: Object as () => AccordionMenuItem,
      default: null,
    },
    innerListTemplate: Boolean,
  },

  setup(props, { attrs }) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DAccordion', app);

    const {
      childrenKey,
      deepth,
      parent,
      data,
      linkType,
      showNoContent,
      loadingKey,
      titleKey,
      linkTypeKey,
      loadingTemplate,
      noContentTemplate,
      innerListTemplate,
    } = toRefs(props);
    const ns = useNamespace('accordion');

    const deepValue = deepth.value;

    const rootSlots = getRootSlots();

    const accordionCtx = inject<IAccordionContext>('accordionContext');

    const loading = computed(() => {
      return parent.value && parent.value[loadingKey.value];
    });

    const noContent = computed(() => {
      const dataValue = data.value;
      return dataValue === undefined || dataValue === null || dataValue.length === 0;
    });

    return () => {
      return (
        <>
          {(!rootSlots?.innerListTemplate || deepth.value === 0 || innerListTemplate.value === false) && (
            <ul class={[ns.e('list')]} {...attrs}>
              {data.value.map((item) => {
                return (
                  <li class={ns.e('item')} key={item[titleKey.value] as string}>
                    {/* // TODO 菜单类型 n-accordion-menu */}
                    {item[childrenKey.value] !== undefined && (
                      <div class={ns.e('menu-item')}>
                        <n-accordion-menu {...props} item={item} deepth={deepValue} parent={parent.value}></n-accordion-menu>
                      </div>
                    )}
                    {/* 非菜单类型 */}
                    {item[childrenKey.value] === undefined && (
                      <>
                        {/* 普通类型 */}
                        {(!linkType.value || linkType.value === '') && (
                          <n-accordion-item {...props} item={item} deepth={deepValue} parent={parent.value}></n-accordion-item>
                        )}
                        {/* 路由链接类型 */}
                        {linkType.value === 'routerLink' && (
                          <n-accordion-item-routerlink
                            {...props}
                            item={item}
                            deepth={deepValue}
                            parent={parent.value}></n-accordion-item-routerlink>
                        )}
                        {/* 普通链接类型 */}
                        {linkType.value === 'hrefLink' && (
                          <n-accordion-item-hreflink
                            {...props}
                            item={item}
                            deepth={deepValue}
                            parent={parent.value}></n-accordion-item-hreflink>
                        )}
                        {/* 动态链接类型 */}
                        {linkType.value === 'dependOnLinkTypeKey' && (
                          <>
                            {item[linkTypeKey.value] === 'routerLink' && (
                              <n-accordion-item-routerlink
                                {...props}
                                item={item}
                                deepth={deepValue}
                                parent={parent.value}></n-accordion-item-routerlink>
                            )}
                            {item[linkTypeKey.value] === 'hrefLink' && (
                              <n-accordion-item-hreflink
                                {...props}
                                item={item}
                                deepth={deepValue}
                                parent={parent.value}></n-accordion-item-hreflink>
                            )}
                            {item[linkTypeKey.value] !== 'routerLink' && item[linkTypeKey.value] !== 'hrefLink' && (
                              <n-accordion-item {...props} item={item} deepth={deepValue} parent={parent.value}></n-accordion-item>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {rootSlots?.innerListTemplate &&
            innerListTemplate.value !== false &&
            deepValue !== 0 &&
            rootSlots.innerListTemplate?.({
              item: parent.value,
              deepth: deepValue,
              itemClickFn: accordionCtx?.itemClickFn,
              menuToggleFn: accordionCtx?.menuToggleFn,
            })}
          {(!rootSlots?.innerListTemplate || innerListTemplate.value === false) &&
            (loading.value || (noContent.value && showNoContent.value)) && (
            <ul class={[ns.e('list')]} {...attrs}>
              {
                // 加载中
                loading.value && (!rootSlots?.loadingTemplate || loadingTemplate.value === false) && (
                  <li class={ns.e('item')}>
                    <div class={[ns.e('item-title'), ns.m('overflow-ellipsis')]} style={{ textIndent: deepValue * 20 + 'px' }}>
                      {t('loading')}...
                    </div>
                  </li>
                )
              }
              {
                // 自定义加载
                loading.value &&
                    rootSlots?.loadingTemplate &&
                    loadingTemplate.value !== false &&
                    rootSlots.loadingTemplate?.({
                      item: parent.value,
                      deepth: deepValue,
                    })
              }
              {
                // 无数据
                showNoContent.value &&
                    !loading.value &&
                    noContent.value &&
                    (!rootSlots?.noContentTemplate || noContentTemplate.value === false) && (
                  <li class={ns.e('item')}>
                    <div
                      class={[ns.e('item-title'), ns.m('overflow-ellipsis'), ns.m('disabled')]}
                      style={{ textIndent: deepValue * 20 + 'px' }}>
                      {t('noData')}
                    </div>
                  </li>
                )
              }
              {
                // 自定义加载
                showNoContent.value &&
                    !loading.value &&
                    noContent.value &&
                    rootSlots?.noContentTemplate &&
                    noContentTemplate.value !== false &&
                    rootSlots.noContentTemplate?.({
                      item: parent.value,
                      deepth: deepValue,
                    })
              }
            </ul>
          )}
        </>
      );
    };
  },
});
