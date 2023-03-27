import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {MemberEditComponent} from "../members/member-edit/member-edit.component";
import {ConfirmService} from "../_services/confirm.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {
  }

  canDeactivate(component: MemberEditComponent): Observable<boolean> {
    if(component.editFrom?.dirty) {
      return this.confirmService.confirm();
    }
    return of(true);
  }

}
