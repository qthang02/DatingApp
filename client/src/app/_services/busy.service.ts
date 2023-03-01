import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  isShowProgressSpinner = false;
  constructor() { }

  busy() {
    this.busyRequestCount++;
    this.isShowProgressSpinner = true;
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isShowProgressSpinner = false;
    }
  }
}
