import type DateTable from './date-table';
import type Calendar from './calendar';

export type DateTableInstance = InstanceType<typeof DateTable>;
export type CalendarDateTableInstance = DateTableInstance;
export type CalendarInstance = InstanceType<typeof Calendar>;
