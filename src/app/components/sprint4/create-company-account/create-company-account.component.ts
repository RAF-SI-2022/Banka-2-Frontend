import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import { StockService } from 'src/app/services/stock.service';
import { Currency } from '../../../models/stock-exchange.model';

@Component({
  selector: 'app-create-company-account',
  templateUrl: './create-company-account.component.html',
  styleUrls: ['./create-company-account.component.css']
})
export class CreateCompanyAccountComponent {

  @Output() companyAccountEmitter = new EventEmitter<any>();

  createCompanyAccountVisible: boolean = false;
  isFormValid: boolean = false;
  createCompanyAccountForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {

    this.createCompanyAccountForm = this.formBuilder.group({
      currency: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
    });

    this.createCompanyAccountForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyAccountForm.valid;
    });

  }

  submitCreateCompanyAccount() {

    const tempCurrency: Currency = {
      currencyName: "US Dollar",
      currencyCode: '123',
      currencySymbol: "USD",
      polity: 'test'
    }

    const companyAccount: CompanyAccount = {
      id: 1,
      currency: tempCurrency,
      bank: this.createCompanyAccountForm.get('bank')?.value,
      accountNumber: this.createCompanyAccountForm.get('accountNumber')?.value,
      active: false,
    }

    this.companyAccountEmitter.emit(companyAccount);
    this.createCompanyAccountVisible = false;
  }

  resetForm() {

  }
  
}


