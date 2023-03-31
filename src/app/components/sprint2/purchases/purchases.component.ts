import { Component } from '@angular/core';

import {MenuItem} from "primeng/api";
import { Transaction, Type } from 'src/app/models/stock-exchange.model';



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

  constructor(){

  }
 

  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Prudzbine', routerLink: ['/purchases']}
    ];

    this.status = [
      {label: 'Sve', value: ''},
      {label: 'Zavrsene', value: 'ZAVRSENA'},
      {label: 'Odobrene', value: 'ODOBRENA'},
      {label: 'Odbijene', value: 'ODBIJENA'},
      {label: 'Na cekanju', value: 'NA CEKANJU'}
  ]
    
    this.insertTrans();

  }


  refresh(){

    //TODO ovde ide logika i poziv na servis koji ce pozvati refresh i resetovati tabelu na berza mode
    //I odmah za njim i filtriranje za userove hartije
    // this.loading = true;
    // this.stocks = []
    // setTimeout(()=>{ 
    //   this.insertUsers()
    //   this.BuySellOption = true
    //   this.switch = false
    //   this.loading = false
    // }, 2000);


  }

  insertTrans(){

    const obj = {
      exchangeMICCode: "NYCT", // NYCT
      transaction : "Kupovina",
      hartija: "AKCIJA",
      volume: 5,
      price: 20,
      status: "Odobrena",
      zavrsena: "Ne",
      lastModifed: new Date("2012-01-16"),

    }

    const obj2 = {
      exchangeMICCode: "APP", // NYCT
      transaction : "Kupovina",
      hartija: "AKCIJA",
      volume: 6,
      price: 20,
      status: "Odbijena",
      zavrsena: "Ne",
      lastModifed: new Date("2012-01-17"),

    }

    this.transactions = []

    this.transactions.push(obj)
    this.transactions.push(obj2)

    setTimeout(()=>{ 
      this.loading = false;
      }, 2000);
    
   

  }



}
