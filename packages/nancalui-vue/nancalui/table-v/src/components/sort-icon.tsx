// import ElIcon from '@element-plus/components/icon';
// import { SortDown, SortUp } from '@element-plus/icons-vue';
import { SortOrder } from '../constants';

import type { FunctionalComponent } from 'vue';

export type SortIconProps = {
  sortOrder: SortOrder;
  class?: JSX.IntrinsicAttributes['class'];
};

const SortIcon: FunctionalComponent<SortIconProps> = (props) => {
  const { sortOrder } = props;

  return (
    // <div class={props.class}>sortButton</div>
    <n-icon name={sortOrder === 'asc' ? 'icon-chevron-up' : 'icon-chevron-down'} />
    // <ElIcon size={14} class={props.class}>
    //   {sortOrder === 'asc' ? <SortUp /> : <SortDown />}
    // </ElIcon>
  );
};

export default SortIcon;
