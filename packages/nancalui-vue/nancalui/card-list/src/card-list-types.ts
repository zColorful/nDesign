import { ExtractPropTypes } from 'vue';

export const cardListProps = {
  /**
   * cardType必填，默认类型：1.数据源 2.数据开发/采集 3.数据质量 4.业务域
   */
  cardType: {
    type: Number,
    default: 1,
  },
  /**
   * data:{  必填，展示的列表数据，包含以下参数
   ** cardTitle：卡片头部名称
   ** cardDate:   卡片创建日期
   ** cardUser:   卡片创建角色名
   ** cardLogo:   卡片右边角图片
   ** cardStatus:   卡片右上角状态 0-已下线 1-已上线
   ** noCardContent:false  无调度策略内容
   ** cardContentTitle:   卡片内容部分名称
   ** cardContentLabel:[{name:'',value:'',type:1}]   卡片内容数组type:1表示普通文字 2表示数组按钮文字
   ** cardOperation:'12345'   卡片更多操作 1：发布 2：删除 3：编辑 4：下架 5：查看 6:立即执行
   ** cardRerunTitle:'重跑机制' 卡片重跑机制名称
   ** cardRerunNoOption:false 卡片重跑机制名称后无操作按钮
   ** cardDispatchNoOption:false 卡片调度策略名称后无操作按钮
   ** cardRerunLabel:[{name:'',value:'',type:1}]   卡片重跑机制内容数组type:1表示普通文字 2表示数组按钮文字
   ** cardRulerTitle:'' 卡片校验规则名称
   ** cardRulerLabel: ['为空效验'] 卡片展示规则列表
   ** showMore: 默认false，是否展示遮罩层
   * }
   */
  data: {
    type: Object,
    default: [],
  },
  /**
   * page，底部分页
   */
  page: {
    type: Object,
    default: null,
  },
  /**
   * noHeaderStatus，是否显示头部状态展示
   */
  noHeaderStatus: {
    type: Boolean,
    default: false,
  },
} as const;

export type CardListProps = ExtractPropTypes<typeof cardListProps>;
