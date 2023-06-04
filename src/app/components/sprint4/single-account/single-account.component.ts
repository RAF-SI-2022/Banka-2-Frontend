import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyBankAccount, CompanyContract} from "../../../models/stock-exchange.model";
import { StockService } from 'src/app/services/stock.service';
import { Currency } from '../../../models/stock-exchange.model';
@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent {

  @Output() editCompanyAccountEmitter = new EventEmitter<any>();

  account: any = null;
  editCompanyAccountForm: FormGroup;
  isFormValid: boolean = false;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {

    this.editCompanyAccountForm = this.formBuilder.group({
      currency: [''],
      bank: [''],
      accountNumber: [''],
    });

    this.editCompanyAccountForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editCompanyAccountForm.valid;
    });

  }


  resetForm(){

  }

  submitEditCompanyAccount(){

    const tempCurrency: Currency = {
      currencyName: "US Dollar",
      currencyCode: '123',
      currencySymbol: "USD",
      polity: 'test'
    }

    // TODO: izmenjeni modeli

    /*const companyAccount: CompanyAccount = {
      id: this.account.id,
      currency: tempCurrency,
      bankName: this.editCompanyAccountForm.get('bank')?.value || this.account.bankName,
      accountNumber: this.editCompanyAccountForm.get('accountNumber')?.value || this.account.accountNumber,
      active: false,
    }*/

    /*this.editCompanyAccountEmitter.emit(companyAccount);
    this.account = null;*/

  }

}
