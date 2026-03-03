import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { BoardContainer } from './templates/board/board-container.component';
import { boardFeatureKey, reducer } from './state/board/board.reducer';

export const routes: Routes = [
  {
    path: 'board/:id',
    component: BoardContainer,
    providers: [
      provideState({
        name: boardFeatureKey,
        reducer: reducer,
      }),
    ],
  },
];
