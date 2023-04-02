import {Component} from '@angular/core';
import {StockService} from 'src/app/services/stock.service';
import {UserService} from 'src/app/services/user-service.service';


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

  constructor(private stockService: StockService, private userService: UserService) {

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
    console.log("sd")
    this.result = null;

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


  toFixed(object: string) {
    return Number(object).toFixed(2)
  }


}
