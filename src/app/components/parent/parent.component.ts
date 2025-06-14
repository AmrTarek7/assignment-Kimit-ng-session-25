import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { SignalComponent } from '../signal/signal.component';
import { CounterService } from '../../core/services/counter.service';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, SignalComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  constructor(readonly _counterService: CounterService) {}
  counter: number = 5;

  incrimentCounter() {
    this.counter += 1;
  }

  decrimentCounter() {
    if (this.counter > 0) {
      this.counter -= 1;
    }
  }

  onResetCounter(value: any) {
    console.log(value);

    this.counter = value;
  }

  incrimentSignalCounter() {
    this._counterService.Signalcounter.update((Oldvalue) => Oldvalue + 1);
  }
  decrimentSignalCounter() {
    this._counterService.Signalcounter.update((Oldvalue) => Oldvalue - 1);
  }
}
