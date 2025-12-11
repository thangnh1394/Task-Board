import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './features/board/board/board';

@Component({
  selector: 'app-root',
  imports: [Board],
  template: '<app-board />',
})
export class App {
  protected readonly title = signal('task-board');
}
