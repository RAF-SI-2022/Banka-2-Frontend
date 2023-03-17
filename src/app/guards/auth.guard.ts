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
import {LoginComponent} from "../components/sprint1/login/login.component";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private toastr: ToastrService, private router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if(localStorage.getItem('token') || sessionStorage.getItem('token') !== null) {
      return true;
    } else {
      this.toastr.error("Morate se ulogovati prvo.")
      this.router.navigate(['/login'])
      return false
    }
  }


}
