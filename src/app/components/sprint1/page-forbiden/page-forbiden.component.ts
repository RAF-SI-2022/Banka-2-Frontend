import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-forbiden',
  templateUrl: './page-forbiden.component.html',
  styleUrls: ['./page-forbiden.component.css']
})
export class PageForbidenComponent {

  constructor(private router: Router) {

  }

  returnHome() {
    this.router.navigate(['home'])
  }
}
