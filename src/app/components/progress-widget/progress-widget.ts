import { Component, computed, input, output, Signal, signal } from '@angular/core';
import { WidgetBase } from '../../base-components/widget-base/widget-base';
import { ProgressWidgetData } from '../../interfaces/progress-widget-data.interface';
import { MatProgressBar } from '@angular/material/progress-bar';
import { WidgetStatus } from '../../interfaces/widget-status.interface';

@Component({
  selector: 'progress-widget',
  imports: [WidgetBase, MatProgressBar],
  templateUrl: './progress-widget.html',
  styleUrl: './progress-widget.css',
})
export class ProgressWidget {
  testOutput = output();
  totalProgressData = input.required<ProgressWidgetData>();

  progressPercent = computed(() => {
    const percent = this.totalProgressData().completedCount / this.totalProgressData().totalCount;
    return Math.floor(percent * 100);
  });

  widgetStatus : Signal<WidgetStatus<ProgressWidgetData>> = computed(() => {
    return {
      value: this.totalProgressData(),
      status: 'neutral',
      tooltipText: 'Based on number of tasks that have reached the last column'
    };
  });
}
