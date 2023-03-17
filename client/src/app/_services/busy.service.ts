import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  isShowProgressSpinner = false;
  constructor(private spinner: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.isShowProgressSpinner = true;
    this.spinner.show();
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isShowProgressSpinner = false;
      this.spinner.hide();
    }
  }
}
