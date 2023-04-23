import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import { Transaction } from 'src/app/models/stock-exchange.model';


@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.css']
})
export class CapitalComponent  {

  breadcrumbItems: MenuItem[];

  transactions: Transaction[]

  loading: boolean = true;

  status!: any[];

  constructor() {

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

    

  }


  refresh() {

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