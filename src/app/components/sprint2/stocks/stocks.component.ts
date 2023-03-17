import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import {Stock} from "../../../models/stock-exchange.model";
import { ToastrService } from 'ngx-toastr';
import { StockDetailsComponent } from '../stock-details/stock-details.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  breadcrumbItems: MenuItem[];
  stocks: Stock[] = []

  displayDetails: boolean = false

  loading: boolean = true;

  BuySellOption: boolean = true;

  @ViewChild(StockDetailsComponent, {static : true}) stockDetailsChild : StockDetailsComponent

  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private toastr: ToastrService) {
    
  }

  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Berza', routerLink: ['/stocks']}
    ];

    setTimeout(() => {
      this.insertUsers()
    }, 2000);
  }

  promeniOpciju(){
    this.BuySellOption = !this.BuySellOption
  }

  kupiPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()
    alert("Kupi " + stock.ticker)
  }
  prodajPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()
    alert("Prodaj " + stock.ticker)
  }

  insertUsers(){

    const obj = {
      outstandingShares: 2,
      dividendYield: 3,
      ticker: "tiker",
      name: "string",
      exchange: {
        exchangeName: "string",
        exchangeAcronym: "string",
        exchangeMICCode: "string",
        polity: "string",
        currency: {
          currencyName: "string",
          currencyCode: "string",
          currencySymbol: "string",
          polity: "string"
        },
        timeZone: 1
      },
      lastRefresh: new Date("2019-01-16"),
      price: 1,
      ask: 2,
      bid: 3,
      change: 4,
      volume: 5
    }
    const obj1 = {
      outstandingShares: 1,
      dividendYield: 2,
      ticker: "tiker1",
      name: "string",
      exchange: {
        exchangeName: "string",
        exchangeAcronym: "string",
        exchangeMICCode: "string",
        polity: "string",
        currency: {
          currencyName: "string",
          currencyCode: "string",
          currencySymbol: "string",
          polity: "string"
        },
        timeZone: 3
      },
      lastRefresh: new Date("2012-01-16"),
      price: 4,
      ask: 52,
      bid: 6,
      change: -2,
      volume: 1
    }
    const obj2 = {
      outstandingShares: 1,
      dividendYield: 2,
      ticker: "tiker1",
      name: "string",
      exchange: {
        exchangeName: "string",
        exchangeAcronym: "string",
        exchangeMICCode: "string",
        polity: "string",
        currency: {
          currencyName: "string",
          currencyCode: "string",
          currencySymbol: "string",
          polity: "string"
        },
        timeZone: 3
      },
      lastRefresh: new Date("2012-01-16"),
      price: 4,
      ask: 52,
      bid: 6,
      change: 5,
      volume: 1
    }

    this.stocks.push(obj)
    this.stocks.push(obj1)
    this.stocks.push(obj2)
    this.loading = false
  }

  openMoreInfoDialog(event: Stock){
    this.toastr.info(event.ticker)
    //emit
    this.stockDetailsChild.stock = event
    this.stockDetailsChild.displayDetails = true;
    //OPENDIALOG() ili set bool na true
  }

}
