import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ClientService} from "../../../services/client.service";
import {Loan, LoanRequest} from "../../../models/client.model";

@Component({
  selector: 'app-approve-loan-request',
  templateUrl: './approve-loan-request.component.html',
  styleUrls: ['./approve-loan-request.component.css']
})
export class ApproveLoanRequestComponent {

  @Output() approveLoanEmitter = new EventEmitter<any>();

  approvedLoanVisible: boolean = false;
  approvedLoanForm: FormGroup;
  isFormValid = false;
  currentClientEmail: string;
  recievedLoanRequest: LoanRequest;
  paymentAccounts: any[];

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private clientService: ClientService) {
    this.approvedLoanForm = this.formBuilder.group({
      //TODO proveriti da li ovi validatori ista valjaju
      accRegNumber: ['', Validators.required],
      rate: ['', Validators.required],
      currency: ['', Validators.required]
    });

    this.approvedLoanForm.valueChanges.subscribe(() => {
      this.isFormValid = this.approvedLoanForm.valid;
    });
  }

  ngOnInit(){
    this.clientService.getClientData().subscribe({
      next: value => {
        this.currentClientEmail = value;
      },
      error: err => {

      }
    })
  }

  open(approvedLoan: any){
    this.recievedLoanRequest = approvedLoan
    this.currentClientEmail = this.recievedLoanRequest.clientEmail
    this.getUserAccounts(this.currentClientEmail)
    this.approvedLoanVisible = true;
  }

  getUserAccounts(email: string){
    this.clientService.getAccountsByClientEmail(email).subscribe({
      next: value => {
        this.paymentAccounts = value;
      },
      error: err => {

      }
    })
  }

  resetForm() {
    this.approvedLoanForm.get('amount')?.reset();
    this.approvedLoanForm.get('purposeMessage')?.reset();
    this.approvedLoanForm.get('monthlyPay')?.reset();
    this.approvedLoanForm.get('employed')?.reset();
    this.approvedLoanForm.get('jobLocation')?.reset();
    this.approvedLoanForm.get('timeEmployed')?.reset();
    this.approvedLoanForm.get('remainingPeriodOfValidity')?.reset();
    this.approvedLoanForm.get('phoneNumber')?.reset();
  }

  submitApprovedLoan() {

    let loan: Loan = {
      id: this.recievedLoanRequest.id, //cisto da se udovolji modelu
      clientEmail: this.recievedLoanRequest.clientEmail,
      name: '', //uvek je na cekanju kad se napravi request
      accountRegNumber: this.approvedLoanForm.get('accRegNumber')?.value,
      creationDate: new Date().toLocaleDateString(),
      amount: this.recievedLoanRequest.amount,
      remainingAmount: this.recievedLoanRequest.amount,
      ratePercentage: this.approvedLoanForm.get('rate')?.value,
      monthlyRate: this.recievedLoanRequest.monthlyRate,
      dueDate: this.recievedLoanRequest.dueDateInMonths.toString(),
      currency: this.approvedLoanForm.get('currency')?.value,
    }

    this.approveLoanEmitter.emit(loan);
    this.resetForm();
    this.approvedLoanVisible = false;
  }

}
