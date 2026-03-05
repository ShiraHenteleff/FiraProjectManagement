import { EntityAdapter, EntityState } from '@ngrx/entity';
import { on } from '@ngrx/store';
import { Task } from '../../../interfaces/task.interface';
import { TaskActions } from './task.actions';

type StateWithTasks = {
  Tasks: EntityState<Task>;
  GlobalError: string;
};

export function createTaskReducerHandlers<State extends StateWithTasks>(
  adapter: EntityAdapter<Task>,
) {
  return [
    on(TaskActions.loadTasks, (state: State, action) => ({
      ...state,
      Tasks: adapter.setAll(action.tasks, state.Tasks),
    })),
    on(TaskActions.addTask, (state: State, action) => ({
      ...state,
      Tasks: adapter.addOne(action.task, state.Tasks),
    })),
    on(TaskActions.moveTask, (state: State, action) => ({
      ...state,
      Tasks: adapter.updateOne(
        {
          id: action.task.id,
          changes: {
            columnId: action.newColumnId,
          },
        },
        state.Tasks,
      ),
    })),
    on(TaskActions.moveTaskSuccess, (state: State, action) => ({
      ...state,
      Tasks: adapter.updateOne(
        {
          id: action.task.id,
          changes: {
            lastVerifiedData: {
              ...action.task.lastVerifiedData,
              columnId: action.newColumnId,
            },
          },
        },
        state.Tasks,
      ),
    })),
    on(TaskActions.moveTaskError, (state: State, action) => ({
      ...state,
      Tasks: adapter.updateOne(
        {
          id: action.task.id,
          changes: {
            columnId: action.task.lastVerifiedData.columnId,
          },
        },
        state.Tasks,
      ),
      GlobalError: 'Move task operation failed. Please check your connection and try again.',
    })),
    on(TaskActions.updateTask, (state: State, action) => ({
      ...state,
      Tasks: adapter.updateOne(action.task, state.Tasks),
    })),
    on(TaskActions.deleteTask, (state: State, action) => ({
      ...state,
      Tasks: adapter.removeOne(action.id, state.Tasks),
    })),
  ];
}
