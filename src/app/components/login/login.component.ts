import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user-service.service';
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

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
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

  login() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value ).subscribe({
      next: response => {
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem("token", <string>response.body?.token)
          // console.log(response.body?.permissions)
          localStorage.setItem('permissions', JSON.stringify(response.body?.permissions))
          // this.userService.getUserPermissions()
          this.router.navigate(["users"]); //todo kada se uradi bolji ui, treba promeniti rutu na koju idemo nakon login-a

          localStorage.setItem("remember","local")//da znamo gde se nalazi
        }
        else{
          sessionStorage.setItem("token", <string>response.body?.token)
          // console.log(response.body?.permissions)
          sessionStorage.setItem('permissions', JSON.stringify(response.body?.permissions))
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
