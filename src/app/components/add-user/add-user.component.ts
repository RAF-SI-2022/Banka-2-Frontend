import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) {

    this.addUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      permissions: new FormArray([]),
      jobPosition: '',
      active: false,
      jmbg: '',
      phone: '',
    });
  }

  addUser() {
    const user = {
      firstName: this.addUserForm.get('firstName')?.value,
      lastName: this.addUserForm.get('lastName')?.value,
      email: this.addUserForm.get('email')?.value,
      password: this.addUserForm.get('password')?.value,
      permissions: this.addUserForm.get('permissions')?.value,
      jobPosition: this.addUserForm.get('jobPosition')?.value,
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
