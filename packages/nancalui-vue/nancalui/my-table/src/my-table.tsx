import { defineComponent, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { myTableProps, MyTableProps } from './my-table-types';
import emptyImg from './assets/no-table-image.png';
import './my-table.scss';

export default defineComponent({
  name: 'NMyTable',
  components: {
    dataContent: {
      functional: true,
      props: {
        data: {
          type: Object,
          default: () => null,
        },
        index: {
          type: Number,
          default: () => 0,
        },
        renders: {
          type: Function,
        },
      },
      // eslint-disable-next-line @typescript-eslint/ban-types
      render(ctx: { data: unknown; index: number; renders: Function }) {
        return ctx.renders(ctx.data, ctx.index) || '--';
      },
    },
  },
  props: myTableProps,
  emits: [
    'pageChange',
    'rowClick',
    'selectChange',
    'selectAllChange',
    'row-dblclick',
    'sizeChange',
    'cell-dbclick',
    'cell-dblclick',
    'cell-click',
  ],
  setup(props: MyTableProps, ctx) {
    const myTableComponent = ref();
    const page = reactive<{ value: number }>({ value: 1 });
    const pageNum = reactive<{ value: number }>({ value: 10 });
    const calcHeight = ref('0px');

    watch(
      () => props.currentPage,
      (newValue) => {
        page.value = newValue;
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      () => props.pageSize,
      (newValue) => {
        pageNum.value = newValue;
      },
      {
        immediate: true,
        deep: true,
      }
    );
    const setHeight = () => {
      const table = document.querySelector('.nancalui-table');
      if (table) {
        const { top } = table.getBoundingClientRect();
        const bodyH = document.body.clientHeight;
        calcHeight.value = bodyH - top - props.autoHeightValue + 'px';
      }
    };
    onMounted(() => {
      if (props.autoHeight) {
        nextTick(() => {
          setHeight();
        });
        window.addEventListener('resize', setHeight);
      }
    });
    onUnmounted(() => {
      window.removeEventListener('resize', setHeight);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const setScrollTop = () => {
      myTableComponent.value.store.setScrollTop();
    };
    const rowClick = (row: unknown) => {
      ctx.emit('rowClick', row);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clearSelection = () => {
      myTableComponent.value?.store?.clearSelection();
    };
    const toggleRowSelection = (item: any, isSelect: boolean) => {
      myTableComponent.value?.store?.toggleRowSelection(item, isSelect);
    };
    const handleSizeChange = (val: number) => {
      ctx.emit('sizeChange', val);
    };

    const handleCurrentChange = (currentPage: number) => {
      // 表格current-change和分页current-change的事件一样，防止同时触发
      if (typeof currentPage === 'number') {
        ctx.emit('pageChange', currentPage);
      }
    };

    const selectChange = (checkable: boolean, row: unknown, selection: Array<unknown>) => {
      ctx.emit('selectChange', checkable, row, selection);
    };

    const selectAll = (checkable: boolean, selection: Array<unknown>) => {
      ctx.emit('selectAllChange', checkable, selection);
    };

    const handleDblclick = (data: unknown) => {
      ctx.emit('row-dblclick', data);
    };
    const handleCellClick = (data: unknown) => {
      ctx.emit('cell-click', data);
    };
    const handleCellDbClick = (data: unknown) => {
      ctx.emit('cell-dbclick', data);
    };
    const emptyRender = () => {
      return (
        <section class="table-empty">
          <img src={emptyImg} />
          <p class="empty-word">无数据，请录入查询对象</p>
        </section>
      );
    };
    ctx.expose({ setHeight, clearSelection, toggleRowSelection });
    return () => {
      // v-bind="$attrs"
      return (
        <div>
          <n-table
            v-slots={{
              empty: ctx.slots.empty ? ctx.slots.empty() : emptyRender(),
            }}
            ref={myTableComponent}
            data={props.tableData}
            highlightCurrentRow={props.highlight}
            border={props.showBorder}
            rowKey={props.rowKey}
            max-height={props.maxHeight}
            table-height={props.autoHeight ? calcHeight.value : props.tableHeight}
            fix-header={props.fixHeader}
            style={{
              width: '100%',
              border: props.showBorder ? '1px solid #DCDCDC' : 'none',
              borderBottom: props.showBorderBottom ? '1px solid #DCDCDC' : 'none',
            }}
            borderType={props.borderType}
            headerBg={props.headerBg}
            onCheckChange={selectChange}
            onCheckAllChange={selectAll}
            onRowClick={rowClick}
            onRowDblclick={handleDblclick}
            onCellClick={handleCellClick}
            onCellDbClick={handleCellDbClick}>
            {props.isSelection && <n-column type="checkable" width="75" reserveCheck={true} />}
            {props.isIndex && (
              <n-column type="index" width="50px">
                {{
                  header: () => {
                    return <span>#</span>;
                  },
                }}
              </n-column>
            )}
            {props.attrList &&
              props.attrList.length &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              props.attrList.map((item: any, index: number) => {
                let childColumn: (() => unknown) | null = null;
                if (item?.children?.length) {
                  childColumn = () => {
                    return item.children.map(
                      (
                        col: {
                          name: string;
                          prop: string;
                          width: string | number;
                          renders: unknown;
                          fixedRight: string;
                          fixedLeft: string;
                        },
                        key: number
                      ) => {
                        return (
                          <n-column
                            key={col.name + key}
                            field={col.prop}
                            header={col.name}
                            width={col.width}
                            align="left"
                            fixedLeft={col.fixedLeft}
                            fixedRight={col.fixedRight}>
                            {{
                              default: (scoped: any) => {
                                if (col.renders) {
                                  return <dataContent data={scoped.row} index={scoped.rowIndex} renders={col.renders} />;
                                }
                                return scoped?.row[col.prop] || '--';
                              },
                            }}
                          </n-column>
                        );
                      }
                    );
                  };
                }

                return (
                  <n-column
                    key={item.name + index}
                    field={item.prop}
                    header={item.name}
                    minWidth={item.width}
                    width={item.maxWidth}
                    showOverflowTooltip={props.showTips}
                    align="left"
                    fixedLeft={item.fixedLeft}
                    fixedRight={item.fixedRight}>
                    {{
                      default: (scoped: any) => {
                        if (item.renders) {
                          return <dataContent data={scoped.row} index={scoped.rowIndex} renders={item.renders} />;
                        } else if (item.children) {
                          return childColumn && childColumn();
                        }
                        return scoped?.row[item.prop] || '--';
                      },
                      header: (scoped: any) => {
                        if (item.header && typeof item.header !== 'string') {
                          return <dataContent data={scoped.row} index={scoped.rowIndex} renders={item.header} />;
                        }
                        return <span class="title">{item.name}</span>;
                      },
                    }}
                  </n-column>
                );
              })}
            {props.isAction && (
              <n-column field="" header="操作" align="left" fixedRight="0px" width={props.actionWidth}>
                {{
                  default: (scoped: unknown) => {
                    return ctx?.slots?.action && ctx.slots.action(scoped);
                  },
                }}
              </n-column>
            )}
          </n-table>
          {props.isPage && props.tableData.length ? (
            <div class="nancalui-table-page">
              <n-pagination
                background
                size="sm"
                pageIndex={props.currentPage}
                pageSizeOptions={[10, 30, 50, 100]}
                pageSize={props.pageSize}
                layout={props.layout}
                total={props.total}
                onPageSizeChange={handleSizeChange}
                onPageIndexChange={handleCurrentChange}
                maxItems={5}
                canJumpPage={true}
                canChangePageSize={true}
                canViewTotal={true}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      );
    };
  },
});
