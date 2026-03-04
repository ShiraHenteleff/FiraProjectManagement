import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from './board.reducer';
import { adapter } from './board.reducer';
import { Task } from '../../interfaces/task.interface';
import { ProgressWidgetData } from '../../interfaces/progress-widget-data.interface';
import { TaskCountByPriority } from '../../interfaces/task-by-priority.interface';
import { Priority } from '../../interfaces/priority.type';

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
  (tasks): TaskCountByPriority => {
    return tasks.reduce<TaskCountByPriority>(
      (counts, task) => {
        counts[task.priority] += 1;
        return counts;
      },
      {
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
    );
  },
);

export const selectCountForSinglePriority = (priority: Priority) =>
createSelector(selectTaskCountByPriority, (tasksByPriority) => {
  return tasksByPriority[priority];
});

export const selectTaskCompletionAmount = createSelector(
  taskSelectors.selectAll,
  selectLastColumnId,
  (tasks, lastColumnId): ProgressWidgetData => {
    return {
      totalCount: tasks.length,
      completedCount: tasks.filter((task) => {
        return task.columnId === lastColumnId;
      }).length,
    };
  }
);

export const selectGlobalError = createSelector(
  selectBoardState,
  (state) => {
    return state.GlobalError;
  }
);
