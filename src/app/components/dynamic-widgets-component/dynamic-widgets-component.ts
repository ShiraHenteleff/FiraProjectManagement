import { Component, computed, inject, signal } from '@angular/core';
import { DynamicWidgetOutletDirective } from '../../directives/dynamic-widget-outlet/dynamic-widget-outlet-directive';
import { TaskCountWidget } from '../task-count-widget/task-count-widget';
import { Store } from '@ngrx/store';
import { ProgressWidget } from '../progress-widget/progress-widget';
import {
  selectCountForSinglePriority,
  selectTaskCompletionAmount,
} from '../../state/board/tasks/task.selectors';

@Component({
  selector: 'dynamic-widgets-component',
  imports: [DynamicWidgetOutletDirective],
  templateUrl: './dynamic-widgets-component.html',
  styleUrl: './dynamic-widgets-component.css',
})
export class DynamicWidgetsComponent {

  store = inject(Store);

  widgetsToRender = computed(() => {
    return [
      {
        componentType: ProgressWidget,
        inputBindings: [
          {
            type: 'input',
            name: 'totalProgressData',
            value: this.store.selectSignal(selectTaskCompletionAmount),
          },
        ]
      },
      {
        componentType: TaskCountWidget,
        inputBindings: [
          {
            type: 'input',
            name: 'count',
            value: this.store.selectSignal(selectCountForSinglePriority('urgent')),
          },
          { type: 'input', name: 'priority', value: signal('urgent') },
        ],
      },
      {
        componentType: TaskCountWidget,
        inputBindings: [
          {
            type: 'input',
            name: 'count',
            value: this.store.selectSignal(selectCountForSinglePriority('high')),
          },
          { type: 'input', name: 'priority', value: signal('high') },
        ],
      },
      {
        componentType: TaskCountWidget,
        inputBindings: [
          {
            type: 'input',
            name: 'count',
            value: this.store.selectSignal(selectCountForSinglePriority('medium')),
          },
          { type: 'input', name: 'priority', value: signal('medium') },
        ],
      },
      {
        componentType: TaskCountWidget,
        inputBindings: [
          {
            type: 'input',
            name: 'count',
            value: this.store.selectSignal(selectCountForSinglePriority('low')),
          },
          { type: 'input', name: 'priority', value: signal('low') },
        ],
      },
    ];
  });
}
