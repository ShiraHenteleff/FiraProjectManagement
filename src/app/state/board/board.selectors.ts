import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from './board.reducer';
import { adapter } from './board.reducer';
import { Task } from '../../interfaces/task.interface';

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

export const selectLastColumnId = createSelector(
  selectColumnOptions,
  (columnOptions) => {
    return [...columnOptions].sort((a, b) => b.index - a.index)[0].id;
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

export const selectTaskCountByPriority = createSelector(
  taskSelectors.selectAll,
  (tasks) => {
    return tasks.reduce<Partial<Record<Task['priority'], number>>>((counts, task) => {
      counts[task.priority] = (counts[task.priority] ?? 0) + 1;
      return counts;
    }, {});
  },
);

export const selectTaskCompletionAmount = createSelector(
  taskSelectors.selectAll,
  selectLastColumnId,
  (tasks, lastColumnId) => {
    return {
      totalTasks: tasks.length,
      finishedTasks: tasks.filter((task) => {return task.columnId === lastColumnId}).length,
    }
  }
);

