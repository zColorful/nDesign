/* eslint-disable @typescript-eslint/indent */
import { CSSProperties } from 'vue';

export const TRIGGER_POSITIONS = ['top', 'tl', 'tr', 'bottom', 'bl', 'br', 'left', 'lt', 'lb', 'right', 'rt', 'rb'] as const;
export type TriggerPosition = (typeof TRIGGER_POSITIONS)[number];
export const TRIGGER_EVENTS = ['hover', 'click', 'focus', 'contextMenu'] as const;
export type TriggerEvent = (typeof TRIGGER_EVENTS)[number];
export const TRIGGER_EVENTS_ALL = ['onClick', 'onMouseenter', 'onMouseleave', 'onFocusin', 'onFocusout', 'onContextmenu'];
export type TriggerPopupTranslate = [number, number] | { [key in TriggerPosition]?: [number, number] };

export interface TriggerProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerEvent;
  position?: TriggerPosition;
  disabled?: boolean;
  popupOffset?: number;
  popupTranslate?: TriggerPopupTranslate;
  showArrow?: boolean;
  alignPoint?: boolean;
  popupHoverStay?: boolean;
  blurToClose?: boolean;
  clickToClose?: boolean;
  clickOutsideToClose?: boolean;
  unmountOnClose?: boolean;
  contentClass?: any;
  contentStyle?: CSSProperties;
  arrowClass?: any;
  arrowStyle?: CSSProperties;
  popupStyle?: CSSProperties;
  animationName?: string;
  duration?:
    | number
    | {
        enter: number;
        leave: number;
      };
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  autoFitPopupWidth?: boolean;
  autoFitPopupMinWidth?: boolean;
  autoFixPosition?: boolean;
  popupContainer?: string | HTMLElement;
  updateAtScroll?: boolean;
  autoFitPosition?: boolean;
}
