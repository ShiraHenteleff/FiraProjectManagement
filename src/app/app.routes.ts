import { Routes } from '@angular/router';
import { BoardContainer } from '../templates/board/board-container.component';

export const routes: Routes = [
  {
    path: 'board/:id',
    component: BoardContainer,
  },
];
