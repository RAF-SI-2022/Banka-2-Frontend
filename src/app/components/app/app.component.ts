import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userLogged: boolean = false;
  display: boolean = false;
  user: User

  constructor(private authService: AuthService, private userService: UserService, private primengConfig: PrimeNGConfig, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {

    // TODO: geolokacija
    // navigator.geolocation.getCurrentPosition(function(){
    //   alert('Location accessed')
    //
    // },function(){
    //   alert('User not allowed')
    // },{timeout:10000})

    this.primengConfig.ripple = true;


    // u slucaju refresha da se povuku podaci o useru
    if (this.userService.getToken()) {
      // console.log("imam token")
      this.userService.getUserData()
        .subscribe({
          next: val => {
            // console.log(val)
            this.user = val
          },
          error: err => {
            console.log(err)
          }
        })
    }

    // na login da se ponovo povuku podaci o useru
    this.authService.loginEvent()
      .subscribe(() => {
        // console.log("uso sam")
        this.userService.getUserData()

          .subscribe({
            next: val => {
              // console.log(val)
              // console.log("posle eventa")
              this.user = val
            },
            error: err => {
              console.log(err)
              // console.log("posle eventa ERR")
            }
          })
      })


  }

  checkIsLoggedIn() {
    if ((localStorage.getItem('token') || sessionStorage.getItem('token')) !== null) {
      return true;
    }
    return false;
  }

  getPermission(): boolean {
    if (localStorage.getItem("remember") !== null) {
      //   if (!!localStorage.getItem("permissions")?.includes("ADMIN_USER"))
      //     return true
      // } else {
      //   if (!!sessionStorage.getItem("permissions")?.includes("ADMIN_USER"))
      //     return true
      if (localStorage.getItem("permissions") !== null)
        return true
    } else {
      if (sessionStorage.getItem("permissions") !== null)
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

  logOut() {
    localStorage.clear()
    sessionStorage.clear()
    this.userService.resetToken()
    this.display = false;
    this.router.navigate(['/login']);
  }


  title = 'Banka2_front';
}
