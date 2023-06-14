import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {
  }

  checkIfUserIsClient(){
    if(localStorage.getItem("permissions") === null && sessionStorage.getItem("permissions") === null ){
      return false // false je kada je client
    }
    return true
  }

}
