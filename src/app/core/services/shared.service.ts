import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private refreshUsersSource = new BehaviorSubject<void>(undefined);
  refreshUsers$ = this.refreshUsersSource.asObservable();

  triggerUserRefresh() {
    this.refreshUsersSource.next();
  }
}
