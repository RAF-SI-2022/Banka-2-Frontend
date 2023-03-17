import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  resetPasswordToken: string
  resetPasswordForm: FormGroup;
  isFormValid: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private authService: AuthService, private router: Router, private toaster: ToastrService) {

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.isFormValid = (this.resetPasswordForm.get('password')?.value === this.resetPasswordForm.get('password2')?.value)
        && this.resetPasswordForm.valid;
    });

  }

  onSubmitForm() {
    console.log(this.resetPasswordForm.get('password')?.value)
    this.authService.submitNewPassword(this.resetPasswordForm.get('password')?.value, this.resetPasswordToken).subscribe({
      next: (value: HttpResponse<any>) => {
        console.log(value);
        this.toaster.info("Lozinka uspešno resetovana.")
        this.router.navigate(['login'])

      },
      error: err => {
        this.toaster.error("Došlo je do greške pri resetovanju lozinke.")
        this.resetPasswordForm.setValue({
          password: [''],
          password2: [''],
        })
      }
    })
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      value => {
        this.resetPasswordToken = value['token'];
      }
    );
  }

}
