import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {MemberListComponent} from "./members/member-list/member-list.component";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";
import {MemberEditComponent} from "./members/member-edit/member-edit.component";
import {MessagesComponent} from "./messages/messages.component";
import {ListsComponent} from "./lists/lists.component";
import {PreventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent},
      {path: 'members/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
