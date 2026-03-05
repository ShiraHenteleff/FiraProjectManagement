import { createFeature, createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';
import { Board } from '../../interfaces/board.interface';
import { Task } from '../../interfaces/task.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createTaskReducerHandlers } from './tasks/task.reducer';

export const boardFeatureKey = 'board';

export interface State {
  BoardDetails: Board;
  Tasks: EntityState<Task>;
  GlobalError: string;
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
  GlobalError: '',
};

export const reducer = createReducer(
  initialState,
  on(BoardActions.clearError, (state) => ({
    ...state,
    GlobalError: '',
  })),
  ...createTaskReducerHandlers<State>(adapter),
);

export const boardFeature = createFeature({
  name: boardFeatureKey,
  reducer,
});
