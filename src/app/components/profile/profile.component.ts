import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: User
  editProfileForm: FormGroup;
  editPasswordForm: FormGroup;
  visible: boolean = false;
  visiblePassword: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService ){

    this.editProfileForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jmbg: '',
    });

    this.editPasswordForm = this.formBuilder.group({
      password: '',
      password2: ''
    });

  }

  ngOnInit(){
    console.log("Pozvao sam")
    this.userService.getUserData()
    .subscribe({
      next: val =>{
        console.log("uspeo sam")
        this.user = val
        console.log(this.user)
        console.log(sessionStorage.getItem("token"))
        this.editProfileForm.setValue(
          {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone,
            jmbg: this.user.jmbg,
          }
        )
      },
      error: err =>{
        console.log("nisam uspeo")
        console.log(err)
      }
    })
  }

  close() {
    this.visible = false;
    this.visiblePassword = false;
    // this.userId = -1;
    //this.editProfileForm.reset();
  }

  setVisable(){
    this.visible = true;
  }

  setVisablePassword(){
    this.visiblePassword = true;
  }

  editPassword(){

    if(this.editPasswordForm.get('password')?.value === this.editPasswordForm.get('password2')?.value)
    {

      console.log(this.editPasswordForm.get('password')?.value)
      this.userService.changePassword(
        this.user.id,
        this.editPasswordForm.get('password')?.value
        )
        .subscribe({
        next: val =>{
          this.close()
        },
        error: err =>{
          console.log(err);

        }
      })
  }
  else{
    // TODO dodati toast za kada korisnik unese dve razlicite sifre
    // VALIDACIJA NA HTML PRIMER U 
    // email: ['', [Validators.required, Validators.email]],
    // password: ['', Validators.required],
    // i onda na html-u imas if validated nesto pogledaj na login page
    // ngIf= isFormValid
  }
      
  }

  editProfile() {

      this.userService.updateProfile(
        this.user.id, 
        this.editProfileForm.get('email')?.value,
        this.editProfileForm.get('firstName')?.value,
        this.editProfileForm.get('lastName')?.value,
        this.editProfileForm.get('phone')?.value,)
        .subscribe({
        next: val =>{
          this.close()
        },
        error: err =>{
          console.log(err);

        }
      })



    // updateUser(id: number, email: string, firstName: string, lastName: string,
    //   jmbg: string, jobPosition: string, phone: string, active: boolean)
  }
}
