import { Component, inject, input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Store } from '@ngrx/store';
import { selectColumnOptions } from '../../state/board/board.selectors';

@Component({
  selector: 'task-card-component',
  imports: [],
  templateUrl: './task-card-component.html',
  styleUrl: './task-card-component.css',
})
export class TaskCardComponent {
  store = inject(Store)
  task = input.required<Task>();

  columnOptions = this.store.selectSignal(selectColumnOptions);
}
