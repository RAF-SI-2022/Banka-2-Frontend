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
  user!: User


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

  }

  ngOnInit(): void {
    this.getById()
  }

  updateUser(){
    this.userService.updateUser(
      parseInt(<string>this.route.snapshot.paramMap.get('id')),
       this.editUserForm.get('email')?.value,
       this.editUserForm.get('password')?.value,
       this.editUserForm.get('firstName')?.value,
       this.editUserForm.get('lastName')?.value,
       this.editUserForm.get('JMBG')?.value,
       this.editUserForm.get('position')?.value,
       this.editUserForm.get('phoneNumber')?.value,
       this.editUserForm.get('active')?.value,
    ).subscribe(result => {
      alert("Successfully updated");
      this.router.navigate(['/users']);
    });
  }

  getById(){
    this.userService.getUserById(parseInt(<string>this.route.snapshot.paramMap.get('id')))
      .subscribe(result => {
        this.user = result;
      })
  }



}
