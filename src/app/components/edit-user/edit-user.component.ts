import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { UserService } from 'src/app/services/user-service.service';
import {ActivatedRoute, Router} from "@angular/router";
import { User } from 'src/app/model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  user: User


  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, ) {
    this.editUserForm = this.formBuilder.group({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      JMBG: '',
      position: '',
      phoneNumber: '',
      active: Boolean,
    });

    this.user = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      JMBG: "",
      position: "",
      phoneNumber: "",
      active: true
    }

  }

  ngOnInit(): void {
    this.getById()
  }

  updateUser(){
    this.userService.updateUser(this.user, parseInt(<string>this.route.snapshot.paramMap.get('id')),).subscribe(result => {
      alert("Successfully updated");
      this.router.navigate(['/users']);
    });
  }

  updateUserData(){
    this.user.email = this.editUserForm.get('email')?.value,
    this.user.password = this.editUserForm.get('password')?.value,
    this.user.firstName = this.editUserForm.get('firstName')?.value,
    this.user.lastName = this.editUserForm.get('lastName')?.value,
    this.user.JMBG = this.editUserForm.get('JMBG')?.value,
    this.user.position = this.editUserForm.get('position')?.value,
    this.user.phoneNumber = this.editUserForm.get('phoneNumber')?.value,
    this.user.active = this.editUserForm.get('active')?.value
  }


  getById(){
    console.log("usli")

    this.userService.getUserById(parseInt(<string>this.route.snapshot.paramMap.get('id')))
      .subscribe(result => {
        this.user.email = result.email
        this.user.firstName = result.firstName
        this.user.lastName = result.lastName
        this.user.JMBG = result.JMBG
        this.user.position= result.position
        this.user.phoneNumber= result.phoneNumber
        this.user.active= result.active
      })
  }



}
