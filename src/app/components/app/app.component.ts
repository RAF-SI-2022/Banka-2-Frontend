import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userLogged: boolean = false;
  display: boolean = false;
  user: User

  constructor(private userService: UserService, private primengConfig: PrimeNGConfig,private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    // if(localStorage.getItem('token') === null) {
    //   this.router.navigate(['/login']);
    // }
    this.primengConfig.ripple = true;


    if(localStorage.getItem('token') || sessionStorage.getItem('token')){
      this.userService.getUserData()
        .subscribe({
          next: val =>{
            console.log(val)
            this.user = val
          },
          error: err =>{
            console.log(err)
          }
        })
    }
  }

  checkIsLoggedIn(){
    if((localStorage.getItem('token') || sessionStorage.getItem('token'))!== null){
      return true;
    }
    return false;
  }

  getPermission(): boolean {
    if (localStorage.getItem("remember") !== null){
      if (!!localStorage.getItem("permissions")?.includes("ADMIN_USER"))
      return true
    }
    else{
      if (!!sessionStorage.getItem("permissions")?.includes("ADMIN_USER"))
      return true
    }
    return false
  }

  showSidebar() {
    this.display = true;
  }

  hideSidebar() {
    this.display = false;
  }

  logOut(){
    localStorage.clear()
    sessionStorage.clear()
    this.userService.resetToken()
    this.display = false;
    this.router.navigate(['/login']);
  }


  title = 'Banka2_front';
}
