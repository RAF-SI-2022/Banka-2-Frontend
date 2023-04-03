import { Component } from '@angular/core';

import {MenuItem} from "primeng/api";
import { Transaction, Type } from 'src/app/models/stock-exchange.model';
import {TransactionsArrayService} from "../../../services/transactions-array.service";



@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

  breadcrumbItems: MenuItem[];

  transactions: Transaction[]

  loading: boolean = true;

  status!: any[];

  constructor(private transactionService: TransactionsArrayService){

  }


  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Porudžbine', routerLink: ['/purchases']}
    ];

    this.status = [
      {label: 'Sve', value: ''},
      {label: 'Završene', value: 'ZAVRSENA'},
      {label: 'Odobrene', value: 'ODOBRENA'},
      {label: 'Odbijene', value: 'ODBIJENA'},
      {label: 'Na čekanju', value: 'NA CEKANJU'}
  ]

    this.transactions=this.transactionService.getTransactions()

  }


  refresh(){

    //TODO ovde ide logika i poziv na servis koji ce pozvati refresh i resetovati tabelu na berza mode
    //I odmah za njim i filtriranje za userove hartije
    // this.loading = true;
    // this.stocks-table = []
    // setTimeout(()=>{
    //   this.insertUsers()
    //   this.BuySellOption = true
    //   this.switch = false
    //   this.loading = false
    // }, 2000);

  }


}
