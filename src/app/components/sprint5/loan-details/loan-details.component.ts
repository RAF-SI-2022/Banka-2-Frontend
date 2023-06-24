import {Component, EventEmitter, Output} from '@angular/core';
import {Client, Loan} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent {

  // @Output() loanDetailsEmitter = new EventEmitter<any>();
  singleLoanVisible: boolean = false;
  // balance
  selectedLoan: Loan;
  // name: string;

  constructor(private clientService: ClientService) {
  }

  open(loan: any) {
    console.log("USAO SAM KUMEEEE")
    this.singleLoanVisible = true;
    this.selectedLoan = loan;
    this.clientService.getClientLoans(this.selectedLoan.clientEmail).subscribe({
      next: value => {
        this.selectedLoan = value;
        // this.name = this.selectedLoan.name+ " " + this.selectedLoan.lastname
      },
      error: err => {
      }
    })
  }

  // open() {
  //   this.singleLoanVisible = true;
  // }

  submitLoan(){
    //DOO
    // this.loanDetailsEmitter.emit(this.loan)
  }

  close() {
    this.singleLoanVisible = false;
  }
}
