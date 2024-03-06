import { defineComponent, ref } from 'vue';
import './gantt-tools.scss';
import { GanttScaleUnit } from '../gantt-model';

export default defineComponent({
  name: 'NGanttTools',
  props: {
    unit: {
      type: String,
      default: null,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['goToday', 'reduceUnit', 'increaseUnit', 'switchView'],
  setup(props, ctx) {
    const currentUnitLabel = ref(props.unit);
    const views = ref([
      {
        name: 'Day',
        value: 'day',
      },
      {
        name: 'Week',
        value: 'week',
      },
      {
        name: 'Month',
        value: 'month',
      },
    ]);
    const actionHandle = (type: string) => {
      switch (type) {
      case 'today':
        ctx.emit('goToday');
        break;
      case 'reduce':
        ctx.emit('reduceUnit');
        break;
      case 'increase':
        ctx.emit('increaseUnit');
        break;
      }
    };
    const selectView = (selectItem: { name: string; value: string }) => {
      ctx.emit('switchView', selectItem.value);
    };
    return {
      actionHandle,
      currentUnitLabel,
      views,
      selectView,
    };
  },
  render() {
    const { isFullScreen, actionHandle, views, selectView, $slots } = this;

    return (
      <div class="tools-container" style={{ position: isFullScreen ? 'fixed' : 'absolute' }}>
        <n-button variant="common" onClick={() => actionHandle('today')} class="tool">
          Today
        </n-button>
        <div class="tool">
          <n-select v-model={this.currentUnitLabel} options={views} onValueChange={selectView}></n-select>
        </div>
        <n-button
          variant="common"
          class={['tool', 'minus', this.currentUnitLabel === GanttScaleUnit.day ? 'disabled' : '']}
          disabled={this.currentUnitLabel === GanttScaleUnit.day}
          onClick={() => actionHandle('reduce')}>
          <n-icon name="minus"></n-icon>
        </n-button>
        <n-button
          variant="common"
          class={['tool', 'add', this.currentUnitLabel === GanttScaleUnit.month ? 'disabled' : '']}
          disabled={this.currentUnitLabel === GanttScaleUnit.month}
          onClick={() => actionHandle('increase')}>
          <n-icon name="add"></n-icon>
        </n-button>
        {$slots.default && $slots.default()}
      </div>
    );
  },
});
