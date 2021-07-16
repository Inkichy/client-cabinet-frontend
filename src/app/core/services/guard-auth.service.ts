import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
isAuth: boolean;
  constructor( private router: Router,
               private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    if (localStorage.getItem('isAuth') === 'yes') {
      this.isAuth = true;
      if (url.indexOf('/auth/') > -1) {
        this.router.navigate(['/main']);
      } else {
        return true;
      }
    } else if (url.indexOf('/auth/') === -1 && localStorage.getItem('isAuth') !== 'yes') {
      console.log('guard');
      this.isAuth = false;
      this.authService.signOut().subscribe();
    }
  }
}
