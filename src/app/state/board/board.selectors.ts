import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from './board.reducer';
import { adapter } from './board.reducer';

export const selectBoardState = createFeatureSelector<fromBoard.State>(fromBoard.boardFeatureKey);

export const selectBoardDetails = createSelector(
  selectBoardState,
  (state) => state.BoardDetails
);

export const selectColumnOptions = createSelector(
  selectBoardDetails,
  (boardDetails) => {
    return boardDetails.columns;
  }
);

export const selectTasksState = createSelector(
  selectBoardState,
  (state) => state.Tasks
);

export const taskSelectors = adapter.getSelectors(selectTasksState);

export const selectTaskByColumnId = (columnId: string) =>
createSelector(taskSelectors.selectAll, (tasks) => {
  return tasks.filter((task) => task.columnId === columnId);
});
