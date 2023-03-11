import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userLogged: boolean = false;

  constructor(private primengConfig: PrimeNGConfig,private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    // if(localStorage.getItem('token') === null) {
    //   this.router.navigate(['/login']);
    // }
    this.primengConfig.ripple = true;
  }

  checkIsLoggedIn(){
    return localStorage.getItem('token') !== null;
  }



  logOut(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  

  title = 'Banka2_front';
}
