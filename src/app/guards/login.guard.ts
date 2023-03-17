import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService, private location: Location) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if((localStorage.getItem('token') || sessionStorage.getItem('token') ) !== null){
      this.toastr.info("Vec ste ulogovani")
      return this.router.navigate(['home']);
    }
    return true;
  }

}
