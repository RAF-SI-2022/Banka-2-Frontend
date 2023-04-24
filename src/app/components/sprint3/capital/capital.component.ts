import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Transaction } from 'src/app/models/stock-exchange.model';
import { DepositWithdrawCapitalComponent } from '../deposit-withdraw-capital/deposit-withdraw-capital.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Router } from '@angular/router';
/* Model za privremene podatke */
export interface TableData {
  valuta: string;
  ukupno: number;
  rezervisano: number;
  raspolozivo: number;
}


@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.css']
})
export class CapitalComponent  {


  dataset: TableData[] = [
    {valuta: "RSD", ukupno: 25, rezervisano: 10, raspolozivo: 15},
    {valuta: "USD", ukupno: 125, rezervisano: 100, raspolozivo: 25},
    {valuta: "EUR", ukupno: 251, rezervisano: 0, raspolozivo: 251},
    {valuta: "CHF", ukupno: 123, rezervisano: 123, raspolozivo: 0},
  ];


  breadcrumbItems: MenuItem[];

  transactions: Transaction[]

  capitalOverview: any;

  capitalTableValues: string[];

  status!: any[];

  constructor(private router: Router) {

  }
  
  @ViewChild(DepositWithdrawCapitalComponent, {static: true}) depositWithdrawCapitalComponent: DepositWithdrawCapitalComponent
  @ViewChild(TransactionListComponent, {static: true}) transactionListComponent: TransactionListComponent



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

    this.capitalOverview = [
      { type: 'AKCIJA', total: '$0' },
      { type: 'FUTURE_UGOVOR', total: '$0' }
    ];

      this.capitalOverview = [
      { type: 'AKCIJA', total: '$0' },
      { type: 'FUTURE_UGOVOR', total: '$0' }
    ];
  
  }

  onCapitalRowClick(type: string) {
    if (type === 'AKCIJA') {
      this.router.navigate(['/stocks-table/sell']);
    } else if (type === 'FUTURE_UGOVOR') {
      this.router.navigate(['/future-contract']);
    }
  }

  toggleDepositWithdrawCapitalkDialog() {
    this.depositWithdrawCapitalComponent.open();
  }

  toggleTransactionListDialog() {
    this.transactionListComponent.visible=true;
  }

  refresh() {
    console.log("123")
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

