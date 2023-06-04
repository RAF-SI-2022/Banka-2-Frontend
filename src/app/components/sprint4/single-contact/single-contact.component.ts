import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyAccount, CompanyContract, ContactPerson} from "../../../models/stock-exchange.model";
import { StockService } from 'src/app/services/stock.service';
import { Currency } from '../../../models/stock-exchange.model';
import { Job, User } from 'src/app/models/users.model';
@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent  {

  @Output() editCompanyContactEmitter = new EventEmitter<any>();

  editCompanyContactVisible: boolean = false;
  contact: ContactPerson;
  account: any = null;
  editCompanyContactForm: FormGroup;
  isFormValid: boolean = false;

  userID: string = '';
  selectedJob: Job

  jobs: Job []

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {

    this.editCompanyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      note: ['', Validators.required],
      selectedJob: ['', Validators.required]
    });

    this.editCompanyContactForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editCompanyContactForm.valid;
    });

    this.jobs = [
      {name: "ADMINISTRATOR", permissions: ["ADMIN_USER"]},
      {name: "SUPERVISOR", permissions: ["READ_USERS", "CREATE_USERS", "UPDATE_USERS", "DELETE_USERS"]},
      {name: "AGENT", permissions: ["READ_USERS"]}
    ]

  }

  resetForm(){
    this.editCompanyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      note: ['', Validators.required],
      selectedJob: ['', Validators.required]
    });
  }

  submitEditCompanyContact(){
    this.selectedJob = this.editCompanyContactForm.get("selectedJob")?.value

    let contact:any= {
      id: this.userID,
      firstName: this.editCompanyContactForm.get("firstName")?.value,
      lastName: this.editCompanyContactForm.get("lastName")?.value,
      phone: this.editCompanyContactForm.get("phone")?.value,
      email:this.editCompanyContactForm.get("email")?.value,
      position: this.selectedJob.name,
      note: this.editCompanyContactForm.get("note")?.value,
    }

      this.editCompanyContactEmitter.emit(contact);
      this.editCompanyContactVisible = false;
      this.resetForm();


  }

}
