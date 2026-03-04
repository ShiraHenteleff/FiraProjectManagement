import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../interfaces/task.interface';
import { BaseTask } from '../../interfaces/base-task.interface';

@Component({
  selector: 'task-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.css',
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    assignee: new FormControl('', { nonNullable: true }),
    priority: new FormControl<'medium' | 'urgent' | 'high' | 'low'>('medium', {
      nonNullable: true,
    }),
  });

  taskToEdit = input<Task>();

  submitTask = output<BaseTask>();

  ngOnInit(): void {
    const task = this.taskToEdit();
    if (task) {
      this.taskForm.setValue({
        title: task.title,
        assignee: task.assignee ? task.assignee : '',
        description: task.description ? task.description : '',
        priority: task.priority,
      });
    }
  }

  onSubmit() {
    this.submitTask.emit(this.taskForm.getRawValue());
  }
}
