import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import {StockService} from 'src/app/services/stock.service';
import {Currency} from '../../../models/stock-exchange.model';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent {

  @Output() editCompanyAccountEmitter = new EventEmitter<any>();

  account: CompanyAccount;
  editCompanyAccountForm: FormGroup;
  isFormValid: boolean = false;
  currencies: Currency[]
  selectedCurrency: Currency;
  singleAccountVisible = false;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {

    this.editCompanyAccountForm = this.formBuilder.group({
      currency: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
    });

    this.editCompanyAccountForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editCompanyAccountForm.valid;
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


  resetForm() {
    this.editCompanyAccountForm.get('currency')?.reset();
    this.editCompanyAccountForm.get('bank')?.reset();
    this.editCompanyAccountForm.get('accountNumber')?.reset();
  }

  open(account: CompanyAccount) {
    this.account = account;
    this.singleAccountVisible = true;
    this.editCompanyAccountForm.patchValue({
      currency: account.currency,
      bank: account.bankName,
      accountNumber: account.accountNumber
    })

    for(const curr of this.currencies) {
      if(account.currency === curr.currencySymbol) {
        this.selectedCurrency = curr;
      }
    }
  }

  submitEditCompanyAccount() {

    console.log(this.account);

    let account: CompanyAccount = {
     id: this.account.id,
     accountNumber: this.editCompanyAccountForm.get('accountNumber')?.value,
     currency: this.editCompanyAccountForm.get('currency')?.value.currencySymbol,
     bankName: this.editCompanyAccountForm.get('bank')?.value
    }

    this.editCompanyAccountEmitter.emit(account)
    this.singleAccountVisible = false;
    this.resetForm();
  }

}
