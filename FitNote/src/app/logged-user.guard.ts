import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserGuard implements CanActivate {
  constructor(private router: Router) {}
  public isLogged: any = sessionStorage.getItem('isLogged');
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLogged) {
      return true;
    } else {
      return this.router.createUrlTree(['']);
    }
  }
}
