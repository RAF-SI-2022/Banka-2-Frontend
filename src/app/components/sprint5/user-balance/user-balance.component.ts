import { Component } from '@angular/core';
import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'app-user-balance',
  templateUrl: './user-balance.component.html',
  styleUrls: ['./user-balance.component.css']
})
export class UserBalanceComponent {
  accounts: any[] = [];
  clientEmail: string

  constructor(private clientService: ClientService) {
  }

  ngOnInit(){
    this.clientService.getClientData().subscribe({
      next: value => {
        console.log(value);
        this.clientEmail = value;

        this.clientService.getAccountsByClientEmail(value).subscribe({
          next: value => {
            console.log(value);
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

  }
}
