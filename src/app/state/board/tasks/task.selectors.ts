import { createSelector } from '@ngrx/store';
import { selectBoardState, selectLastColumnId } from '../board.selectors';
import { adapter } from '../board.reducer';
import { TaskCountByPriority } from '../../../interfaces/task-by-priority.interface';
import { Priority } from '../../../interfaces/priority.type';
import { ProgressWidgetData } from '../../../interfaces/progress-widget-data.interface';

export const selectTasksState = createSelector(selectBoardState, (state) => state.Tasks);

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
  },
);

export const selectCountForSinglePriority = (priority: Priority) =>
  createSelector(selectTaskCountByPriority, (tasksByPriority) => {
    return tasksByPriority[priority];
  });
