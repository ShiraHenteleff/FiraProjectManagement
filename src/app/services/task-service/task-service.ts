import { Injectable } from '@angular/core';
import { delay, of, switchMap, throwError } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  public moveTask(task: Task) {

    if (task.id === 'test task') {
      return of(task).pipe(
        delay(2000),
        switchMap(() => throwError(() => new Error('Task move failed'))),
      );
    }

    return of(task).pipe(delay(2000));
  }
}
