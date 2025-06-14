import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  Signalcounter = signal(0);
  constructor() {}
}
