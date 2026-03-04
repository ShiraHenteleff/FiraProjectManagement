import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';
import { Board } from '../../interfaces/board.interface';
import { Task } from '../../interfaces/task.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskActions } from './tasks/task.actions';

export const boardFeatureKey = 'board';

export interface State {
  BoardDetails: Board;
  Tasks: EntityState<Task>;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: State = {
  BoardDetails: {
    columns: [
      {
        id: '1',
        name: 'To Do',
        index: 0,
      },
      {
        id: '2',
        name: 'In Progress',
        index: 1,
      },
      {
        id: '3',
        name: 'Done',
        index: 2,
      },
    ],
    id: '',
    name: 'Project 1',
  },
  Tasks: adapter.getInitialState(),
};

export const reducer = createReducer(
  initialState,
  on(BoardActions.boardBoards, (state) => state),
  on(TaskActions.loadTasks, (state, action) => ({
    ...state,
    Tasks: adapter.setAll(action.tasks, state.Tasks),
  })),
  on(TaskActions.addTask, (state, action) => ({
    ...state,
    Tasks: adapter.addOne(action.task, state.Tasks),
  })),
  on(TaskActions.moveTask, (state, action) => ({
    ...state,
    Tasks: adapter.updateOne(
      {
        id: action.taskId,
        changes: {
          columnId: action.newColumnId,
        },
      },
      state.Tasks,
    ),
  })),
  on(TaskActions.updateTask, (state, action) => ({
    ...state,
    Tasks: adapter.updateOne(
      action.task,
      state.Tasks,
    ),
  })),
  on(TaskActions.deleteTask, (state, action) => ({
    ...state,
    Tasks: adapter.removeOne(action.id, state.Tasks),
  })),
);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});
