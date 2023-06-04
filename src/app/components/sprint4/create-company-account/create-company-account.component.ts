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
  currencies: Currency[]
  selectedCurrency: Currency;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {

    this.createCompanyAccountForm = this.formBuilder.group({
      currency: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
    });

    this.createCompanyAccountForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyAccountForm.valid;
    });
  }

  ngOnInit() {
    this.initCurrencies();
  }

  initCurrencies() {
    this.currencies = [
      {
        currencyName: "US Dollar",
        currencyCode: '123',
        currencySymbol: "USD",
        polity: 'test'
      },
      {
        currencyName: "Euro",
        currencyCode: '123',
        currencySymbol: "EUR",
        polity: 'test1'
      }
    ]

    this.selectedCurrency = this.currencies[0];
  }

  submitCreateCompanyAccount() {
    let account: CompanyAccount = {
      id: '1',
      accountNumber: this.createCompanyAccountForm.get('accountNumber')?.value,
      currency: this.createCompanyAccountForm.get('currency')?.value.currencySymbol,
      bankName: this.createCompanyAccountForm.get('bank')?.value,
    }

    this.companyAccountEmitter.emit(account);
    this.createCompanyAccountVisible = false;
    this.resetForm();
  }

  resetForm() {

  }

}


