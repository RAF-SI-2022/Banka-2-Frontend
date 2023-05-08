import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/models/users.model';

@Component({
  selector: 'app-change-agent-limit',
  templateUrl: './change-agent-limit.component.html',
  styleUrls: ['./change-agent-limit.component.css']
})
export class ChangeAgentLimitComponent {
  @Output() editUserEvent = new EventEmitter<any>();
  @Input() openDialogEvent: boolean


  editUserForm: FormGroup;
  visible: boolean = false;
  userId: number = -1;
  userJmbg: string = " "

  jobs: Job []
  selectedJob: Job
  isFormValid = false;
  firstName = ' '
  lastName  = ' '
  

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {

    this.editUserForm = this.formBuilder.group({
      limit: [null, [Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)]],
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
        dailyLimit: this.editUserForm.get('limit')?.value
      };
      // Saljemo parent komponenti (UsersComponent) objekat editovanog User-a
      this.editUserEvent.emit(user)
    } else this.toastr.error("Popunite sve podatke ispravno")


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
    this.firstName = user.firstName
    this.lastName = user.lastName

    for (const job of this.jobs) {
      if (user.jobPosition.toUpperCase() === job.name.toUpperCase()) {
        this.selectedJob = job
      }
    }
    //this.selectedJob = {name:"ADMIN" , permissions: ["ADMIN_USER"]}


    this.editUserForm.patchValue({
      limit: user.dailyLimit,
    });
    this.visible = true;
  }
}
