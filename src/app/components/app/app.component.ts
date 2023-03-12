import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userLogged: boolean = false;
  display: boolean = false;

  constructor(private userService: UserService, private primengConfig: PrimeNGConfig,private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    // if(localStorage.getItem('token') === null) {
    //   this.router.navigate(['/login']);
    // }
    this.primengConfig.ripple = true;
  }

  checkIsLoggedIn(){
    if((localStorage.getItem('token') || sessionStorage.getItem('token'))!== null){
      return true;
    }
    return false;
  }


  showSidebar() {
    this.display = true;
  }

  logOut(){
    localStorage.clear()
    sessionStorage.clear()
    this.userService.resetToken()
    this.router.navigate(['/login']);
  }


  title = 'Banka2_front';
}
