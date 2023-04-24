import { Component } from '@angular/core';

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

  dataset: TableTrData[] = [
    {datum: new Date("01/01/2001"), korsnik: "admin", opis: "opis", valuta: "RSD",uplata: 10, isplate: 25, rezervisano: 10, koristi: 15},

  ];

  loading: boolean = true;
}
