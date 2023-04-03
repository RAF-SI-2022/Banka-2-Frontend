import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Job} from "../../../models/users.model";
import {ToastrService} from "ngx-toastr";

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
  isFormValid = false;


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      limit: [null, [Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)]],
      permissions: [],
      jobPosition: '',
      active: true,
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      selectedJob: ['', Validators.required]
    });

    this.jobs = [
      {name: "ADMINISTRATOR", permissions: ["ADMIN_USER"]},
      {name: "SUPERVISOR", permissions: ["READ_USERS", "CREATE_USERS", "UPDATE_USERS", "DELETE_USERS"]},
      {name: "AGENT", permissions: ["READ_USERS"]}
    ]

    this.addUserForm.valueChanges.subscribe(() => {
      this.isFormValid = this.addUserForm.valid;
    });
  }

  addUser() {
    const user = {
      firstName: this.addUserForm.get('firstName')?.value,
      lastName: this.addUserForm.get('lastName')?.value,
      email: this.addUserForm.get('email')?.value,
      password: this.addUserForm.get('password')?.value,
      permissions: this.selectedJob.permissions,
      dailyLimit: this.addUserForm.get('limit')?.value,
      jobPosition: this.selectedJob.name,
      active: this.addUserForm.get('active')?.value,
      jmbg: this.addUserForm.get('jmbg')?.value,
      phone: this.addUserForm.get('phone')?.value,
    };

    console.log(user)

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
