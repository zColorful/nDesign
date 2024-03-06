import { TriggerPosition } from '../../shared/_utils/constant';
import { ClassName } from '../../shared/_utils/types';
import { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export const tProps = {
  /**
   * @zh 文字气泡是否可见
   * @en Whether the tooltip is visible
   * @vModel
   */
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 文字气泡默认是否可见（非受控模式）
   * @en Whether the tooltip is visible by default (uncontrolled mode)
   */
  defaultPopupVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 文字气泡内容
   * @en Tooltip content
   */
  content: String,
  /**
   * @zh 弹出位置
   * @en Popup position
   * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
   */
  position: {
    type: String as PropType<TriggerPosition>,
    default: 'top',
  },
  /**
   * @zh 是否展示为迷你尺寸
   * @en Whether to display as a mini size
   */
  mini: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 弹出框的背景颜色
   * @en Background color of the popover
   */
  backgroundColor: {
    type: String,
  },
  /**
   * @zh 弹出框内容的类名
   * @en The class name of the popup content
   */
  contentClass: {
    type: [String, Array, Object] as PropType<ClassName>,
  },
  /**
   * @zh 弹出框内容的样式
   * @en The style of the popup content
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @zh 弹出框箭头的类名
   * @en The class name of the popup arrow
   */
  arrowClass: {
    type: [String, Array, Object] as PropType<ClassName>,
  },
  /**
   * @zh 弹出框箭头的样式
   * @en The style of the popup arrow
   */
  arrowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer: {
    type: [String, Object] as PropType<string | HTMLElement | null | undefined>,
  },
  /**
   * @zh mouseenter事件延时触发的时间（毫秒）
   * @en Delay trigger time of mouseenter event (ms)
   */
  mouseEnterDelay: {
    type: Number,
    default: 100,
  },
  /**
   * @zh mouseleave事件延时触发的时间（毫秒）
   * @en Delay trigger time of mouseleave event (ms)
   */
  mouseLeaveDelay: {
    type: Number,
    default: 100,
  },
  /**
   * @zh 是否在移出触发器，并移入弹出框时保持弹出框显示
   * @en Whether to prevent elements in the pop-up layer from gaining focus when clicked
   */
  enterable: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 触发器是否禁用
   * @en Whether the trigger is disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  popupOffset: {
    type: Number,
    default: 8,
  },
};

export const emits = {
  'update:popupVisible': (visible: boolean) => true,
  /**
   * @zh 文字气泡显示状态改变时触发
   * @en Emitted when the tooltip display status changes
   * @param {boolean} visible
   */
  popupVisibleChange: (visible: boolean) => true,
};

export type TProps = ExtractPropTypes<typeof tProps>;
