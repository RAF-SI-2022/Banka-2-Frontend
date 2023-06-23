import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ClientService} from "../../../services/client.service";
import { UserService } from 'src/app/services/user-service.service';
import { ExchangeMoney, PaymentInfo, Recipient, TransactionInfo } from '../../../models/client.model';
import { ToastrService } from 'ngx-toastr';
import { OverlayPanel } from 'primeng/overlaypanel';

export enum Options {
  NEW_PAYMENT = 'NEW_PAYMENT',
  MONEY_TRANSFER = 'MONEY_TRANSFER',
  PAYMENT_RECIPIENTS = 'PAYMENT_RECIPIENTS',
  PAYMENT_OVERVIEW = 'PAYMENT_OVERVIEW',
  EXCHANGE = "EXCHANGE",
}


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  @ViewChild('op') op: OverlayPanel;

  formGroup: FormGroup;

  Options = Options;
  selectedOption: Options;

  createPaymentForm: FormGroup;
  moneyTransferForm: FormGroup;
  addRecipientForm: FormGroup;
  editRecipientForm: FormGroup;
  oneTimePasswordForm: FormGroup;
  exchangeForm: FormGroup;

  paymentAccounts: any[];
  newPayment: any[];
  userPayments: any[];

  recipients: Recipient[] = [];
  transactions: any[] = [];

  clientData: string;

  selectedFromPaymentAccount: any;
  selectedToPaymentAccount: any;

  transactionFromAccount: any[];
  transactionToAccount: any[];

  displayAddDialog = false;
  displayEditDialog = false;
  displayOTPDialog: boolean = false;

  selectedRecipient: any;
  transactionCurrency: any;
  exchangeFromCurrency: any;
  exchangeToCurrency: any;

  exchangeFromList: any[];
  exchangeToList: any[];


  constructor(
    private formBuilder: FormBuilder, 
    private clientService: ClientService, 
    private userService: UserService,
    private toastr: ToastrService) {

      
    this.initForms()

  }

  ngOnInit() {
    this.selectedOption = Options.NEW_PAYMENT;
    this.init()
  }

  init(){
    this.getClientData()    
  }

  showAddRecipientDialog() {
    this.displayAddDialog = true;
  }

  showEditRecipientDialog(recipient: any) {
    this.displayEditDialog = true;
    this.selectedRecipient = recipient;
    
    this.editRecipientForm.patchValue({
      editName: recipient.receiverName,
      editAccountNumber: recipient.balanceRegistrationNumber,
      editNumberReference: recipient.referenceNumber,
      editPaymentCode: recipient.paymentNumber,
      editPaymentPurpose: recipient.paymentDescription
    });
  }

  addRecipient() {
    if (this.addRecipientForm.invalid) {
      return;
    }
    const newRecipient = this.getNewRecipient() 
    this.displayAddDialog = false;
    this.sendRecipient(newRecipient);
    this.resetForm()
  }

  editRecipient() {
    if (this.editRecipientForm.invalid) {
      return;
    }

    // this.selectedRecipient.name = this.editRecipientForm.get('name')?.value;
    // this.selectedRecipient.balanceRegistrationNumber = this.editRecipientForm.get('accountNumber')?.value;

    const newRecipient: Recipient = {
      id: this.selectedRecipient.id,
      savedByClientEmail: this.selectedRecipient.savedByClientEmail,
      receiverName: this.editRecipientForm.get('editName')?.value,
      balanceRegistrationNumber: this.editRecipientForm.get('editAccountNumber')?.value,
      referenceNumber: this.editRecipientForm.get('editNumberReference')?.value,
      paymentNumber: this.editRecipientForm.get('editPaymentCode')?.value,
      paymentDescription: this.editRecipientForm.get('editPaymentPurpose')?.value,
    };

    this.updateRecipient(newRecipient, this.selectedRecipient.id)
    
    this.editRecipientForm.reset();
    this.displayEditDialog = false;
  }

  deleteRecipient(recipient: any) {
    this.clientService.deleteRecipient(recipient.id).subscribe({
      next: (response) => {
        this.toastr.success("Uspešno obrisan primalac");
      },
      error: (error) => {
        this.toastr.error("Greška pri brisanju");
      }
    });
  
    const index = this.recipients.indexOf(recipient);
    if (index > -1) {
      this.recipients.splice(index, 1);
    }
  }

  onRecipientSelect(recipient: Recipient) {
    this.createPaymentForm.patchValue({
      recipientName: recipient.receiverName,
      recipientAccount: recipient.balanceRegistrationNumber,
      numberReference: recipient.referenceNumber,
      paymentCode: recipient.paymentNumber,
      paymentPurpose: recipient.paymentDescription,

    });
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
        this.toastr.info(`Poslat vam je token na ${this.clientData}`);
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

    this.displayOTPDialog = true;
    this.sendTokenToEmail()

  }



  onSelectedFromPaymentAccountChange(selectedAccount: any) {
    if (selectedAccount) {
      const selectedCurrency = selectedAccount.currency;
      this.transactionCurrency = selectedAccount.currency;

      this.transactionToAccount = this.transactionFromAccount.filter(account => account.currency === selectedCurrency && account !== selectedAccount);
    } else {
      this.transactionToAccount = [];
    }
  }

  onSelectedExchange(selectedAccount: any){
    if (selectedAccount) {
      const selectedCurrency = selectedAccount.currency;
      this.exchangeFromCurrency = selectedAccount.currency;

      this.exchangeToList = this.exchangeFromList.filter(account => account.currency != selectedCurrency && account !== selectedAccount);


    } else {
      this.exchangeToList = [];
    }
  }

  onSelectedToExchange(selectedAccount: any){
    if(selectedAccount){
      this.exchangeToCurrency = selectedAccount.currency
    }
  }
  

  onSubmitExchange(){
    if(this.exchangeForm.invalid){
      return
    }
    const exchange = this.getExchangeFormData()
    console.log(exchange);
    
    this.sendExchange(exchange);
  }

  onSubmitOTP(){
   
    this.userService.checkToken(
      this.oneTimePasswordForm.get('paymentOTP')?.value
    ).subscribe({
      next: val => {
        if(this.selectedOption == Options.MONEY_TRANSFER){
          let newTransaction = this.getTransactionFormData();
          this.sendTransaction(newTransaction)
          this.resetForm();
        }
        if(this.selectedOption == Options.NEW_PAYMENT){          
          let newPayment = this.getPaymentFormData();
          this.sendPayment(newPayment)
          this.resetForm();
       }
      },
      error: err => {
        console.log("neuspesno")
        this.resetForm();
      }
    })
}


  sendRecipient(recipient: Recipient){
    this.clientService.addRecipient(recipient).subscribe({
      next: val => {
        this.toastr.success('Uspešno dodat korisnik');
        this.recipients.push(val)
      },
      error: err => {
        this.toastr.error('Neuspešno dodavanje');
        console.log(err);
      }
    })
  }

  sendExchange(exchange: ExchangeMoney){
    this.clientService.exchangeCredits(exchange).subscribe({
      next: val => {
        this.toastr.success('Uspešna konverzija');
        this.resetForm();
      },
      error: err => {
        this.toastr.error('Neuspešna konverzija');
        console.log(err);
      }
    })
  }


  updateRecipient(recipient: Recipient, id: string){
    this.clientService.updateRecipient(recipient, id).subscribe({
      next: val => {
        this.updateEdited(val)
        this.toastr.success("Uspešno izmenjen primalac")
      },
      error: err => {
        this.toastr.error("Izmena nije uspela")
        console.log(err);
      }
    })
  }

  updateEdited(recipient: Recipient) {
    const index = this.recipients.findIndex(r => r.id === recipient.id);

    if (index !== -1) {
      this.recipients[index] = recipient;
    } else {
      console.log('Recipient nije pronađen');
    }
  }
  

  sendPayment(paymentInfo: any){

    const paymentData: PaymentInfo = {
      senderEmail: this.clientData,
      receiverName: paymentInfo.recipientName,
      fromBalanceRegNum: paymentInfo.myAccount,
      toBalanceRegNum: paymentInfo.recipientAccount,
      amount: paymentInfo.amount,
      referenceNumber: paymentInfo.numberReference,
      paymentNumber: paymentInfo.paymentCode,
      paymentDescription: paymentInfo.paymentPurpose,
    }
  
    this.displayOTPDialog = false;

    this.clientService.sendPayment(paymentData).subscribe({
      next: val => {
        this.toastr.success('Uspešno slanje');
        this.getUserPayments()
      },
      error: err => {
        this.toastr.error('Neuspešno slanje');
        console.log(err);
      }
    })

  }


  sendTransaction(transactionInfo: TransactionInfo){

    this.displayOTPDialog = false;

    this.clientService.sendTransaction(transactionInfo).subscribe({
      next: val => {
        this.toastr.success('Uspešna transakcija');
        this.getUserPayments()
      },
      error: err => {
        this.toastr.error('Neuspešna transakcija');
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
      myAccount: this.createPaymentForm.get('myAccount')?.value.registrationNumber
    };

    return newPayment;
  }

  getExchangeFormData(){

    const fromCurrency = this.exchangeForm.get('selectedFromPaymentAccount')?.value.currency;
    const toCurrency = this.exchangeForm.get('selectedToPaymentAccount')?.value.currency;
    const exchangeValue = fromCurrency + '-' + toCurrency;

    const exchange: ExchangeMoney = {
      fromBalanceRegNum: this.exchangeForm.get('selectedFromPaymentAccount')?.value.registrationNumber,
      toBalanceRegNum: this.exchangeForm.get('selectedToPaymentAccount')?.value.registrationNumber,
      exchange: exchangeValue,
      amount: this.exchangeForm.get('amount')?.value,
    }

    return exchange;
  }

  getTransactionFormData(){
    const transactionInfo: TransactionInfo = {
      fromBalanceRegNum: this.moneyTransferForm.get('selectedFromPaymentAccount')?.value.registrationNumber,
      toBalanceRegNum: this.moneyTransferForm.get('selectedToPaymentAccount')?.value.registrationNumber,
      currency: this.moneyTransferForm.get('selectedFromPaymentAccount')?.value.currency,
      amount: this.moneyTransferForm.get('amount')?.value,
    };

    return transactionInfo;
  }

  getNewRecipient(){
    const newRecipient: Recipient = {
      id: "",
      savedByClientEmail: this.clientData,
      receiverName: this.addRecipientForm.get('name')?.value,
      balanceRegistrationNumber: this.addRecipientForm.get('accountNumber')?.value,
      referenceNumber: this.addRecipientForm.get('numberReference')?.value,
      paymentNumber: this.addRecipientForm.get('paymentCode')?.value,
      paymentDescription: this.addRecipientForm.get('paymentPurpose')?.value,
    };

    return newRecipient;
  }



  initForms(){
    this.initCreatePaymentForm();
    this.initMoneyTransferForm();
    this.initAddRecipientForm();
    this.initEditRecipientForm();
    this.initOTPForm();
    this.initExchangeForm();
  }

  initExchangeForm(){
    this.exchangeForm = this.formBuilder.group({
      selectedFromPaymentAccount: ['', Validators.required],
      selectedToPaymentAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
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
      accountNumber: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      paymentCode: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      numberReference: ['', Validators.required],
    });
  }

  initEditRecipientForm() {
    this.editRecipientForm = this.formBuilder.group({
      editName: [this.selectedRecipient?.name || '', Validators.required],
      editAccountNumber: [this.selectedRecipient?.accountNumber.toString() || null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      editNumberReference: [this.selectedRecipient?.referenceNumber, Validators.required],
      editPaymentCode: [this.selectedRecipient?.paymentCode, Validators.required],
      editPaymentPurpose: [this.selectedRecipient?.paymentDescription, Validators.required],
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
        this.getRecipients()
        this.getUserPayments()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getUserPayments(){
    this.clientService.getUserPayments(this.clientData).subscribe({
      next: val => {
        this.transactions = []
        if (Array.isArray(val)) {
          this.transactions.push(...val);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getRecipients(){
    this.clientService.getRecipients(this.clientData).subscribe({
      next: value => {
        this.recipients = value
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

        this.exchangeFromList = value
          .filter(account => ['USD', 'RSD', 'EUR'].includes(account.currency))
          .map(account => ({
            currency: account.currency,
            registrationNumber: account.registrationNumber
          }));

        this.transactionFromAccount = value.map(account => ({
          currency: account.currency,
          registrationNumber: account.registrationNumber
        }));



      },
      error: err => {
        console.log(err)
      }
    });
  }

  resetForm() {
    this.createPaymentForm.reset();
    this.moneyTransferForm.reset();
    this.addRecipientForm.reset();
    this.exchangeForm.reset();
  }


}
