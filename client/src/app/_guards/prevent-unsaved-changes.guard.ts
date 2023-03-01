import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {MemberEditComponent} from "../members/member-edit/member-edit.component";

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent) {
    if(component.editFrom?.dirty) {
      return confirm('Are you sure you want continue? Any unsaved changes will be lost');
    }
    return true;
  }

}
