import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  resetPasswordForm: FormGroup;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder){
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  submit(){
    this.toastr.info("Poslat vam je email za promenu sifre")

    //TODO dodati poziv na bek koji ce slati email

    this.router.navigate(['login'])

  }
}
