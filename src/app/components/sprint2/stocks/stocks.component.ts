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

  allStocks: Stock[]
  myStocks: Stock[]

  displayDetails: boolean = false

  loading: boolean = true;

  BuySellOption: boolean = true;
  switch: boolean = false;


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

    
    // TODO timeout za testiranje

    // TODO timeout 30minuta za refresh
    // setTimeout(()=>{ 
    //   this.refresh();
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

  }

  kupiPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()

    //TODO OTVORITI DIALOG ZA KUPOVINU SA VEC POSTAVLJENIM PODACIMA

    this.toastr.info("kupi popup " + stock.ticker)
    this.refresh()
    // alert("Kupi " + stock.ticker)
  }
  prodajPopUp(event: MouseEvent,stock: Stock){
    event.stopPropagation()

    //TODO OTVORITI DIALOG ZA PRODAJU SA VEC POSTAVLJENIM PODACIMA

    this.toastr.info("Prodaj popup " + stock.ticker)
    this.refresh()
    // alert("Prodaj " + stock.ticker)
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

    // TODO Ovde treba da se odradi filtriranje samo nasih stockova
    this.myStocks = []
    this.myStocks.push(obj2)

    // Ovde se ubacuju nasi stockovi u listu za prikazivanje 
    this.stocks = this.myStocks

    // za testiranje prazne tabele
    // TODO ovo moze da se setuje kada je error u responsu baze
    // Ili cak taj msg koji ce se prikazivati kada je prazna lista da bude bindovan na error msg
  
    // this.stocks = []

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
      change: 0,
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


    // TODO u allStocks cemo stavljati sve stokove iz baze

    this.allStocks = []
    this.allStocks.push(obj)
    this.allStocks.push(obj1)

    // Ovde te stokove stavljamo u listu za prikazivanje na tabeli

    this.stocks = this.allStocks

    // za testiranje prazne tabele
    // this.stocks = []


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
    // Slanje podataka na details dialog

    this.stockDetailsChild.stock = event
    this.stockDetailsChild.displayDetails = true;
    this.stockDetailsChild.resetPeriodOption()
    //OPENDIALOG() ili set bool na true
  }
  refresh(){

    //TODO ovde ide logika i poziv na servis koji ce pozvati refresh i resetovati tabelu na berza mode
    //I odmah za njim i filtriranje za userove hartije
    this.loading = true;
    this.stocks = []
    setTimeout(()=>{ 
      this.insertUsers()
      this.BuySellOption = true
      this.switch = false
      this.loading = false
    }, 2000);


    // {
    //   this.insertUsers()
    //   this.BuySellOption = true
    //   this.switch = false
    // }
    // alert("refresh")
  }

}
