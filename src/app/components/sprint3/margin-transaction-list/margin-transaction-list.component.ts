import { Component } from '@angular/core';

/* Model za privremene podatke */
export interface TableMgTrData {
  datum: Date;
  tipKapitala: string;
  iznos: number;
  kredit: number;
  margin: number;
  opis: string;
}

@Component({
  selector: 'app-margin-transaction-list',
  templateUrl: './margin-transaction-list.component.html',
  styleUrls: ['./margin-transaction-list.component.css']
})
export class MarginTransactionListComponent {
  visible: boolean = false;

  dataset: TableMgTrData[] = [
    {datum: new Date("01/01/2001"), tipKapitala: "MARGIN", iznos: 4156.00, kredit: 0,margin: 0, opis: "uplata/isplata"},
    {datum: new Date("01/02/2002"), tipKapitala: "MARGIN", iznos: 4456.00, kredit: 0,margin: 0, opis: "uplata/isplata"},
    {datum: new Date("01/02/2001"), tipKapitala: "MARGIN", iznos: 7556.00, kredit: 0,margin: 0, opis: "uplata/isplata"},

  ];

}
