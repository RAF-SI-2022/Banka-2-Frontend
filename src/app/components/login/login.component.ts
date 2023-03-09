import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value ).subscribe({
      next: response => {
        localStorage.setItem("token", <string>response.body?.token)
        console.log(localStorage.getItem("token")) //todo izbrisi print kasnije kada se zavrsi rad na servisima

        this.router.navigate(["users"]); //todo kada se uradi bolji ui, treba promeniti rutu na koju idemo nakon login-a
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
