import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Job} from "../../models/users.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @Output() newUserEvent = new EventEmitter<any>();
  @Input() openDialogEvent: boolean

  addUserForm: FormGroup;
  visible: boolean = false;
  jobs: Job []
  selectedJob: Job

  constructor(private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      permissions: [],
      jobPosition: '',
      active: false,
      jmbg: '',
      phone: '',
      selectedJob: ''
    });

    this.jobs = [
      {name:"ADMIN" , permissions: ["ADMIN_USER"]},
      {name:"SUPERVISOR" , permissions: ["READ_USERS", "CREATE_USERS", "UPDATE_USERS", "DELETE_USERS"]},
      {name:"AGENT" , permissions: ["READ_USERS"]}
    ]
  }

  addUser() {
    const user = {
      firstName: this.addUserForm.get('firstName')?.value,
      lastName: this.addUserForm.get('lastName')?.value,
      email: this.addUserForm.get('email')?.value,
      password: this.addUserForm.get('password')?.value,
      permissions: this.selectedJob.permissions,
      jobPosition: this.selectedJob.name,
      active: this.addUserForm.get('active')?.value,
      jmbg: this.addUserForm.get('jmbg')?.value,
      phone: this.addUserForm.get('phone')?.value,
    };

    this.newUserEvent.emit(user)
  }

  close() {
    this.visible = false;
    this.addUserForm.reset();
  }

  open() {
    this.visible = true;
  }

}
