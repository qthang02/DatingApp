import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {NavigationExtras, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErrors.push(err.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.messageService.add({severity:'error', summary: err.status.toString(), detail: err.error});
              }
              break;
            case 401:
              this.messageService.add({severity:'error', summary: err.status.toString(), detail: 'Unauthorised'});
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: err.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Some Expected Went Wrong'});
              console.log(err);
              break;
          }
        }
        throw err;
      })
    );
  }
}
