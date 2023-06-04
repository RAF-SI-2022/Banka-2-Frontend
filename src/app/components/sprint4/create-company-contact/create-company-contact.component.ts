import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StockService} from "../../../services/stock.service";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import { Job } from 'src/app/models/users.model';

@Component({
  selector: 'app-create-company-contact',
  templateUrl: './create-company-contact.component.html',
  styleUrls: ['./create-company-contact.component.css']
})
export class CreateCompanyContactComponent {

  @Output() companyContactEmitter = new EventEmitter<any>();

  createCompanyContactVisible: boolean = false;
  isFormValid: boolean = false;
  createCompanyContactForm: FormGroup;
  selectedJob: Job

  jobs: Job []

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
    this.createCompanyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      note: ['', Validators.required],
      selectedJob: ['', Validators.required]
    });

    this.createCompanyContactForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyContactForm.valid;
    });

     this.jobs = [
    {name: "ADMINISTRATOR", permissions: ["ADMIN_USER"]},
    {name: "SUPERVISOR", permissions: ["READ_USERS", "CREATE_USERS", "UPDATE_USERS", "DELETE_USERS"]},
    {name: "AGENT", permissions: ["READ_USERS"]}
  ]
  }

 

  ngOnInit() {

  }
  resetForm() {

  }
  // this.createCompanyContractForm.get("referenceNumber")?.value
   submitCreateCompanyContact() {

    this.selectedJob = this.createCompanyContactForm.get("selectedJob")?.value
    //console.log(this.selectedJob)
    let contact:any= {
      firstName: this.createCompanyContactForm.get("firstName")?.value,
      lastName: this.createCompanyContactForm.get("lastName")?.value,
      phone: this.createCompanyContactForm.get("phone")?.value,
      email:this.createCompanyContactForm.get("email")?.value,
      position: this.selectedJob.name,
      note: this.createCompanyContactForm.get("note")?.value,
    }

   this.companyContactEmitter.emit(contact);
    this.createCompanyContactVisible = false;
  }
}
