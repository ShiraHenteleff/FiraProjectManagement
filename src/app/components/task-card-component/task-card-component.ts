import { Component, inject, input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Store } from '@ngrx/store';
import { selectColumnOptions } from '../../state/board/board.selectors';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskActions } from '../../state/board/tasks/task.actions';

@Component({
  selector: 'task-card-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-card-component.html',
  styleUrl: './task-card-component.css',
})
export class TaskCardComponent {
  store = inject(Store);
  task = input.required<Task>();

  columnOptions = this.store.selectSignal(selectColumnOptions);
  selectedColumn = new FormControl('', {nonNullable: true});

  onColumnChange() {
    console.log(this.selectedColumn.getRawValue());
    this.store.dispatch(TaskActions.moveTask({ taskId: this.task().id, newColumnId: this.selectedColumn.getRawValue()}));
  }
}
