import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskActions } from './tasks/task.actions';
import { TaskService } from '../../services/task-service/task-service';
import { of } from 'rxjs';

@Injectable()
export class BoardEffects {
  constructor() {}

  taskService = inject(TaskService);
  private actions$ = inject(Actions);

  /**
   * Attempts to update task status on server. Since this is being done optimistically, the state value the UI is reading from has already been updated.
   * I've saved an object with the last know synced value alongside inside the UI object, so if the call fails we can roll back to the last verified value.
   * On success, we mark the new value as verified.
   *
   * If we wanted to do this pessimistically, we would show a loading state and wait to update the value in the store until we got back a success response.
   *
   */
  moveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.moveTask),
      mergeMap((action) =>
        this.taskService.moveTask(action.task).pipe(
          map((result) =>
            TaskActions.moveTaskSuccess({ task: action.task, newColumnId: action.newColumnId }),
          ),
          catchError(() => of(TaskActions.moveTaskError({ task: action.task }))),
        ),
      ),
    );
  });
}
