import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./_interceptor/jwt.interceptor";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MenubarModule} from "primeng/menubar";
import { NavComponent } from './nav/nav.component';
import { ListsComponent } from './lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';
import {AppRoutingModule} from "./app-routing.module";
import { TextInputComponent } from './forms/text-input/text-input.component';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import {CalendarModule} from "primeng/calendar";
import {TabViewModule} from "primeng/tabview";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    ListsComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListComponent,
    MemberEditComponent,
    MessagesComponent,
    TextInputComponent,
    DatePickerComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    AppRoutingModule,
    CalendarModule,
    TabViewModule,
    FileUploadModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
