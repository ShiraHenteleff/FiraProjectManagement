import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../../../interfaces/task.interface';


export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Load Tasks': props<{ tasks: Task[] }>(),
    'Add Task': props<{ task: Task }>(),
    'Move Task': props<{ task: Task; newColumnId: string }>(),
    'Move Task Success': props<{ task: Task; newColumnId: string }>(),
    'Move Task Error': props<{ task: Task }>(),
    'Update Task': props<{ task: Update<Task> }>(),
    'Delete Task': props<{ id: string }>()
  },
});
