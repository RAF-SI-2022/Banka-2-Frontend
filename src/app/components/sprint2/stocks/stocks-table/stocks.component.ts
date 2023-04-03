import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import {Stock} from "../../../../models/stock-exchange.model";
import { ToastrService } from 'ngx-toastr';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { SortEvent } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {BuyStockComponent} from "../buy-stock/buy-stock.component";
import { SellStockComponent } from '../sell-stock/sell-stock.component';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks-table',
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
  @ViewChild(BuyStockComponent, {static : true}) buyStockComponent : BuyStockComponent
  @ViewChild(SellStockComponent, {static : true}) sellStockComponent : SellStockComponent


  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private toastr: ToastrService, private stockService: StockService) {
  }



  ngOnInit() {

    this.getAllStocks()

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks-table']}
    ];


    // TODO timeout za testiranje

    // TODO timeout 30minuta za refresh
    // setTimeout(()=>{
    //   this.refresh();
    // }, 2000);

    // this.insertUsers();
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

  toggleBuyStockDialog(event: MouseEvent, stock: Stock){
    event.stopPropagation()

    this.buyStockComponent.buyStockVisible = true;
    this.buyStockComponent.stock = stock;

    //TODO OTVORITI DIALOG ZA KUPOVINU SA VEC POSTAVLJENIM PODACIMA

    // this.toastr.info("kupi popup " + stock.ticker)
  }

  toggleSellStockDialog(event: MouseEvent, stock: Stock){
    event.stopPropagation()

    this.sellStockComponent.sellStockVisible = true;

    // this.sellStockComponent.

    //TODO OTVORITI DIALOG ZA PRODAJU SA VEC POSTAVLJENIM PODACIMA

    this.sellStockComponent.sellStockVisible = true;
    this.sellStockComponent.stock = stock;



    //this.toastr.info("Prodaj popup " + stock.ticker)
    //this.refresh()
    // alert("Prodaj " + stock.ticker)
  }

  changeUsers(){
    // const obj2 = {
    //   id: 1,
    //   outstandingShares: 1,
    //   dividendYield: 2,
    //   ticker: "IZMENA",
    //   name: "string",
    //   exchange: {
    //     exchangeName: "string",
    //     exchangeAcronym: "string",
    //     exchangeMICCode: "string",
    //     polity: "string",
    //     currency: {
    //       currencyName: "string",
    //       currencyCode: "string",
    //       currencySymbol: "string",
    //       polity: "string"
    //     },
    //     timeZone: 3,
    //     openTime: "1",
    //     closeTime: "1"
    //   },
    //   lastRefresh: new Date("2012-01-16"),
    //   price: 4,
    //   ask: 52,
    //   bid: 6,
    //   change: 5,
    //   volume: 1
    // }

    // // TODO Ovde treba da se odradi filtriranje samo nasih stockova
    // this.myStocks = []
    // this.myStocks.push(obj2)

    // // Ovde se ubacuju nasi stockovi u listu za prikazivanje
    // this.stocks = this.myStocks

    // za testiranje prazne tabele
    // TODO ovo moze da se setuje kada je error u responsu baze
    // Ili cak taj msg koji ce se prikazivati kada je prazna lista da bude bindovan na error msg

    // this.stocks-table = []

  }

  insertUsers(){

    // const obj = {
    //   id: 1,
    //   outstandingShares: 2,
    //   dividendYield: 3,
    //   ticker: "AAPL",
    //   name: "Apple Inc",
    //   exchange: {
    //     exchangeName: "string",
    //     exchangeAcronym: "string",
    //     exchangeMICCode: "string",
    //     polity: "string",
    //     currency: {
    //       currencyName: "string",
    //       currencyCode: "string",
    //       currencySymbol: "string",
    //       polity: "string"
    //     },
    //     timeZone: 1,
    //     openTime: "1",
    //     closeTime: "1"
    //   },
    //   lastRefresh: new Date("2019-01-16"),
    //   price: 100,
    //   ask: 200,
    //   bid: 300,
    //   change: 4,
    //   volume: 5
    // }
    // const obj1 = {
    //   id: 1,
    //   outstandingShares: 1,
    //   dividendYield: 2,
    //   ticker: "tiker1",
    //   name: "string",
    //   exchange: {
    //     exchangeName: "string",
    //     exchangeAcronym: "string",
    //     exchangeMICCode: "string",
    //     polity: "string",
    //     currency: {
    //       currencyName: "string",
    //       currencyCode: "string",
    //       currencySymbol: "string",
    //       polity: "string"
    //     },
    //     timeZone: 3,
    //     openTime: "1",
    //     closeTime: "1"
    //   },
    //   lastRefresh: new Date("2012-01-16"),
    //   price: 4,
    //   ask: 52,
    //   bid: 6,
    //   change: 0,
    //   volume: 1
    // }
    // const obj2 = {
    //   id: 1,
    //   outstandingShares: 1,
    //   dividendYield: 2,
    //   ticker: "tiker1",
    //   name: "string",
    //   exchange: {
    //     exchangeName: "string",
    //     exchangeAcronym: "string",
    //     exchangeMICCode: "string",
    //     polity: "string",
    //     currency: {
    //       currencyName: "string",
    //       currencyCode: "string",
    //       currencySymbol: "string",
    //       polity: "string"
    //     },
    //     timeZone: 3,
    //     openTime: "1",
    //     closeTime: "1"
    //   },
    //   lastRefresh: new Date("2012-01-16"),
    //   price: 4,
    //   ask: 52,
    //   bid: 6,
    //   change: 5,
    //   volume: 1
    // }


    // // TODO u allStocks cemo stavljati sve stokove iz baze

    // this.allStocks = []
    // this.allStocks.push(obj)
    // this.allStocks.push(obj1)

    // // Ovde te stokove stavljamo u listu za prikazivanje na tabeli

    // this.stocks = this.allStocks

    // // za testiranje prazne tabele
    // // this.stocks-table = []


    // this.loading = false
  }

  openMoreInfoDialog(event: Stock){
    // Slanje podataka na details dialog

    this.stockDetailsChild.stock = event
    this.stockDetailsChild.getStockDetails(event.id);
    this.stockDetailsChild.getStockGraph(event.id, "ONE_DAY");
    this.stockDetailsChild.displayDetails = true;
    this.stockDetailsChild.resetPeriodOption()
    //OPENDIALOG() ili set bool na true
  }
  // refresh(){

  //   //TODO ovde ide logika i poziv na servis koji ce pozvati refresh i resetovati tabelu na berza mode
  //   //I odmah za njim i filtriranje za userove hartije
  //   this.loading = true;
  //   this.stocks = []
  //   setTimeout(()=>{
  //     this.insertUsers()
  //     this.BuySellOption = true
  //     this.switch = false
  //     this.loading = false
  //   }, 2000);


  //   // {
  //   //   this.insertUsers()
  //   //   this.BuySellOption = true
  //   //   this.switch = false
  //   // }
  //   // alert("refresh")
  // }

  getAllStocks(){
    this.stockService.getAllStocks().subscribe({
      next: val=>{
        console.log(val);
        this.stocks = val
        // ovde treba allStocks
        // i onda treba da ih sortiram ovde 
        this.loading = false
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }

  formatNumber(num: number): string {
    if (num >= 1000000000) {
      const billions = num / 1000000000;
      return billions.toFixed(1) + 'b';
    } else if (num >= 1000000) {
      const millions = num / 1000000;
      return millions.toFixed(1) + 'm';
    } else {
      return num.toString();
    }
  }
  

}
