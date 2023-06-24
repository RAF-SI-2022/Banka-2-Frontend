import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ClientService} from "../../../services/client.service";
import {Loan, LoanRequest} from "../../../models/client.model";

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.css']
})
export class RequestLoanComponent {

  @Output() requestLoanEmitter = new EventEmitter<any>();

  requestLoanVisible: boolean = false;
  requestLoanForm: FormGroup;
  isFormValid = false;
  currentClientEmail: string

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private clientService: ClientService) {
    this.requestLoanForm = this.formBuilder.group({
      //TODO proveriti da li ovi validatori ista valjaju
      amount: ['', Validators.required],
      purposeMessage: ['', Validators.required],
      monthlyPay: ['', Validators.required],
      // jobLocation: ['', Validators.required],
      // timeEmployed: ['', Validators.required],
      remainingPeriodOfValidity: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.requestLoanForm.valueChanges.subscribe(() => {
      this.isFormValid = this.requestLoanForm.valid;
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

  open(){
    this.requestLoanVisible = true;
  }

  resetForm() {
    this.requestLoanForm.get('amount')?.reset();
    this.requestLoanForm.get('purposeMessage')?.reset();
    this.requestLoanForm.get('monthlyPay')?.reset();
    // this.requestLoanForm.get('employed')?.reset();
    this.requestLoanForm.get('jobLocation')?.reset();
    this.requestLoanForm.get('timeEmployed')?.reset();
    this.requestLoanForm.get('remainingPeriodOfValidity')?.reset();
    this.requestLoanForm.get('phoneNumber')?.reset();
  }

  submitRequestLoan() {

    let loan: LoanRequest = {
      clientEmail: this.currentClientEmail,
      amount: this.requestLoanForm.get('amount')?.value,
      usedFor: this.requestLoanForm.get('purposeMessage')?.value,
      monthlyRate: this.requestLoanForm.get('monthlyPay')?.value,
      clientHasJob: this.requestLoanForm.get('employed')?.value,
      jobLocation: this.requestLoanForm.get('jobLocation')?.value,
      currentJobDuration: this.requestLoanForm.get('timeEmployed')?.value,
      dueDateInMonths: this.requestLoanForm.get('remainingPeriodOfValidity')?.value,
      phoneNumber: this.requestLoanForm.get('phoneNumber')?.value,
    }

    this.requestLoanEmitter.emit(loan);
    this.resetForm();
    this.requestLoanVisible = false;
  }

}
