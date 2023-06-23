import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Loan } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})

export class LoanComponent {
  loans!:any;
  activeLoan:number=265000000546543564533;
  clientData!: string;


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
  }

  getLoans(email:string){
    this.clientService.getClientLoans(email).subscribe({
      next: value => {
        this.loans = value;
        console.log(value)
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
