import { Component, computed, inject, input, signal } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Store } from '@ngrx/store';
import { selectColumnOptions } from '../../state/board/board.selectors';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskActions } from '../../state/board/tasks/task.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task-component/edit-task-component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'task-card-component',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './task-card-component.html',
  styleUrl: './task-card-component.css',
})
export class TaskCardComponent {
  store = inject(Store);
  task = input.required<Task>();
  readonly dialog = inject(MatDialog);

  columnOptions = this.store.selectSignal(selectColumnOptions);

  filteredColumnOptions = computed(() =>
    this.columnOptions().filter((column) => column.id !== this.task().columnId)
  );

  selectedColumn = new FormControl('', { nonNullable: true });

  isSeeMoreExpanded = signal(false);

  seeMoreButtonText = computed(() => {
    if (this.isSeeMoreExpanded()) {
      return 'See Less';
    } else {
      return 'See More';
    }
  });

  statusBadgeClass = computed(() => {
    switch (this.task().priority) {
      case 'urgent':
        return 'status-red';

      case 'high':
        return 'status-orange';

      case 'medium':
        return 'status-yellow';

      case 'low':
        return 'status-green';
    }
  });

  onColumnChange() {
    this.store.dispatch(
      TaskActions.moveTask({
        task: this.task(),
        newColumnId: this.selectedColumn.getRawValue(),
      }),
    );
  }

  onDelete() {
    this.store.dispatch(TaskActions.deleteTask({ id: this.task().id }));
  }

  openEditTaskModal() {
    let dialogRef = this.dialog.open(EditTaskComponent, {
      height: '400px',
      width: '600px',
      data: {
        task: this.task(),
      },
    });
  }

  onSeeMoreClick() {
    this.isSeeMoreExpanded.set(!this.isSeeMoreExpanded());
  }
}
