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
  addRecipientForm: FormGroup;
  editRecipientForm: FormGroup;

  paymentAccounts: any[];

  recipients: any[] = [];

  selectedFromPaymentAccount: any;
  selectedToPaymentAccount: any;

  displayAddDialog = false;
  displayEditDialog = false;

  selectedRecipient: any;

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
      selectedFromPaymentAccount: ['', Validators.required], 
      selectedToPaymentAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.addRecipientForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required]
    });

    this.editRecipientForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required]
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

  showAddRecipientDialog() {
    this.displayAddDialog = true;
  }

  showEditRecipientDialog(recipient: any) {
    this.displayEditDialog = true;
    this.selectedRecipient = recipient;
    this.editRecipientForm.patchValue({
      name: recipient.name,
      accountNumber: recipient.accountNumber
    });
  }

  addRecipient() {
    if (this.addRecipientForm.invalid) {
      return;
    }
    
    const newRecipient = {
      name: this.addRecipientForm.get('name')?.value,
      accountNumber: this.addRecipientForm.get('accountNumber')?.value,
    };

    this.recipients.push(newRecipient);

    this.addRecipientForm.reset();
    this.displayAddDialog = false;
  }

  editRecipient() {
    if (this.editRecipientForm.invalid) {
      return;
    }

    this.selectedRecipient.name = this.editRecipientForm.get('name')?.value;
    this.selectedRecipient.accountNumber = this.editRecipientForm.get('accountNumber')?.value;

    this.editRecipientForm.reset();
    this.displayEditDialog = false;
  }

  deleteRecipient(recipient: any) {
    const index = this.recipients.indexOf(recipient);
    if (index > -1) {
      this.recipients.splice(index, 1);
    }
  }
  


  resetForm() {
    this.createCompanyForm.reset();
    this.moneyTransferForm.reset();
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
    if (this.moneyTransferForm.invalid) {
      return;
    }

    const newTransfer = {
      selectedFromPaymentAccount: this.moneyTransferForm.get('selectedFromPaymentAccount')?.value,
      selectedToPaymentAccount: this.moneyTransferForm.get('selectedToPaymentAccount')?.value,
      amount: this.moneyTransferForm.get('amount')?.value
    };


    console.log(newTransfer)

  }


}
