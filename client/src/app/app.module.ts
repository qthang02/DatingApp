import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./_interceptor/jwt.interceptor";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from "primeng/fileupload";
import {LoadingInterceptor} from "./_interceptor/loading.interceptor";
import { NotFoundComponent } from './_errors/not-found/not-found.component';
import { ServerErrorComponent } from './_errors/server-error/server-error.component';
import { TestErrorsComponent } from './_errors/test-errors/test-errors.component';
import {ToastModule} from "primeng/toast";
import {ErrorInterceptor} from "./_interceptor/error.interceptor";
import {MessageService} from "primeng/api";
import {TimeagoModule} from "ngx-timeago";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgxSpinnerModule} from "ngx-spinner";

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
    PhotoEditorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FileUploadModule,
    ToastModule,
    TimeagoModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule.forRoot({type: 'ball-clip-rotate'}),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: MessageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
