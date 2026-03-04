import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../../base-components/task-form-component/task-form-component';
import { BaseTask } from '../../interfaces/base-task.interface';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../state/board/tasks/task.actions';

@Component({
  selector: 'edit-task-component',
  imports: [TaskFormComponent],
  templateUrl: './edit-task-component.html',
  styleUrl: './edit-task-component.css',
})
export class EditTaskComponent {
  store = inject(Store);
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditTaskComponent>);

  onSubmit(taskData: BaseTask) {
    this.store.dispatch(
      TaskActions.updateTask({
        task: {
          id: this.data.task.id,
          changes: {
            ...taskData,
            updatedAt: new Date(),
          },
        },
      }),
    );

    this.dialogRef.close();
  }
}
