import { defineComponent, onMounted, ref, toRefs } from 'vue';
import NGanttScale from './gantt-scale/index';
import NGanttTools from './gantt-tools/index';
import { ganttProps, GanttProps } from './gantt-types';
import './gantt.scss';
import { useGantt } from './use-gantt';
export default defineComponent({
  name: 'NGantt',
  components: { NGanttScale, NGanttTools },
  props: ganttProps,
  setup(props: GanttProps, ctx) {
    const { startDate, endDate } = toRefs(props);
    const ganttContainer = ref();
    const ganttScaleWidth = ref<number>();
    const { getDurationWidth } = useGantt();
    onMounted(() => {
      ganttScaleWidth.value = getDurationWidth(startDate.value, endDate.value);
    });
    return {
      ganttContainer,
      ganttScaleWidth,
    };
  },
  render() {
    const { $slots, startDate, endDate, unit, ganttContainer, ganttScaleWidth } = this;
    return (
      <div style={{ position: 'relative' }}>
        <div class="nancalui-gantt gantt-container" ref="ganttContainer">
          <div class="header" style={{ width: `${ganttScaleWidth}px` }}>
            <n-gantt-scale startDate={startDate} endDate={endDate} unit={unit} scrollElement={ganttContainer}></n-gantt-scale>
          </div>
          <n-gantt-tools unit={unit}></n-gantt-tools>
          <div class="body" style={{ width: `${ganttScaleWidth}px` }}></div>
        </div>
      </div>
    );
  },
});
