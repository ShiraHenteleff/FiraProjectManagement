import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../state/board/tasks/task.actions';
import { MatDialogRef } from '@angular/material/dialog';

class DialogOverviewExampleDialog {}

@Component({
  selector: 'app-create-new-task-component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-task-component.html',
  styleUrl: './create-new-task-component.css',
})
export class CreateNewTaskComponent {
  store = inject(Store);
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);

  newTaskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    assignee: new FormControl('', { nonNullable: true }),
    priority: new FormControl<'medium' | 'urgent' | 'high' | 'low'>('medium', {
      nonNullable: true,
    }),
  });

  onSubmit() {
    this.store.dispatch(
      TaskActions.addTask({
        task: {
          ...this.newTaskForm.getRawValue(),
          id: crypto.randomUUID(),
          columnId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    );

    this.dialogRef.close();
  }
}
