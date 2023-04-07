import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorisedGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.getPermission()) {
      return true
    }

    return this.router.navigate(['403-forbiden']);
  }

  getPermission(): boolean {
    if (localStorage.getItem("remember") !== null) {
      if (!!localStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return true
    } else {
      if (!!sessionStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return true
    }
    return false
  }

}
