import {Component} from '@angular/core';
import {StockService} from 'src/app/services/stock.service';
import {UserService} from 'src/app/services/user-service.service';
import {ToastrService} from "ngx-toastr";
import {Transaction} from "../../../models/stock-exchange.model";
import {TransactionsArrayService} from "../../../services/transactions-array.service";

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent {

  staticCurrencies = [
    ['EUR', "USD"],
    ['USD', "CHF"],
    ['USD', "CAD"],
    ['GBP', "USD"],
    ['EUR', "GBP"],
  ]

  staticCurrenciesResponse: [any][];

  currencies: [string, string][] = [];
  uniqueLeftCurrencies: any[] = [];
  dynamicRightCurrencies: any[] = [];
  tableCurrencies: [string, string][] = [];

  ammount: number;
  currencyFrom: any;
  currencyTo: any;
  result: any;

  convertedAmmount: number;

  constructor(private stockService: StockService, private transactionService: TransactionsArrayService,
              private userService: UserService, private toaster: ToastrService) {

  }


  ngOnInit() {
    this.getCurrencies()
    this.fillTable()
  }

  // swap(){
  //   const toChange = this.currencyTo;
  //   this.currencyTo = this.currencyFrom;
  //   this.currencyFrom = toChange;

  //   this.onCurrencyFromChanged()
  // }


  getCurrencies() {
    this.stockService.loadCSVData().subscribe(data => {
      this.parseCSVData(data);
    })

  }

  parseCSVData(data: string): void {

    const lines = data.split('\n');


    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',');
      const fromCurrency = values[0];
      const toCurrency = values[1];

      this.currencies.push([fromCurrency, toCurrency]);
    }

    const currencySet = new Set<string>();


    for (const currencyPair of this.currencies) {
      currencySet.add(currencyPair[0])
    }

    for (const currency of currencySet) {
      const obj = {name: currency}
      this.uniqueLeftCurrencies.push(obj)
    }


  }

  onCurrencyFromChanged() {

    this.dynamicRightCurrencies = []

    this.result = null;
    this.currencyTo = null;

    const matchCurrencies = new Set<string>();

    if (this.currencyFrom == null) {
      return
    }

    for (const currencyPair of this.currencies) {
      if (currencyPair[0] == this.currencyFrom.name) {
        matchCurrencies.add(currencyPair[1])
      }
    }


    for (const currencyPair of matchCurrencies) {
      const obj = {name: currencyPair}
      this.dynamicRightCurrencies.push(obj)
    }

  }

  convert() {

    if (this.currencyFrom == null || this.currencyTo == null) {
      return
    }

    for (let i = 0; i < this.currencies.length; i++) {
      if (this.currencyFrom.name == this.currencies[i][0] && this.currencyTo.name == this.currencies[i][1]) {
        this.stockService.getCurrencies(this.currencies[i][0], this.currencies[i][1]).subscribe({
          next: val => {
            this.result = val;
          }
        })
      }
    }
  }

  fillTable() {
    this.staticCurrenciesResponse = []
    for (let curr of this.staticCurrencies) {
      this.stockService.getCurrencies(curr[0], curr[1]).subscribe({
        next: val => {
          this.staticCurrenciesResponse.push(val)
        }
      })

    }
  }


  calculate(object: string) {
    let multiplier = this.ammount !== undefined && this.ammount != 0 ? this.ammount : 1;
    this.convertedAmmount = Number((Number(object) * multiplier).toFixed(2))
    return this.convertedAmmount
  }


  toFixed(object: string) {
    return Number(object).toFixed(2)
  }

  onCurrencyToChanged() {
    if (this.currencyFrom && this.currencyTo) {
      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencyFrom.name == this.currencies[i][0] && this.currencyTo.name == this.currencies[i][1]) {
          this.stockService.getCurrencies(this.currencies[i][0], this.currencies[i][1]).subscribe({
            next: val => {
              this.result = val;
            }
          })
        }
      }
    }
  }


  buy() {
    if (this.ammount < 1) {
      this.toaster.error("Uneta vrednost mora biti veća od 1")
      return
    }
    this.stockService.buyForex(this.currencyFrom.name, this.currencyTo.name, this.ammount ?? 1).subscribe({
      next: val => {
        const momentOfExchange = new Date();
        let tempTransaction: Transaction = {
          exchangeMICCode: this.currencyFrom.name + ' ' + this.currencyTo.name, // forexPairName
          transaction: "Kupovina", //KUPLJENO Provalimo iz poziva
          hartija: "Forex",  //FOREX provalimo iz poziva
          volume: this.ammount ?? 1,  //Kolicina prvobitne valute
          price: this.convertedAmmount, // konvertovana/razmenjena valuta
          status: "IZVRSENA",  //NA CEKANJU
          lastModifed: momentOfExchange.toLocaleString(), //nemamo jos izvlacenje sa beka pa uzima trenutak razmene novca
        }
        this.transactionService.addTransactions(tempTransaction)
        this.toaster.success("Uspešna kupovina")
      }
    })
  }


}
