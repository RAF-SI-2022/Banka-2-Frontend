import { Component } from '@angular/core';

import {MenuItem} from "primeng/api";
import { Transaction, Type } from 'src/app/models/stock-exchange.model';

interface Filter {
  name: string;
}

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

  breadcrumbItems: MenuItem[];

  filter: Filter[];

  selectedType: Filter = {name: 'Sve'};

  transactions: Transaction[]

  loading: boolean = true;

  constructor(){

    this.filter = [
      {name: 'Sve'},
      {name: 'Zavrsene'},
      {name: 'Odobrene'},
      {name: 'Odbijene'},
      {name: 'Na cekanju'},
    ];

  }


  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Prudzbine', routerLink: ['/purchases']}
    ];
    
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

    this.transactions = []

    this.transactions.push(obj)

    setTimeout(()=>{ 
      this.loading = false;
      }, 2000);
    
   

  }



}
