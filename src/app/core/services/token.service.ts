import {Injectable, Inject} from '@angular/core';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'token';
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject(this.appStorage.get(this.tokenKey));

  constructor(@Inject(CookieService) private appStorage: CookieService) {
  }

  getAuthorizationValue(): Observable<string> {
    const token = this.getAuthToken();
    if (token) {
      return of(token);
    }
    return of(``);
  }

  clearAuthValue(): void {
    this.appStorage.delete(this.tokenKey);
  }

  setAuthToken(token: string): void {
    this.appStorage.delete(this.tokenKey);
    this.appStorage.set(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  getAuthToken(): string {
    return this.appStorage.get(this.tokenKey);
  }

  getToken(): Observable<string> {
    return this.tokenSubject;
  }
}
