import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() counter: number = 0;

  @Output() resetConunter = new EventEmitter<number>();

  onResetCounter() {
    this.resetConunter.emit(0);
  }
}
