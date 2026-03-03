import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../../../interfaces/task.interface';


export const TaskActions = createActionGroup({
  source: 'Task/API',
  events: {
    'Load Tasks': props<{ tasks: Task[] }>(),
    'Add Task': props<{ task: Task }>(),
    'Move Task': props<{ taskId: string, newColumnId: string }>(),
    'Upsert Task': props<{ task: Task }>(),
    'Add Tasks': props<{ tasks: Task[] }>(),
    'Upsert Tasks': props<{ tasks: Task[] }>(),
    'Update Task': props<{ task: Update<Task> }>(),
    'Update Tasks': props<{ tasks: Update<Task>[] }>(),
    'Delete Task': props<{ id: string }>(),
    'Delete Tasks': props<{ ids: string[] }>(),
    'Clear Tasks': emptyProps(),
  },
});
