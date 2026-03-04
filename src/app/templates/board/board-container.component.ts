import { Component, inject, Signal } from '@angular/core';
import { selectBoardDetails, selectLastColumnId, selectTaskCompletionAmount, selectTaskCountByPriority, taskSelectors } from '../../state/board/board.selectors';
import { Store } from '@ngrx/store';
import { Board } from '../../interfaces/board.interface';
import { TaskActions } from '../../state/board/tasks/task.actions';
import { Task } from '../../interfaces/task.interface';
import { ColumnComponent } from '../../components/column/column.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewTaskComponent } from '../../components/create-new-task-component/create-new-task-component';

@Component({
  selector: 'app-board',
  imports: [ColumnComponent],
  templateUrl: './board-container.component.html',
  styleUrl: './board-container.component.css',
})
export class BoardContainer {
  private readonly store = inject(Store);
  board: Signal<Board> = this.store.selectSignal(selectBoardDetails);
  tasks: Signal<Task[]> = this.store.selectSignal(taskSelectors.selectAll);
  readonly dialog = inject(MatDialog);
  taskCountByPriority = this.store.selectSignal(selectTaskCountByPriority);
  selectLastColumnId = this.store.selectSignal(selectLastColumnId);
  selectTaskCompletionAmount = this.store.selectSignal(selectTaskCompletionAmount);

  ngOnInit() {
    this.store.dispatch(
      TaskActions.loadTasks({
        tasks: [
          {
            id: crypto.randomUUID(),
            title: 'Task 1',
            columnId: '1',
            priority: 'urgent',
            assignee: 'Billy Bob',
            description:
              'Convince the codebase to behave by whispering encouraging TypeScript affirmations to it.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: crypto.randomUUID(),
            title: 'Task 2',
            columnId: '1',
            priority: 'medium',
            description: 'Investigate why the bug only appears when someone important is watching.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: crypto.randomUUID(),
            title: 'Task 3',
            columnId: '2',
            priority: 'high',
            description:
              'Optimise performance until the app loads before the user even thinks about opening it.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: crypto.randomUUID(),
            title: 'Task 4',
            columnId: '3',
            priority: 'low',
            description: 'Make the button blue. Not that blue. The other blue.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      }),
    );
  }

  openNewTaskModal() {
    let dialogRef = this.dialog.open(CreateNewTaskComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
