import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StockService} from "../../../services/stock.service";
import {CompanyBankAccount, CompanyContract} from "../../../models/stock-exchange.model";

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

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
    this.createCompanyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.createCompanyContactForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyContactForm.valid;
    });
  }

  ngOnInit() {

  }
  resetForm() {

  }

  submitCreateCompanyContact() {

    // this.companyContactEmitter.emit(companyContract);
    this.createCompanyContactVisible = false;
  }
}
