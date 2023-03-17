import { Component, ViewChild } from '@angular/core';
import { List } from 'cypress/types/lodash';
import { Table } from 'primeng/table';
import { Stock } from 'src/app/models/stocks.model';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  
  stocks: Stock[] = []

  constructor(){

  }
  ngOnInit(){
    const obj = {
      id: 1,
      oznaka: "APPLE",
      cena: "$13",
      volume: "13m",
      promena: "+$3.5",
      promenaProcent: "1,5%",
      poslednjeAzuriranje: "13/13/2022"
    }
    const obj2 = {
      id: 2,
      oznaka: "GOOGL",
      cena: "$14",
      volume: "15m",
      promena: "+$5.5",
      promenaProcent: "2,5%",
      poslednjeAzuriranje: "23/23/2023"
    }
    this.stocks.push(obj)
    this.stocks.push(obj2)
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

// export interface Stock{
//   id: number,
//   oznaka: string,
//   cena: string,
//   volume: string,
//   promena: string,
//   promenaProcent: string,
//   poslednjeAzuriranje: string
// }