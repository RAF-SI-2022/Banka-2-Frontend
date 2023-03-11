import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private router: Router, private toastr: ToastrService){

  }


  submit(){
    this.toastr.info("Poslat vam je email za promenu sifre")

    //TODO dodati poziv na bek koji ce slati email

    this.router.navigate(['login'])

  }
}
