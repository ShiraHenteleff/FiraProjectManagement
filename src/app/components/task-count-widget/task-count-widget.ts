import { Component, computed, input, Signal } from '@angular/core';
import { WidgetBase } from '../../base-components/widget-base/widget-base';
import { WidgetStatus } from '../../interfaces/widget-status.interface';
import { Priority } from '../../interfaces/priority.type';
import { Status } from '../../interfaces/widgetstatus.type';

@Component({
  selector: 'task-count-widget',
  imports: [WidgetBase],
  templateUrl: './task-count-widget.html',
  styleUrl: './task-count-widget.css',
})
export class TaskCountWidget {
  priority = input<Priority>('urgent');
  count = input<number>(0);

  priorityClass: Record<Priority, Status> = {
    urgent: 'error',
    high: 'warning',
    medium: 'success',
    low: 'neutral',
  };

  widgetStatus: Signal<WidgetStatus<number>> = computed(() => {
    return {
      value: this.count(),
      status: this.priorityClass[this.priority()],
    };
  });
}
