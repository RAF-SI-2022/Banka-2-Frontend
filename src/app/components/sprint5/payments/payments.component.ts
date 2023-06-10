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

  constructor(private formBuilder: FormBuilder) {
    this.createCompanyForm = this.formBuilder.group({
      recipientName: ['', Validators.required],
      paymentCode: ['', Validators.required],
      recipientAccount: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      amount: [null, Validators.required],
      numberReference: ['']
    });
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

    // Dodajte dodatnu logiku ili pozovite API za slanje podataka itd.
  }

  ngOnInit() {
    this.selectedOption = Options.NEW_PAYMENT;
  }
}
