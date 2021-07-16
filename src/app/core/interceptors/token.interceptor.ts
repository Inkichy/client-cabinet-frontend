import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {flatMap, tap} from 'rxjs/operators';
import {TokenService} from '../services/token.service';
import {Observable} from 'rxjs';
import {AuthService} from '../services/api/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this
      .injector
      .get(TokenService)
      .getAuthorizationValue()
      .pipe(
        flatMap((token) => {
          if (token) {
            let params = {};
            if (token && token !== undefined && token !== 'undefined') {
              params = {
                setParams: {
                  session_val: token
                }
              };
            }
            const authReq = request.clone(params);

            return next.handle(authReq).pipe(
              tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 302) {
                  // redirect
                }
              }, (err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                  this.authService.signOut();
                  // logout
                } else if (err instanceof HttpErrorResponse && err.status === 403) {
                  // access permission
                }
              }));
          } else {
            return next.handle(request).pipe(
              tap((event: HttpEvent<any>) => {
              }, (err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                  this.authService.signOut();
                  // logout
                } else if (err instanceof HttpErrorResponse && err.status === 403) {
                  // access permission
                }
              })
            );
          }
        })
      );
  }
}
