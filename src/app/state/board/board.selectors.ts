import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from './board.reducer';

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

export const selectGlobalError = createSelector(
  selectBoardState,
  (state) => {
    return state.GlobalError;
  }
);
