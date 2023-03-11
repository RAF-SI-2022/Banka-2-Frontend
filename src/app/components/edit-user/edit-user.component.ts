import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  @Output() editUserEvent = new EventEmitter<any>();
  @Input() openDialogEvent: boolean


  editUserForm: FormGroup;
  visible: boolean = false;
  userId: number = -1;
  userJmbg: string = " "

  constructor(private formBuilder: FormBuilder) {

    this.editUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      permissions: new FormArray([]),
      jobPosition: '',
      active: false,
      phone: '',
    });
  }

  editUser() {
    const user = {
      id: this.userId,
      firstName: this.editUserForm.get('firstName')?.value,
      lastName: this.editUserForm.get('lastName')?.value,
      email: this.editUserForm.get('email')?.value,
      permissions: this.editUserForm.get('permissions')?.value,
      jobPosition: this.editUserForm.get('jobPosition')?.value,
      active: this.editUserForm.get('active')?.value,
      phone: this.editUserForm.get('phone')?.value,
      jmbg: this.userJmbg
    };

    // Saljemo parent komponenti (UsersComponent) objekat editovanog User-a
    this.editUserEvent.emit(user)
  }

  close() {
    this.visible = false;
    this.userId = -1;
    this.editUserForm.reset();
  }

  open(user: any) {
    console.log(user)
    this.userId = user.id
    this.userJmbg = user.jmbg
    this.editUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      permissions: user.permissions,
      jobPosition: user.jobPosition,
      active: user.active,
      phone: user.phone
    });
    this.visible = true;
  }
}
