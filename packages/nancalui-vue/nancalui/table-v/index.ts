import TableV2 from './src/table-v';
import AutoResizer from './src/components/auto-resizer';
import type { Plugin, App } from 'vue';

// export type SFCWithInstall<T> = T & Plugin;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
//   (main as SFCWithInstall<T>).install = (app): void => {
//     for (const comp of [main, ...Object.values(extra ?? {})]) {
//       app.component(comp.name, comp);
//     }
//   };

//   if (extra) {
//     for (const [key, comp] of Object.entries(extra)) {
//       (main as any)[key] = comp;
//     }
//   }
//   return main as SFCWithInstall<T> & E;
// };

export { Alignment, FixedDir, SortOrder } from './src/constants';
export * from './src/auto-resizer';
export { placeholderSign } from './src/private';

// export const NTableV2 = withInstall(TableV2);
// export const NAutoResizer = withInstall(AutoResizer);

// export type { ColumnV, Columns, SortBy, SortState, TableV2CustomizedHeaderSlotParam } from './src/types';
// export type { TableV2Instance } from './src/table-v';
export * from './src/table';
export * from './src/row';

// export type { HeaderCellSlotProps } from './src/renderers/header-cell';

export * from './src/table-v-types';

// export { TableV2 };

export default {
  title: 'TableV 虚拟列表',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(TableV2.name, TableV2);
    app.component(AutoResizer.name, AutoResizer);
  },
};
