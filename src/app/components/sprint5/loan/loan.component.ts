import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Loan, LoanRequest} from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { RequestLoanComponent } from "../request-loan/request-loan.component";


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})

export class LoanComponent {

  @ViewChild(RequestLoanComponent, {static: true}) requestLoanComponent: RequestLoanComponent;

  loans: Loan[];
  activeLoan:number=265000000546543564533;
  clientData!: string;
  waitingLoans: LoanRequest[];
  newRequest: LoanRequest;
  newLoan: Loan;


  constructor(private router: Router, private clientService: ClientService,
    private toastr: ToastrService) {
}

  ngOnInit() {
    this.clientService.getClientData().subscribe({
      next: value => {
        this.clientData = value
        console.log(value)
        this.getLoans(this.clientData)
      },
      error: err => {
        console.log(err);
      }
    })

    this.getRequests()
    // if (this.requestLoanComponent.requestLoanVisible === undefined) {
    //   this.requestLoanComponent.requestLoanVisible = false;
    // }
  }

  getLoans(email:string){
    this.clientService.getClientLoans(email).subscribe({
      next: value => {
        // this.newLoan = value;
        // this.loans.push(this.newLoan);
        this.loans = value;
        console.log(value)
      },
      error: error => {
        console.log(error);
      }
    });
  }

  requestLoan(loan: any){
    console.log(loan);

    this.clientService.requestNewLoan(loan).subscribe({
      next: value => {
        console.log("ISPOD JE REQUEST")
        console.log(value);
        this.newRequest = value;
        this.waitingLoans.push(this.newRequest);
        console.log("ISPOD SU SVI REQUESTOVI")
        console.log(this.waitingLoans)
        this.getRequests();
      }
    })
  }

  randomRegNumber(length: number) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }

  approveRequest(id :string, request: LoanRequest, regNumber: number){
    this.clientService.approveLoanRequest(id, request, regNumber)
      .subscribe({
        next: val => {
          console.log("KLIKNUT APPROVE")
          this.toastr.success("Zahtev uspesno prihvacen")
          this.getRequests();
        },
        error: err => {
          this.toastr.error(err.error)
          console.log("PUCE KESA KUME")
          console.log(err)
        }
      });
  }

  declineRequest(id :string){
    this.clientService.denyLoanRequest(id)
      .subscribe({
        next: val => {
          this.toastr.success("Zahtev uspesno odbijen")
          this.getRequests();
        },
        error: err => {
          this.toastr.error(err.error)
          console.log("PUCE KESA KUME")
          console.log(err)
        }
      });

  }

  openRequestLoanDialog() {
    this.requestLoanComponent.open();
  }

  checkIfUserIsClient(){

    if(localStorage.getItem("permissions") === null && sessionStorage.getItem("permissions") === null ){
      return false // false je kada je client
    }
    return true

  }

  private getRequests(): void {
    this.clientService.getWaitingLoans().subscribe({
      next: val => {
        this.waitingLoans=val
        console.log(val)

        // for(var o in this.waitingLoans)
        // {
        //   if(this.waitingLoans[o].creditApproval==='WAITING'){
        //     this.waitingLoans[o].creditApproval='NA CEKANJU'
        //   }
        //   if(this.waitingLoans[o].creditApproval==='DENIED'){
        //     this.waitingLoans[o].creditApproval='ODBIJEN'
        //   }
        //   if(this.waitingLoans[o].creditApproval==='APPROVED'){
        //     this.waitingLoans[o].creditApproval='PRIHVACEN'
        //   }
        // }
      },
      error: err =>{
        this.toastr.error(err.error)
      }

    });
  }

}
