import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { Balance } from 'src/app/models/stock-exchange.model';
import { User } from 'src/app/models/users.model';

import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';

/* Model za privremene podatke */
export interface TableTrData {
  datum: Date;
  korsnik: string;
  opis: string;
  valuta: string;
  uplata: number;
  isplate: number;
  rezervisano: number;
  koristi: number;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})




export class TransactionListComponent {
  visible: boolean = false;

  balance: Balance[]

  currencyCode: string 

  user: User
  

  dataset: TableTrData[] = [
    {datum: new Date("01/01/2001"), korsnik: "admin", opis: "opis", valuta: "RSD",uplata: 10, isplate: 25, rezervisano: 10, koristi: 15},

  ];

  constructor(private  stockService: StockService, private userService: UserService) {
      
  }

  ngOnInit() {
    this.currencyCode = 't'
    this.getUser()
  }

  private getTransactionsFromBack(): void {

    
    this.stockService.getAllTransactionsByCurrency('RSD')
    .subscribe({
      next: val => {
           console.log(val)
       // this.balance=val
        console.log(this.currencyCode)
      },

    })

  }

  async getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          //TODO Porpaviti sinhronizaciju
          this.getTransactionsFromBack()
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
