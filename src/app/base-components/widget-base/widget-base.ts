import { Component, input } from '@angular/core';
import { WidgetStatus } from '../../interfaces/widget-status.interface';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { TaskCountByPriority } from '../../interfaces/task-by-priority.interface';
import { TaskCountData } from '../../interfaces/task-count-data.interface';
import { ProgressWidgetData } from '../../interfaces/progress-widget-data.interface';

@Component({
  selector: 'widget-base',
  imports: [NgClass, MatTooltip],
  templateUrl: './widget-base.html',
  styleUrl: './widget-base.css',
})
export class WidgetBase {
  widgetStatus = input<WidgetStatus<ProgressWidgetData | number | undefined>>(
    {
      status: 'neutral',
      tooltipText: 'Tooltip info goes here',
      value: undefined,
      icon: 'caution-sign.svg',
    },
  );
}
