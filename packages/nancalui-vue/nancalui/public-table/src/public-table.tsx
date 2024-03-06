import { defineComponent, reactive, ref, watch, toRefs, getCurrentInstance, nextTick } from 'vue';
import { publicTableProps, PublicTableProps } from './public-table-types';
import emptyImg from '../../../docs/assets/table-no-content.png';
import './public-table.scss';

export default defineComponent({
  name: 'NPublicTable',
  components: {},
  props: publicTableProps,
  emits: ['cell-click', 'tablePageChange', 'handle-selection-change', 'row-click', 'headerIconClickFn'],
  setup(props: PublicTableProps, { emit, slots }) {
    const { pagination, rowKey, tableData } = toRefs(props);

    const publicTableComponent = ref();
    const state = reactive({
      paginationData: {
        pageSizes: [10, 20, 50, 100], // 每次展示条数的可配置项
        layout: 'total,pager,sizes,jumper',
        currentPage: 1,
        pageSize: 10,
        maxItems: 5,
        size: 'sm',
        ...pagination.value,
      },
      data: tableData.value.list || [],
      configData: {
        // 其他配置
      },
      activeIds: [], // 回显选中项
      cancelIds: [], // 可编辑回显模式下取消的回显选中项
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // 点击某行
    const rowClick = (row: unknown) => {
      emit('row-click', row);
    };
    // 点击单元格
    const handleCellClick = (data: unknown) => {
      emit('cell-click', data);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // 清空所有勾选
    const clearSelection = () => {
      console.log(publicTableComponent.value);
      publicTableComponent.value.store.clearSelection();
    };
    // 设置高亮
    const setRowHighLight = (val: string) => {
      publicTableComponent.value.store.setRowHighLight(val);
    };

    // 提交查询数据请求
    const getTableDate = (init = true) => {
      state.paginationData.currentPage = init ? 1 : state.paginationData.currentPage;
      // 查询
      const data = {
        currentPage: state.paginationData.currentPage,
        pageSize: state.paginationData.pageSize,
      };

      emit('tablePageChange', data);
    };

    // 切换每页展示条数
    const handleSizeChange = (val: number) => {
      state.paginationData.pageSize = val;
      getTableDate();
    };
    // 页码变化查询
    const handleCurrentChange = (currentPage: number) => {
      // 表格current-change和分页current-change的事件一样，防止同时触发
      // if (typeof currentPage === 'number') {
      state.paginationData.currentPage = currentPage;
      getTableDate(false);
      // }
    };
    // 勾选数据变化
    const selectChange = (checkable: boolean, row: unknown, selection: Array<unknown>) => {
      // const _selection = selection.filter((item: any) => {
      //   return !item.disabledThisRow;
      // });

      // if (!checkable && row.isEditDataRow && !props.editDisabled) {
      //   state.cancelIds.push(row[rowKey.value]);
      //   console.log(state.cancelIds);
      //   delete row.isEditDataRow;
      // }

      emit('handle-selection-change', selection, row);
    };
    // 全部勾选数据变化
    const selectAll = (checkable: boolean, selection: Array<unknown>) => {
      // const _selection = selection.filter((item: any) => {
      //   return !item.disabledThisRow;
      // });
      emit('handle-selection-change', selection);
    };
    // 行key
    const getRowKeys = (row: never) => {
      return row[rowKey.value];
    };
    // 头部图标点击事件
    const headerIconClickFn = (data: unknown) => {
      emit('headerIconClickFn', data);
    };
    // 设置某行选中还是取消
    const toggleRowSelection = (item: any, isSelect: boolean) => {
      publicTableComponent.value.store.toggleRowSelection(item, isSelect);
    };
    // 已有数据选中/取消选中
    const activeDataRow = (data: Array<unknown>, isSelect = true) => {
      data.forEach((row: any) => {
        state.data.find((item: any) => {
          if (row[rowKey.value] === item[rowKey.value]) {
            // if (props.editDisabled) {
            //   item.disabledThisRow = true;
            // } else {
            //   item.disabledThisRow = false;
            // }
            return publicTableComponent.value?.store.toggleRowSelection(item, isSelect);
          } else {
            return null;
          }
        });
      });
    };
    // 获取当前选中的行数据
    const getCheckedRows = () => {
      const activeRows = publicTableComponent.value.store.getCheckedRows();
      return activeRows;
    };

    // 设置一行的 CheckBox 是否可以勾选
    // const selectable = (row: any) => {
    //   if (row.disabledThisRow) {
    //     // 根据行属性禁用
    //     return false;
    //   } else {
    //     console.log(state.activeIds);
    //     if (state.activeIds.includes(row[props.rowKey]) && editDisabled.value) {
    //       // 根据行id禁用
    //       row.disabledThisRow = true;
    //     } else {
    //       row.disabledThisRow = false;
    //     }
    //   }
    // };

    const { proxy }: any = getCurrentInstance();
    proxy.toggleRowSelection = toggleRowSelection;
    proxy.clearSelection = clearSelection;
    proxy.getCheckedRows = getCheckedRows;
    proxy.setRowHighLight = setRowHighLight;
    // 监听tableData变化
    watch(
      () => props.tableData,
      (newValue) => {
        state.data = newValue.list || [];
        state.paginationData.currentPage = newValue.pageNum || 1;
        state.paginationData.pageSize = newValue.pageSize || 12;

        if (props.configData && props.configData.selectRow) {
          // 勾选选中行
          state.configData = props.configData;
          state.activeIds = props.configData.selectRow.map((item: never) => {
            return item[rowKey.value];
          });
          state.data.forEach((element: any) => {
            if (props.editDisabled && state.activeIds.includes(element[props.rowKey])) {
              element.disabledThisRow = true;
            } else {
              // if (state.activeIds.includes(element[props.rowKey])) {
              //   // 可编辑回显项时候
              //   element.isEditDataRow = true;
              // }
              element.disabledThisRow = false;
            }
          });
          nextTick(() => {
            const _selectRow = props.configData.selectRow;
            // if (state.cancelIds.length) {
            //   // 可编辑回显项时候 过滤掉用户取消勾选的项
            //   _selectRow = props.configData.selectRow.map((item) => {
            //     return !state.cancelIds.includes(item[rowKey]);
            //   });
            // }
            activeDataRow(_selectRow);
          });
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
    return () => {
      // v-bind="$attrs"
      return (
        <div class="common-table">
          <div class="page-top">{slots.pageTop?.()}</div>
          <div class="page-mid">
            <n-table
              ref={publicTableComponent}
              data={state.data}
              striped={props.striped}
              table-height={props.tableHeight + 'px'}
              max-height={props.maxHeight + 'px'}
              fix-header={props.fixHeader}
              border-type={props.borderType}
              row-key={props.rowKey}
              show-loading={props.loading}
              onCheckChange={selectChange}
              onCheckAllChange={selectAll}
              onRowClick={rowClick}
              onCellClick={handleCellClick}
              v-slots={{
                empty: () => {
                  const _dom = slots.empty ? (
                    <div>{slots.empty?.()}</div>
                  ) : (
                    <div class="table-no-content">
                      <img class="pic-no-conyent" src={emptyImg} alt="暂无内容" />
                      <div class="text">{props.emptyText}</div>
                    </div>
                  );
                  return _dom;
                },
              }}>
              {/* 是否需要勾选栏 */}
              {/* {props.isNeedSelection && <n-column type="checkable" width="85" checkable={selectable} reserve-check={true} />} */}
              {props.isNeedSelection && <n-column type="checkable" width={props.selectWidth} />}
              {props.isNeedIndex && <n-column type="index" headers="序号" width={props.indexWidth} />}
              {props.tableHeadTitles &&
                props.tableHeadTitles.length &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                props.tableHeadTitles.map((item: any) => {
                  const dom = item.slot ? (
                    <n-column
                      key={item.prop}
                      field={item.prop}
                      header={item.name}
                      width={item.width}
                      resizeable={item.resizeable}
                      showOverflowTooltip={props.showTooltip}
                      align="left">
                      {{
                        header: (scoped: unknown) => {
                          return item.headerSlot ? (
                            <div>{slots[item.headerSlot]?.({ editor: scoped })}</div>
                          ) : (
                            <span class="title"> {item.name}</span>
                          );
                        },
                        default: (scoped: unknown) => {
                          return <div>{slots[item.slot]?.({ editor: scoped })}</div>;
                        },
                      }}
                    </n-column>
                  ) : (
                    <n-column
                      key={item.prop}
                      field={item.prop}
                      header={item.name}
                      width={item.width}
                      resizeable={item.resizeable}
                      showOverflowTooltip={props.showTooltip}
                      align="left">
                      {{
                        header: (scoped: unknown) => {
                          return item.headerSlot ? (
                            <div>{slots[item.headerSlot]?.({ editor: scoped })}</div>
                          ) : (
                            <span class="title"> {item.name}</span>
                          );
                        },
                        default: (scoped: any) => {
                          return scoped && scoped.row ? (
                            <span>{scoped.row[item.prop] || scoped.row[item.prop] === 0 ? scoped.row[item.prop] : '--'}</span>
                          ) : (
                            ''
                          );
                        },
                      }}
                    </n-column>
                  );
                  return dom;
                })}
              {props.isDisplayAction && (
                <n-column field="" header="操作" align="left" fixedRight="0px" width={props.actionWidth}>
                  {{
                    default: (scoped: unknown) => {
                      return slots?.editor && slots.editor({ editor: scoped });
                    },
                  }}
                </n-column>
              )}

              {/* {{
                empty: () => {
                  const _dom = slots.empty ? (
                    <div>{slots.empty?.()}</div>
                  ) : (
                    <div class="table-no-content">
                      <img class="pic-no-conyent" src="@/assets/table-no-content.png" alt="暂无内容" />
                      <div class="text">{props.emptyText}</div>
                    </div>
                  );
                  return _dom;
                },
              }} */}
            </n-table>

            {props.showPagination && props.tableData.list?.length ? (
              <div class="nancalui-table-page">
                <n-pagination
                  pageIndex={state.paginationData.currentPage}
                  pageSize={state.paginationData.pageSize}
                  size={state.paginationData.size}
                  pageSizeOptions={state.paginationData.pageSizes}
                  maxItems={state.paginationData.maxItems}
                  layout={state.paginationData.layout}
                  total={props.tableData.total}
                  onPageSizeChange={handleSizeChange}
                  onPageIndexChange={handleCurrentChange}
                  canJumpPage={true}
                  canChangePageSize={true}
                  canViewTotal={true}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    };
  },
});
