import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import {
  selectBoardDetails
} from '../../state/board/board.selectors';
import { Store } from '@ngrx/store';
import { Board } from '../../interfaces/board.interface';
import { TaskActions } from '../../state/board/tasks/task.actions';
import { ColumnComponent } from '../../components/column/column.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewTaskComponent } from '../../components/create-new-task-component/create-new-task-component';
import { GlobalErrorComponent } from '../../components/global-error-component/global-error-component';
import { DynamicWidgetsComponent } from '../../components/dynamic-widgets-component/dynamic-widgets-component';

@Component({
  selector: 'app-board',
  imports: [
    ColumnComponent,
    GlobalErrorComponent,
    DynamicWidgetsComponent,
  ],
  templateUrl: './board-container.component.html',
  styleUrl: './board-container.component.css',
})
export class BoardContainer implements OnInit {
  private readonly store = inject(Store);
  board: Signal<Board> = this.store.selectSignal(selectBoardDetails);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.store.dispatch(
      TaskActions.loadTasks({
        tasks: [
          {
            id: 'test task',
            title: 'Task 1',
            columnId: '1',
            priority: 'urgent',
            assignee: 'Billy Bob',
            description:
              'Convince the codebase to behave by whispering encouraging TypeScript affirmations to it. (This is a test task for failed move events)',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastVerifiedData: {
              columnId: '1',
            },
          },
          {
            id: crypto.randomUUID(),
            title: 'Task 2',
            columnId: '1',
            priority: 'medium',
            description: 'Investigate why the bug only appears when someone important is watching.',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastVerifiedData: {
              columnId: '1',
            },
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
            lastVerifiedData: {
              columnId: '2',
            },
          },
          {
            id: crypto.randomUUID(),
            title: 'Task 4',
            columnId: '3',
            priority: 'low',
            description: 'Make the button blue. Not that blue. The other blue.',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastVerifiedData: {
              columnId: '3',
            },
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
