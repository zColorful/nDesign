import { ExtractPropTypes } from 'vue';

export const publicTableProps = {
  striped: { type: Boolean, default: false }, // 斑马条纹
  isDisplayAction: { type: Boolean, default: false }, // 是否需要操作栏
  actionWidth: { type: Number, default: 130 }, // 操作栏宽度
  isNeedSelection: { type: Boolean, default: false }, // 是否需要多选
  isNeedIndex: { type: Boolean, default: false }, // 是否需要序号列
  borderType: { type: String, default: '' }, // 表格边框类型，默认行边框；bordered: 全边框；borderless: 无边框
  tableHeadTitles: { type: Array, default: [] }, // 表头信息
  pagination: { type: Object, default: {} }, // 分页器信息
  tableHeight: { type: Number, default: 400 }, // 表格高度
  maxHeight: { type: Number, default: null }, // 表格最大高度--流体高度
  showPagination: { type: Boolean, default: true }, // 是否显示页码
  rowKey: { type: String, default: 'id' }, // 行数据的 Key
  editDisabled: { type: Boolean, default: true }, // 编辑回显开启禁用已存在数据
  emptyText: { type: String, default: '暂无数据' }, // 空数据文案
  loading: { type: Boolean, default: false }, // loading状态
  tableData: { type: Object, default: {} }, // table数据 数据形式 {list:[],pageNum:'',pageSize:'',total:'',}
  configData: { type: Object, default: {} }, // table其他相关配置
  fixHeader: { type: Boolean, default: true }, // 是否固定表头
  selectWidth: { type: Number, default: 80 }, // 表格勾选框宽度
  indexWidth: { type: Number, default: 80 }, // 表格勾选框宽度
  showTooltip: { type: Boolean, default: false }, // 表格勾选框宽度
};

export type PublicTableProps = ExtractPropTypes<typeof publicTableProps>;
