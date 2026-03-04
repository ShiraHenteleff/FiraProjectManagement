import { Status } from './widgetstatus.type';

export interface WidgetStatus<T> {
  value: T;
  status: Status;
  icon?: string;
  tooltipText?: string;
}
