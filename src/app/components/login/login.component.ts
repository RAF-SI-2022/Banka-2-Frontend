import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  isFormValid = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: false
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.loginForm.valid;
    });
  }

  ngOnInit(): void {
  }

  // TODO: proveriti zasto ne loaduje odmah sve usere
  login() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value ).subscribe({
      next: response => {
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem("token", <string>response.body?.token)
          this.router.navigate(["users"]); //todo kada se uradi bolji ui, treba promeniti rutu na koju idemo nakon login-a
        }
        else{
          sessionStorage.setItem("token", <string>response.body?.token)
          this.router.navigate(["users"]);
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  forgotPass(){
    alert("Zaboravio pass");
    
  }

}
