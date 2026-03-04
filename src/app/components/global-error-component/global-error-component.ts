import { Component, inject, Signal } from '@angular/core';
import { ErrorBarComponent } from '../../base-components/error-bar-component/error-bar-component';
import { MatDialog } from '@angular/material/dialog';
import { selectGlobalError } from '../../state/board/board.selectors';
import { Store } from '@ngrx/store';
import { BoardActions } from '../../state/board/board.actions';

@Component({
  selector: 'global-error-component',
  imports: [ErrorBarComponent],
  templateUrl: './global-error-component.html',
  styleUrl: './global-error-component.css',
})
export class GlobalErrorComponent {
  store = inject(Store);
  globalError: Signal<string> = this.store.selectSignal(selectGlobalError);

  onClose() {
    this.store.dispatch(BoardActions.clearError());
  }
}
