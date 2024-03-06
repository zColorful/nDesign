import { defineComponent, ref } from 'vue';
import { MilestoneIcon } from './milestone-icon';
import './gantt-milestone.scss';

export default defineComponent({
  name: 'NGanttMilestone',
  props: {
    startDate: {
      type: Date,
    },
    title: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  setup(props) {
    // todo
  },
  render() {
    const { title } = this;
    return (
      <div class="nancalui-gantt-milestone">
        <span class="icon">
          <MilestoneIcon />
        </span>
        <span>{title}</span>
      </div>
    );
  },
});
