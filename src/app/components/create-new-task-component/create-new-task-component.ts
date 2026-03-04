import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../state/board/tasks/task.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../../base-components/task-form-component/task-form-component';
import { BaseTask } from '../../interfaces/base-task.interface';

@Component({
  selector: 'app-create-new-task-component',
  imports: [ReactiveFormsModule, TaskFormComponent],
  templateUrl: './create-new-task-component.html',
  styleUrl: './create-new-task-component.css',
})
export class CreateNewTaskComponent {
  store = inject(Store);
  readonly dialogRef = inject(MatDialogRef<CreateNewTaskComponent>);

  onSubmit(newTask: BaseTask) {
    this.store.dispatch(
      TaskActions.addTask({
        task: {
          ...newTask,
          id: crypto.randomUUID(),
          columnId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          lastVerifiedData: {
            columnId: '1',
          },
        },
      }),
    );

    this.dialogRef.close();
  }
}
