import type { Slots } from 'vue';

export type TabsPosition = 'left' | 'right' | 'top' | 'bottom';

export type TabsType = 'line' | 'card' | 'card-gutter' | 'text' | 'options' | 'pills';

export interface TabData {
  id: string | number;
  title?: string;
  disabled?: boolean;
  closable?: boolean;
  slots: Slots;
  [key: string]: any;
}

export type TabTriggerEvent = 'click' | 'hover';
export type BeforeChangeFunc = (item: TabData) => boolean | Promise<boolean>;
