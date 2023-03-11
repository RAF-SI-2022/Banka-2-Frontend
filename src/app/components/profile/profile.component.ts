import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private userService: UserService, private formBuilder: FormBuilder ){

    this.editProfileForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jmbg: '',
    });

    this.editPasswordForm = this.formBuilder.group({
      password: '',
    });

  }

  ngOnInit(){
    this.userService.getUserData()
    .subscribe({
      next: val =>{
        this.user = val
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

    if(this.editPasswordForm.get('password')?.value.equals(this.editPasswordForm.get('password2')?.value))
    {

      this.userService.updateUser(
      this.user.id, 
      this.user.email,
      this.editPasswordForm.get('password')?.value,
      this.user.firstName,
      this.user.lastName,
      this.user.jmbg,
      this.user.jobPosition,
      this.user.phone,
      this.user.active,
    ).subscribe({
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
     
  }
      
  }

  editProfile() {

      this.userService.updateUser(
      this.user.id, 
      this.editProfileForm.get('email')?.value,
      this.user.password,
      this.editProfileForm.get('firstName')?.value,
      this.editProfileForm.get('lastName')?.value,
      this.editProfileForm.get('jmbg')?.value,
      this.user.jobPosition,
      this.editProfileForm.get('phone')?.value,
      this.user.active,
    ).subscribe({
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
