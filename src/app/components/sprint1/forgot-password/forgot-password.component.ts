import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  resetPasswordForm: FormGroup;
  isFormValid: boolean;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.isFormValid = this.resetPasswordForm.valid;
    });
  }


  submit() {
    this.toastr.info("Proverite svoj email kako biste resetovali password.")

    //TODO dodati poziv na bek koji ce slati email
    this.authService.resetPassword(this.resetPasswordForm.get('email')?.value).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err)
      }

    })

    this.router.navigate(['login'])

  }
}
