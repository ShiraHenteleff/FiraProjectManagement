import { Component, computed, inject, input } from '@angular/core';
import { Column } from '../../interfaces/column.interface';
import { Store } from '@ngrx/store';
import { selectTaskByColumnId } from '../../state/board/board.selectors';
import { TaskCardComponent } from '../task-card-component/task-card-component';

@Component({
  selector: 'board-column',
  imports: [TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  store = inject(Store);
  column = input.required<Column>();

  tasks = computed(() => {
    console.log(this.column().id);
    return this.store.selectSignal(selectTaskByColumnId(this.column().id))();
  });
}
