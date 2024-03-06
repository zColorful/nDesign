// import ElIcon from '@element-plus/components/icon';
// import { ArrowRight } from '@element-plus/icons-vue';

import type { StyleValue } from 'vue';
import type { TableV2RowCellRenderParam } from './row';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ExpandIcon = (
  props: TableV2RowCellRenderParam['expandIconProps'] & {
    class?: string | string[];
    style: StyleValue;
    size: number;
    expanded: boolean;
    expandable: boolean;
  }
) => {
  const { expanded, expandable, onExpand, style, size } = props;

  const expandIconProps = {
    onClick: expandable ? () => onExpand(!expanded) : undefined,
    class: props.class,
  } as any;

  return (
    <n-icon {...expandIconProps} size={size} style={style} name="icon-chevron-right" />
    // <ElIcon {...expandIconProps} size={size} style={style}>
    //   <ArrowRight />
    // </ElIcon>
  );
};

export default ExpandIcon;

export type ExpandIconInstance = ReturnType<typeof ExpandIcon>;
