import { ExtractPropTypes } from 'vue';

export const myTableProps = {
  showTips: { type: Boolean, default: true },
  showBorder: { type: Boolean, default: false },
  showBorderBottom: { type: Boolean, default: false },
  attrList: {
    type: Array,
    default: [],
  },
  tableData: {
    type: Array,
    default: [],
  },
  borderType: {
    type: String,
    default: '',
  },
  headerBg: {
    type: Boolean,
    default: false,
  },
  isPage: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  isAction: {
    type: Boolean,
    default: false,
  },
  isIndex: {
    type: Boolean,
    default: false,
  },
  rowKey:{
    type: String,
    default: 'id',
  },
  actionWidth: {
    type: String,
    default: '180px',
  },
  // 是否可以多选
  isSelection: {
    type: Boolean,
    default: false,
  },
  // 高亮单选行
  highlight: {
    type: Boolean,
    default: false,
  },
  // 页码工具
  layout: {
    type: String,
    default: 'total,prev,pager,next,sizes,jumper',
  },
  tableHeight:{
    type: String,
    default: '',
  },
  maxHeight:{
    type: String,
    default: '',
  },
  fixHeader:{
    type: Boolean,
    default: false,
  }
};

export type MyTableProps = ExtractPropTypes<typeof myTableProps>;
