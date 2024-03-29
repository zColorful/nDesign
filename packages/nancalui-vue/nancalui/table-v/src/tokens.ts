import type { InjectionKey, Ref } from 'vue';
import type { KeyType } from './types';

export type TableV2Context = {
  isScrolling: Ref<boolean>;
  hoveringRowKey: Ref<null | KeyType>;
  isResetting: Ref<boolean>;
  ns: any;
};

export const TableV2InjectionKey: InjectionKey<TableV2Context> = Symbol('tableV2');
