import { defineComponent, toRefs, computed } from 'vue';
import type { SetupContext } from 'vue';
import { calendarEmits, calendarProps, CalendarProps } from './calendar-types';
import './calendar.scss';
import DateTable from './date-table';
import { useCalendar } from './use-calendar';
import { useNamespace } from '../../shared/hooks/use-namespace';
export default defineComponent({
  name: 'NCalendar',
  props: calendarProps,
  emits: ['update:modelValue', 'input'],
  setup(props: CalendarProps, { slots, attrs, emit, expose }: any) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    const ns = useNamespace('calendar');

    const COMPONENT_NAME = 'ElCalendar';
    const { calculateValidatedDateRange, date, pickDay, realSelectedDay, selectDate, validatedRange } = useCalendar(
      props,
      emit,
      COMPONENT_NAME
    );

    expose({ calculateValidatedDateRange, selectDate, pickDay, selectedDay: realSelectedDay, name: COMPONENT_NAME });
    const i18nDate = computed(() => {
      return `${date.value.year()} 年 ${date.value.format('M')} 月`;
    });
    return () => {
      return (
        <>
          <div class={ns.b()}>
            <div class={ns.e('header')}>
              {slots?.header ? (
                slots.header({ date: i18nDate.value })
              ) : (
                <>
                  <div class={ns.e('title')}>{i18nDate.value}</div>
                  <div v-if="validatedRange.length === 0" class={ns.e('button-group')}>
                    <n-button-group>
                      <n-button size="small" onClick={() => selectDate('prev-month')}>
                        上个月
                      </n-button>
                      <n-button size="small" onClick={() => selectDate('today')}>
                        今天
                      </n-button>
                      <n-button size="small" onClick={() => selectDate('next-month')}>
                        下个月
                      </n-button>
                    </n-button-group>
                  </div>
                </>
              )}
            </div>
            {validatedRange.value?.length === 0 ? (
              <div class={ns.e('body')}>
                <DateTable
                  date={date.value}
                  selected-day={realSelectedDay}
                  onPick={pickDay}
                  v-slots={{
                    dateCell:
                      slots['date-cell'] || slots.dateCell
                        ? (data: any) => <>{slots?.['date-cell']?.({ data }) || slots?.dateCell?.({ data })}</>
                        : null,
                  }}></DateTable>
              </div>
            ) : (
              <div class={ns.e('body')}>
                {validatedRange.value.map((range_, index) => (
                  <DateTable
                    key={index}
                    date={range_[0]}
                    selected-day={realSelectedDay}
                    range={range_}
                    hide-header={index !== 0}
                    onPick={pickDay}
                    v-slots={{
                      dateCell:
                        slots['date-cell'] || slots.dateCell
                          ? (data: any) => <>{slots?.['date-cell']?.({ data }) || slots?.dateCell?.({ data })}</>
                          : null,
                    }}></DateTable>
                ))}
              </div>
            )}
          </div>
        </>
      );
    };
  },
});
