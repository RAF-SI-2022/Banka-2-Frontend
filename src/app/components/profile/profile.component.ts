import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from 'src/app/models/users.model';
import {UserService} from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  editProfileForm: FormGroup;
  editPasswordForm: FormGroup;
  visible: boolean = false;
  visiblePassword: boolean = false;
  passwordsMatch: boolean = false;
  isFormValid: boolean

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {

    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    this.editPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });

    this.editPasswordForm.valueChanges.subscribe(() => {
      this.passwordsMatch = this.editPasswordForm.get('password')?.value === this.editPasswordForm.get('password2')?.value;
    });

    this.editProfileForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editProfileForm.valid;
    });

  }

  ngOnInit() {
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          this.editProfileForm.setValue(
            {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              phone: this.user.phone
            }
          )
        },
        error: err => {
          console.log("nisam uspeo")
          console.log(err)
        }
      })
  }

  closeEditProfile() {
    this.visible = false;

    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          this.editProfileForm.setValue(
            {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              phone: this.user.phone,
            }
          )
        },
        error: err => {
          console.log("nisam uspeo")
          console.log(err)
        }
      })


    // this.userId = -1;
    //this.editProfileForm.reset();
  }

  closeChangePassword() {
    this.visiblePassword = false;
    this.editPasswordForm.setValue({
      password: [''],
      password2: [''],
    }
    );
  }

  setVisible() {
    this.visible = true;
  }

  setVisiblePassword() {
    this.visiblePassword = true;
  }

  editPassword() {

    if(this.editPasswordForm.get('password')?.value === undefined || 
    this.editPasswordForm.get('password')?.value === '' || 
    this.editPasswordForm.get('password')?.value === null){
      alert("prazno?")
    }
    if (this.editPasswordForm.get('password')?.value === this.editPasswordForm.get('password2')?.value) {

      console.log(this.editPasswordForm.get('password')?.value)
      this.userService.changePassword(
        this.user.id,
        this.editPasswordForm.get('password')?.value
      )
        .subscribe({
          next: val => {
            this.closeChangePassword()
          },
          error: err => {
            console.log(err);

          }
        })
    }
  }

  editProfile() {

    this.userService.updateProfile(
      this.user.id,
      this.user.email,
      this.editProfileForm.get('firstName')?.value,
      this.editProfileForm.get('lastName')?.value,
      this.editProfileForm.get('phone')?.value,)
      .subscribe({
        next: val => {
          this.closeEditProfile()
        },
        error: err => {
          console.log(err);

        }
      })


    // updateUser(id: number, email: string, firstName: string, lastName: string,
    //   jmbg: string, jobPosition: string, phone: string, active: boolean)
  }
}
