import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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

  myValidator: boolean = false;
  myAgentValidator: boolean = false;


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

      // this.isFormValid = this.addUserForm.valid;

      // if(this.addUserForm.get('selectedJob')?.value?.name === "AGENT"){
      //   // this.addUserForm.patchValue({
      //     // limit: ['', [Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)]],
      //   // })
      //   this.addUserForm.get('limit')?.setValidators([Validators.min(10), Validators.required, Validators.pattern(/^\d+$/)]);
      //   // console.log("asdasdas" + this.addUserForm.get('limit')?.valid);
      //   this.addUserForm.get('limit')?.updateValueAndValidity();
      // }
      // else{
      //   this.addUserForm.get('limit')?.clearValidators();
      //   this.addUserForm.get('limit')?.updateValueAndValidity();
      //   // this.addUserForm.get('limit')?.setErrors(null)
      // }

      if(this.addUserForm.get('selectedJob')?.value?.name === "AGENT"){
        this.isFormValid = this.addUserForm.valid;
      }
      else{
        this.isFormValid = this.checkValidator()
      }


      // this.isFormValid = this.addUserForm.valid;
      // const isFormValid = this.addUserForm.valid;  // check if the form is valid
      // const limitControl = this.addUserForm.get('limit');  // get the 'limit' control

      // const isLimitValid = limitControl ? limitControl.valid : true;  // check if the 'limit' control is valid, or set to true if it doesn't exist yet
      // const isExcludedLimitValid = limitControl ? limitControl.errors === null : true;  // check if the 'limit' control is excluded from validation, or set to true if it doesn't exist yet

      //  this.isFormValid = isFormValid && (isLimitValid || isExcludedLimitValid);  // check if the form is valid


    });
  }
  // private getLimitValidators() {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (this.addUserForm && this.addUserForm.get('selectedJob')?.value?.name === 'agent') {
  //       return Validators.compose([Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)])(control);
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  checkValidator(){
    if(
      this.addUserForm.get('firstName')?.valid &&
      this.addUserForm.get('lastName')?.valid &&
      this.addUserForm.get('email')?.valid &&
      this.addUserForm.get('password')?.valid &&
      // this.addUserForm.get('limit')?.valid &&
      this.addUserForm.get('jmbg')?.valid &&
      this.addUserForm.get('phone')?.valid &&
      this.addUserForm.get('selectedJob')?.valid
    ){
      return true;
    }


    return false;
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
