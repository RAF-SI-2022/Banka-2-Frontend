import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StockService} from "../../../services/stock.service";
import {Company} from "../../../models/stock-exchange.model";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

  @Output() createCompanyEmitter = new EventEmitter<any>();

  createCompanyVisible: boolean = false;
  createCompanyForm: FormGroup;
  isFormValid = false;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
    this.createCompanyForm = this.formBuilder.group({
      name: [null, Validators.required],
      idNumber: [null, Validators.required],
      taxNumber: [null, Validators.required],
      activityCode: [null, Validators.required],
      country: [null, Validators.required],
      address: [null, Validators.required],

    });

    this.createCompanyForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyForm.valid;
    });
  }

  resetForm() {
    this.createCompanyForm.get('name')?.reset();
    this.createCompanyForm.get('idNumber')?.reset();
    this.createCompanyForm.get('taxNumber')?.reset();
    this.createCompanyForm.get('activityCode')?.reset();
    this.createCompanyForm.get('country')?.reset();
    this.createCompanyForm.get('address')?.reset();
  }

  submitCreateCompany() {

    let company: Company = {
      id: 1,
      name: this.createCompanyForm.get('name')?.value,
      address: this.createCompanyForm.get('address')?.value,
      country: this.createCompanyForm.get('country')?.value,
      idNumber: this.createCompanyForm.get('idNumber')?.value,
      taxNumber: this.createCompanyForm.get('taxNumber')?.value,
      activityCode: this.createCompanyForm.get('activityCode')?.value,
    }

    this.createCompanyEmitter.emit(company);
    this.resetForm();
    this.createCompanyVisible = false;
  }
}
