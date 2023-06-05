import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Currency} from 'src/app/models/stock-exchange.model';


enum Trade {
  BUY = 'BUY',
  SELL = 'SELL'
}

enum Type {
  FUTURE = 'FUTURE',
  STOCK = 'STOCK',
  OPTION = 'OPTION'
}

@Component({
  selector: 'app-transaction-element-creation',
  templateUrl: './transaction-element-creation.component.html',
  styleUrls: ['./transaction-element-creation.component.css']
})


export class TransactionElementCreationComponent {



  receivedItem: any;
  elementForm: FormGroup;
  buyOrSell: string;
  transactionElement: string;
  currencies: Currency[]
  selectedCurrency: Currency;
  mariadbID: number;
  showAmount: boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {

      if ('stock' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stock'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.STOCK

      } else if ('userStock' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userStock'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.STOCK
        console.log(this.receivedItem.amount);

      } else if ('stockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stockOption'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.OPTION

      } else if ('userStockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userStockOption'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.OPTION


      } else if ('futureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['futureContract'];
        console.log(this.receivedItem);
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.FUTURE
        this.elementForm.get('amount')?.setValue(1)

      } else if ('userFutureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userFutureContract'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.FUTURE
        this.elementForm.get('amount')?.setValue(1)

      }


      console.log(this.receivedItem);
      this.mariadbID = this.receivedItem.id;
    }

    this.elementForm = this.formBuilder.group({
      status: ["", Validators.required],
      referenceNumber: ["", Validators.required],
      priceOfOneElement: ["", Validators.required],
      amount: ["", Validators.required],
      balance: ["CASH", Validators.required],
      currency: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.initCurrencies();
  }

  initCurrencies() {
    this.currencies = [
      {
        currencyName: "US Dollar",
        currencyCode: '123',
        currencySymbol: "USD",
        polity: 'test'
      },
      {
        currencyName: "Euro",
        currencyCode: '123',
        currencySymbol: "EUR",
        polity: 'test1'
      }
    ]

    this.selectedCurrency = this.currencies[0];
  }


  submitElement() {
    let balance = this.elementForm.get('balance')?.value
    let currency = this.elementForm.get('currency')?.value.currencySymbol
    let amount = this.elementForm.get('amount')?.value
    let priceOfOneElement = this.elementForm.get('priceOfOneElement')?.value

    console.log(balance, currency, amount, priceOfOneElement)

  }

}
