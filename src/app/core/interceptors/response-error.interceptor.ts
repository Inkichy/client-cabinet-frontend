import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../services/api/auth.service';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log('interceptor');
            this.authService.signOut();
          } else if (err instanceof HttpErrorResponse && err.status === 403) {
            // access permission
          }
        })
      );
  }
}
