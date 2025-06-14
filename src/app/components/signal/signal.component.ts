import { CounterService } from './../../core/services/counter.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
})
export class SignalComponent {
  constructor(readonly _counterService: CounterService) {}
}
