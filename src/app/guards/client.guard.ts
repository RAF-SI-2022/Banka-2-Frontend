import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if(localStorage.getItem("permissions") === null && sessionStorage.getItem("permissions") === null ){
      this.toastr.warning('Nemate pristup ovoj adresi')
      this.router.navigate(['403-forbiden']);
      return false;
      // false je kada je client
    }
    return true
  }

}
