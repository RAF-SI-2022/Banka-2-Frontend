import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Job} from "../../../models/users.model";
import {ToastrService} from "ngx-toastr";

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

  jobs: Job []
  selectedJob: Job
  isFormValid = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {

    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permissions: new FormArray([]),
      jobPosition: '',
      limit: [null, [Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)]],
      active: false,
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      selectedJob: ['', Validators.required]
    });

    this.jobs = [
      {name: "ADMINISTRATOR", permissions: ["ADMIN_USER"]},
      {name: "SUPERVISOR", permissions: ["READ_USERS", "CREATE_USERS", "UPDATE_USERS", "DELETE_USERS"]},
      {name: "AGENT", permissions: ["READ_USERS"]}
    ]

    this.editUserForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editUserForm.valid;
    });
  }

  editUser() {
    if (this.selectedJob !== undefined) {
      const user = {
        id: this.userId,
        firstName: this.editUserForm.get('firstName')?.value,
        lastName: this.editUserForm.get('lastName')?.value,
        email: this.editUserForm.get('email')?.value,
        permissions: this.selectedJob.permissions,
        dailyLimit: this.editUserForm.get('limit')?.value,
        jobPosition: this.selectedJob.name,
        active: this.editUserForm.get('active')?.value,
        phone: this.editUserForm.get('phone')?.value,
        jmbg: this.userJmbg
      };
      // Saljemo parent komponenti (UsersComponent) objekat editovanog User-a
      this.editUserEvent.emit(user)
    } else this.toastr.error("Morate izabrati poziciju")


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

    for (const job of this.jobs) {
      if (user.jobPosition.toUpperCase() === job.name.toUpperCase()) {
        this.selectedJob = job
      }
    }
    //this.selectedJob = {name:"ADMIN" , permissions: ["ADMIN_USER"]}


    this.editUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      permissions: user.permissions,
      // jobPosition: user.jobPosition,
      limit: user.dailyLimit,
      jobPosition: this.selectedJob,
      active: user.active,
      phone: user.phone
    });
    this.visible = true;
  }
}
