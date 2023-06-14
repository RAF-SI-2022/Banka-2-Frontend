import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ClientService} from "../../../services/client.service";
import { UserService } from 'src/app/services/user-service.service';
import { PaymentInfo } from '../../../models/client.model';

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

  createPaymentForm: FormGroup;
  moneyTransferForm: FormGroup;
  addRecipientForm: FormGroup;
  editRecipientForm: FormGroup;
  oneTimePasswordForm: FormGroup;

  paymentAccounts: any[];
  newPayment: any[];

  recipients: any[] = [];

  clientData: string;

  selectedFromPaymentAccount: any;
  selectedToPaymentAccount: any;
  

  displayAddDialog = false;
  displayEditDialog = false;
  displayOTPDialog: boolean = false;

  selectedRecipient: any;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private userService: UserService) {

    this.initForms()
  
  }

  ngOnInit() {
    this.selectedOption = Options.NEW_PAYMENT;

    this.getClientData()

  
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

    console.log(newRecipient)

    this.addRecipientForm.reset();
    this.displayAddDialog = false;
  }

  editRecipient() {
    if (this.editRecipientForm.invalid) {
      return;
    }

    const recipient = {
      recipientName: this.editRecipientForm.get('name')?.value,
      accountNumber: this.editRecipientForm.get('accountNumber')?.value,
    }

    console.log(recipient)

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
    this.createPaymentForm.reset();
    this.moneyTransferForm.reset();
  }


  onSubmitNewPayment() {
    if (this.createPaymentForm.invalid) {
      return;
    }
    this.displayOTPDialog = true;
    this.sendTokenToEmail()
  }

  
  sendTokenToEmail(){
    this.userService.sendTokenToEmail(this.clientData).subscribe({
      next: val => {
        "Poslat token"
      },
      error: err => {
        console.log(err);
      }
    })
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


  onSubmitOTP(){
    const newPayment = this.getPaymentFormData();
    this.resetForm();

    this.userService.checkToken(
      this.oneTimePasswordForm.get('paymentOTP')?.value
    ).subscribe({
      next: val => {
        this.sendPayment(newPayment)
      },
      error: err => {
        console.log("neuspesno")
      }
    })
  }


  sendPayment(paymentInfo: any){


   
    const paymentData: PaymentInfo = {
      receiverName: paymentInfo.recipientName,
      fromBalanceRegNum: paymentInfo.myAccount,
      toBalanceRegNum: paymentInfo.recipientAccount,
      amount: paymentInfo.amount,
      referenceNumber: paymentInfo.numberReference,
      paymentNumber: paymentInfo.paymentCode,
      paymentDescription: paymentInfo.paymentPurpose,
    }
  
    

    this.clientService.sendPayment(paymentData).subscribe({
      next: val => {
        console.log(val)
      },
      error: err => {
        console.log(err);
      }
    })
    
  }



  getPaymentFormData(){

    const newPayment = {
      recipientName: this.createPaymentForm.get('recipientName')?.value,
      paymentCode: this.createPaymentForm.get('paymentCode')?.value,
      recipientAccount: this.createPaymentForm.get('recipientAccount')?.value,
      paymentPurpose: this.createPaymentForm.get('paymentPurpose')?.value,
      amount: this.createPaymentForm.get('amount')?.value,
      numberReference: this.createPaymentForm.get('numberReference')?.value,
      myAccount: this.selectedFromPaymentAccount.registrationNumber
    };

    return newPayment;
  }


  initForms(){
    this.initCreatePaymentForm();
    this.initMoneyTransferForm();
    this.initAddRecipientForm();
    this.initEditRecipientForm();
    this.initOTPForm();
  }

  initCreatePaymentForm(){
    this.createPaymentForm = this.formBuilder.group({
      recipientName: ['', Validators.required],
      paymentCode: ['', Validators.required],
      recipientAccount: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      amount: [null, Validators.required],
      numberReference: [''],
      myAccount: ['', Validators.required] 
    });
  }

  initMoneyTransferForm(){
    this.moneyTransferForm = this.formBuilder.group({
      selectedFromPaymentAccount: ['', Validators.required], 
      selectedToPaymentAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }
  
  initAddRecipientForm(){
    this.addRecipientForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required]
    });
  }

  initEditRecipientForm(){
    this.editRecipientForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required]
    });
  }

  initOTPForm(){
    this.oneTimePasswordForm = new FormGroup({
      paymentOTP: new FormControl('', Validators.required)
    });
  }

  getClientData(){
    this.clientService.getClientData().subscribe({
      next: value => {
        this.clientData = value
        this.getMyAccounts()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getMyAccounts(){
    this.clientService.getAccountsByClientEmail(this.clientData).subscribe({
      next: (value: any[]) => {
        this.paymentAccounts = value.map(account => ({
          registrationNumber: account.registrationNumber
        }));
      },
      error: err => {
        console.log(err)
      }
    });
  }


}
