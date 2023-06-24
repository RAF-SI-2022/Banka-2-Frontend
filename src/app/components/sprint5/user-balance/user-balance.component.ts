import { Component,  ViewChild } from '@angular/core';
import {ClientService} from "../../../services/client.service";
import { SingleUserBalanceComponent } from '../single-user-balance/single-user-balance.component';

@Component({
  selector: 'app-user-balance',
  templateUrl: './user-balance.component.html',
  styleUrls: ['./user-balance.component.css']
})
export class UserBalanceComponent {
  accounts: any[] = [];
  clientEmail: string

  @ViewChild(SingleUserBalanceComponent, {static: true}) singleUserBalanceComponent: SingleUserBalanceComponent




  constructor(private clientService: ClientService) {
  }

  ngOnInit(){
    this.clientService.getClientData().subscribe({
      next: value => {
        this.clientEmail = value;

        this.clientService.getAccountsByClientEmail(value).subscribe({
          next: value => {
            this.accounts = value;
          },
          error: err => {

          }
        })
      },
      error: err => {

      }
    })
  }

  openLocalBalance(account: any) {
    this.singleUserBalanceComponent.open(account);
  }

  submitEditBalanceName(account: any) {
      // DO
  }
}
