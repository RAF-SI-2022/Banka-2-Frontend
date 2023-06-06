import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  signUpButton: HTMLElement;
  signInButton: HTMLElement;
  container: HTMLElement;

  constructor(){}

  ngOnInit() {
    this.container = document.getElementById('container')!;
  }
  changeSignUp(){
    this.container.classList.add("right-panel-active");
  }
  
  changeSignIn(){
    this.container.classList.remove("right-panel-active");
  }
}
