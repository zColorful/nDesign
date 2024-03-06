import { computed, defineComponent, inject, ref, provide, withModifiers } from 'vue';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { useHorizontalScroll } from '../composables/use-horizontal-scroll';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../table-types';

export default defineComponent({
  props: {
    classes: {
      type: Object,
      default: () => ({}),
    },
    isEmpty: {
      type: Boolean,
    },
    emptyContent: {
      type: Object,
      default: () => null,
    },
  },
  setup(props: { classes: Record<string, unknown>; isEmpty: boolean; emptyContent?: unknown }) {
    const ns = useNamespace('table');
    const table = inject(TABLE_TOKEN, undefined) as ITableInstanceAndDefaultRow;
    const showHeader = computed(() => Boolean(table?.props.showHeader));
    const { onTableScroll } = useHorizontalScroll(table);
    const scrollTop = ref(0);
    provide('getScrollTop', scrollTop);
    return () => (
      <div
        class={ns.e('fix-header')}
        id="scroll-header"
        onScroll={withModifiers(
          ($event: any) => {
            onTableScroll($event);
            if (table.props.virtualized) {
              scrollTop.value = $event.target.scrollTop;
            }
          },
          ['stop']
        )}>
        {showHeader.value && (
          <div class={ns.e('header-wrapper')}>
            <table class={props.classes} cellpadding="0" cellspacing="0">
              <ColGroup />
              <TableHeader />
            </table>
          </div>
        )}
        {props.isEmpty && <div class={ns.e('empty')}>{props.emptyContent ? props.emptyContent : null}</div>}
        {!props.isEmpty && (
          <div class={ns.e('scroll-view')}>
            <table class={props.classes} cellpadding="0" cellspacing="0">
              <ColGroup />
              <TableBody style="flex: 1" />
            </table>
          </div>
        )}
      </div>
    );
  },
});
