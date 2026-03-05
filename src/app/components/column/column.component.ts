import { Component, computed, inject, input, untracked } from '@angular/core';
import { Column } from '../../interfaces/column.interface';
import { Store } from '@ngrx/store';
import { TaskCardComponent } from '../task-card-component/task-card-component';
import { selectTaskByColumnId } from '../../state/board/tasks/task.selectors';

@Component({
  selector: 'board-column',
  imports: [TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  store = inject(Store);
  column = input.required<Column>();
  columnId = computed(() => this.column().id);

  tasks = computed(() => {
    return this.store.selectSignal(selectTaskByColumnId(this.columnId()));
  });
}
