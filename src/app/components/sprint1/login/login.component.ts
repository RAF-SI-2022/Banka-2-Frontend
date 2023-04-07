import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from 'src/app/services/user-service.service';
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading: boolean = false;
  isFormValid = false;

  userNotActive: boolean = false

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: false
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.loginForm.valid;
    });
  }

  closeUserNotActive() {
    this.userNotActive = false
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
      next: response => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem("token", <string>response.body?.token)
          localStorage.setItem('permissions', JSON.stringify(response.body?.permissions))
          this.userService.setToken(<string>response.body?.token)

          this.userService.getUserData()
            .subscribe({
              next: val => {

                if (val.active) {
                  this.router.navigate(["home"]);
                } else {
                  localStorage.clear()
                  this.userNotActive = true;
                  this.userService.resetToken()
                }

              },
              error: err => {

              }
            })

          localStorage.setItem("remember", "local")//da znamo gde se nalazi


          localStorage.getItem("remember")

        } else {
          sessionStorage.setItem("token", <string>response.body?.token)
          sessionStorage.setItem('permissions', JSON.stringify(response.body?.permissions))
          this.userService.setToken(<string>response.body?.token)


          this.userService.getUserData()
            .subscribe({
              next: val => {

                // console.log(val)
                if (val.active) {
                  this.router.navigate(["home"]);
                } else {
                  sessionStorage.clear()
                  this.userNotActive = true;
                  this.userService.resetToken()
                }
              },
              error: err => {

              }
            })
        }
      },
      error: err => {
        this.toastr.error("Pogrešni kredencijali.")
      }
    })
  }

  forgotPass() {
    alert("Zaboravio pass");

  }

}
