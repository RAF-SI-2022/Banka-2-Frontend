import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum Options {
  NEW_PAYMENT = 'NEW_PAYMENT',
  MONEY_TRANSFER = 'MONEY_TRANSFER',
  PAYMENT_RECIPIENTS = 'PAYMENT_RECIPIENTS',
  PAYMENT_OVERVIEW = 'PAYMENT_OVERVIEW',
}



@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  Options = Options;
  selectedOption: Options;

  createCompanyForm: FormGroup;
  moneyTransferForm: FormGroup;

  paymentAccounts: any[];

  selectedFromPaymentAccount: any;
  selectedToPaymentAccount: any;

  constructor(private formBuilder: FormBuilder) {



    this.createCompanyForm = this.formBuilder.group({
      recipientName: ['', Validators.required],
      paymentCode: ['', Validators.required],
      recipientAccount: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      amount: [null, Validators.required],
      numberReference: ['']
    });

    this.moneyTransferForm = this.formBuilder.group({
      selectedFromPaymentAccount: [''], 
      selectedToPaymentAccount: ['']
    });

  }

  ngOnInit() {
    this.selectedOption = Options.NEW_PAYMENT;

    this.paymentAccounts = [
      { name: '123123123123123123' },
      { name: '123443211234432112'},
      { name: '1122112211221122112'},
    ];
  }


  resetForm() {
    this.createCompanyForm.reset();
  }

  onSubmit() {
    if (this.createCompanyForm.invalid) {
      return;
    }

    const newPayment = {
      recipientName: this.createCompanyForm.get('recipientName')?.value,
      paymentCode: this.createCompanyForm.get('paymentCode')?.value,
      recipientAccount: this.createCompanyForm.get('recipientAccount')?.value,
      paymentPurpose: this.createCompanyForm.get('paymentPurpose')?.value,
      amount: this.createCompanyForm.get('amount')?.value,
      numberReference: this.createCompanyForm.get('numberReference')?.value
    };

    this.resetForm();

    console.log(newPayment);

  }

  submitMoneyTransfer(){

  }


}
