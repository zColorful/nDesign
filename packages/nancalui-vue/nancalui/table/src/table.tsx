import { provide, defineComponent, getCurrentInstance, computed, toRef, ref, onMounted, nextTick, withModifiers, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { tableProps, TableProps, TABLE_TOKEN, ITableInstanceAndDefaultRow } from './table-types';
import { useTable, useTableLayout, useTableWatcher } from './composables/use-table';
import { useHorizontalScroll } from './composables/use-horizontal-scroll';
import { createStore } from './store';
import FixHeader from './components/fix-header';
import NormalHeader from './components/normal-header';
import { LoadingDirective } from '../../loading';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './table.scss';

let tableIdInit = 1;

export default defineComponent({
  name: 'NTable',
  directives: {
    Loading: LoadingDirective,
  },
  props: tableProps,
  emits: [
    'sort-change',
    'cell-click',
    'row-click',
    'check-change',
    'check-all-change',
    'expand-change',
    'load-more',
    'row-dblclick',
    'cell-dblclick',
  ],
  setup(props: TableProps, ctx: SetupContext) {
    const table = getCurrentInstance() as ITableInstanceAndDefaultRow;

    const store = createStore(toRef(props, 'data'), table, ctx);
    const tableId = `nancalui-table_${tableIdInit++}`;
    const tableRef = ref();
    table.tableId = tableId;
    table.store = store;
    provide<ITableInstanceAndDefaultRow>(TABLE_TOKEN, table);
    const { tableWidth, updateColumnWidth } = useTableLayout(table);
    const { classes, styles } = useTable(props, tableWidth);
    const { onTableScroll } = useHorizontalScroll(table);
    useTableWatcher(props, store);
    const isEmpty = computed(() => props.data.length === 0);

    const ns = useNamespace('table');
    const hiddenColumns = ref(null);
    table.hiddenColumns = hiddenColumns;
    table.tableRef = tableRef;
    table.updateColumnWidth = updateColumnWidth;
    const scrollTop = ref(0);
    provide('getScrollTop', scrollTop);
    ctx.expose({
      store,
    });

    onMounted(async () => {
      await nextTick();
      store.updateColumns();
      store.updateFirstDefaultColumn();
      store.updateRows();
      // updateColumnWidth();
      // window.addEventListener('resize', updateColumnWidth);
    });

    return () => (
      <div ref={tableRef} class={ns.b()} style={styles.value} v-loading={props.showLoading}>
        <div
          class={ns.e('container')}
          id="scroll-body"
          onScroll={withModifiers(
            ($event: any) => {
              onTableScroll($event);
              if (props.virtualized) {
                scrollTop.value = $event.target.scrollTop;
              }
            },
            ['stop']
          )}>
          <div ref={hiddenColumns} class="hidden-columns">
            {ctx.slots.default?.()}
          </div>

          {props.fixHeader ? (
            <FixHeader classes={classes.value} is-empty={isEmpty.value} emptyContent={ctx.slots.empty ? ctx.slots.empty() : <n-empty />} />
          ) : (
            <NormalHeader classes={classes.value} is-empty={isEmpty.value} />
          )}
          {isEmpty.value && !props.fixHeader && <div class={ns.e('empty')}>{ctx.slots.empty ? ctx.slots.empty() : <n-empty />}</div>}
        </div>
      </div>
    );
  },
});
