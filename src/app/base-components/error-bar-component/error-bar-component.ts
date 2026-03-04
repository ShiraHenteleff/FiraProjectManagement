import { Component, input, output } from '@angular/core';

@Component({
  selector: 'error-bar-component',
  imports: [],
  templateUrl: './error-bar-component.html',
  styleUrl: './error-bar-component.css',
})
export class ErrorBarComponent {
  error = input.required<string>();
  close = output();

  onClose() {
    this.close.emit();
  }
}
