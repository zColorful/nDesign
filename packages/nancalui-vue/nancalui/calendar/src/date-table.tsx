import { defineComponent, toRefs, computed } from 'vue';
import './calendar.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { dateTableEmits, dateTableProps, DateTableProps, CalendarDateCell } from './date-table-types';
import { useDateTable } from './use-date-table';

export default defineComponent({
  name: 'DateTable',
  props: dateTableProps,
  emits: dateTableEmits,
  setup(props: DateTableProps, { slots, attrs, emit, expose }: any) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    const { isInRange, now, rows, weekDays, getFormattedDate, handlePickDay, getSlotData } = useDateTable(props, emit);
    const nsTable = useNamespace('calendar-table');
    const nsDay = useNamespace('calendar-day');
    // attrs
    const hideHeader = computed(() => {
      return props.hideHeader;
    });

    const getCellClass = ({ text, type }: CalendarDateCell) => {
      const classes: string[] = [type];
      if (type === 'current') {
        const date = getFormattedDate(text, type);
        if (date.isSame(props.selectedDay.value, 'day')) {
          classes.push(nsDay.is('selected'));
        }
        if (date.isSame(now, 'day')) {
          classes.push(nsDay.is('today'));
        }
      }
      return classes;
    };


    expose({
      /** @description toggle date panel */ getFormattedDate,
    });
    return () => {
      return (
        <>
          <table
            class={[
              nsTable.b(),
              nsTable.is(
                'range'
                // , isInRange
              ),
            ]}
            cellspacing="0"
            cellpadding="0">
            {!hideHeader.value && (
              <thead>
                {weekDays.value?.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </thead>
            )}
            <tbody>
              {rows.value.map((row: any[], index: string | number | symbol | undefined) => (
                <>
                  <tr key={index} class={{ [nsTable.e('row')]: true, [nsTable.em('row', 'hide-border')]: index === 0 && hideHeader.value }}>
                    {row.map((cell, key) => (
                      <>
                        <td
                          key={key}
                          class={getCellClass(cell)}
                          onClick={() => {
                            handlePickDay(cell);
                          }}>
                          <div class={nsDay.b()}>{slots?.dateCell ? slots.dateCell(getSlotData(cell)) : <span>{cell.text}</span>}</div>
                        </td>
                      </>
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      );
    };
  },
});
