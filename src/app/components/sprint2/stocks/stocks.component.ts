import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import {Stock} from "../../../models/stock-exchange.model";
import { ToastrService } from 'ngx-toastr';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { SortEvent } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  breadcrumbItems: MenuItem[];
  stocks: Stock[]

  displayDetails: boolean = false

  loading: boolean = true;

  BuySellOption: boolean = true;

  glupost: boolean = false;

  @ViewChild(StockDetailsComponent, {static : true}) stockDetailsChild : StockDetailsComponent

  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private toastr: ToastrService, private authSrvc: AuthService) {

  }



  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Berza', routerLink: ['/stocks']}
    ];



    // setTimeout(()=>{                           // <<<---using ()=> syntax
    //   this.insertUsers();
    // }, 2000);
    this.insertUsers();
  }

  promeniOpciju(){
    if(this.BuySellOption){
      this.changeUsers()
    }
    else{
      this.insertUsers()
    }
    this.BuySellOption = !this.BuySellOption

    // this.authSrvc.getLogo()
    // .subscribe({
    //   next: val =>{
    //     console.log(val)
    //   },
    //   error: err =>{
    //     console.log("puko sam")
    //   }
    // })

  }

  kupiPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()
    //TODO OTVORITI DIALOG ZA KUPOVINU SA VEC POSTAVLJENIM PODACIMA
    alert("Kupi " + stock.ticker)
  }
  prodajPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()
    //TODO OTVORITI DIALOG ZA PRODAJU SA VEC POSTAVLJENIM PODACIMA
    alert("Prodaj " + stock.ticker)
  }

  changeUsers(){
    const obj2 = {
      outstandingShares: 1,
      dividendYield: 2,
      ticker: "IZMENA",
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


    this.stocks = []
    this.stocks.push(obj2)
  }

  insertUsers(){

    const obj = {
      outstandingShares: 2,
      dividendYield: 3,
      ticker: "AAPL",
      name: "Apple Inc",
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
      price: 100,
      ask: 200,
      bid: 300,
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
    this.stocks = []

    this.stocks.push(obj)
    this.stocks.push(obj1)
    // this.stocks.push(obj2)
    this.loading = false
  }


  customSort(event: any) {
    console.log(event)
    event.data.sort((obj1: any, obj2: any) => {
      let value1, value2;

        value1 = obj1.change;
        value2 = obj2.change;

      if (value1 < value2) {
        return event.order * -1;
      } else if (value1 > value2) {
        return event.order * 1;
      } else {
        return 0;
      }
    });
  }


  openMoreInfoDialog(event: Stock){
    //emit
    this.stockDetailsChild.stock = event
    this.stockDetailsChild.displayDetails = true;
    this.stockDetailsChild.resetPeriodOption()
    //OPENDIALOG() ili set bool na true
  }
  refresh(){
    alert("refresh")
  }

}
