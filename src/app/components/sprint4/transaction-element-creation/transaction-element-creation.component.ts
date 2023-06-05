import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Currency} from 'src/app/models/stock-exchange.model';
import {UserService} from "../../../services/user-service.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/users.model";


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
  user: User
  futureStorageField: string


  constructor(private router: Router, private formBuilder: FormBuilder,
              private userService: UserService, private toastr: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {

      let futureStorageFieldJSON = {}

      if ('stock' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stock'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.STOCK

        futureStorageFieldJSON = {
          stock_id: this.receivedItem.id
        }

      } else if ('userStock' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userStock'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.STOCK

        futureStorageFieldJSON = {
          stock_id: this.receivedItem.id
        }

      } else if ('stockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stockOption'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.OPTION


        futureStorageFieldJSON = {
          "option_id": this.receivedItem.id,
          "premium": this.receivedItem.premium,
          "type": this.receivedItem.optionType,
          "expiration_date": this.receivedItem.expirationDate,
          "strike": this.receivedItem.strike,
          "stock_symbol": this.receivedItem.stockSymbol
        }

      } else if ('userStockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userStockOption'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.OPTION

        futureStorageFieldJSON = {
          "option_id": this.receivedItem.id,
          "premium": this.receivedItem.premium,
          "type": this.receivedItem.optionType,
          "expiration_date": this.receivedItem.expirationDate,
          "strike": this.receivedItem.strike,
          "stock_symbol": this.receivedItem.stockSymbol
        }

      } else if ('futureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['futureContract'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.FUTURE
        this.elementForm.get('amount')?.setValue(1)
        futureStorageFieldJSON = JSON.stringify(this.receivedItem);

      } else if ('userFutureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userFutureContract'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.FUTURE
        this.elementForm.get('amount')?.setValue(1)
        futureStorageFieldJSON = JSON.stringify(this.receivedItem);

      }

      this.futureStorageField = JSON.stringify(futureStorageFieldJSON);
      console.log(this.receivedItem);
      this.mariadbID = this.receivedItem.id;
      this.getUser();
    }

    this.elementForm = this.formBuilder.group({
      status: ["", Validators.required],
      referenceNumber: ["", Validators.required],
      priceOfOneElement: [this.receivedItem.stock === undefined ? this.receivedItem.priceValue : this.receivedItem.stock.priceValue, Validators.required],
      amount: [this.receivedItem.amount, Validators.required],
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

  getUser() {
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
        },
        error: err => {
          this.toastr.error(err.error)
        }
      })
  }

  submitElement() {
    let balance = this.elementForm.get('balance')?.value
    let currency = this.elementForm.get('currency')?.value.currencySymbol
    let amount = this.elementForm.get('amount')?.value
    let priceOfOneElement = this.elementForm.get('priceOfOneElement')?.value
    let userId = this.user.id;

    console.log(balance, currency, amount, priceOfOneElement, userId, this.futureStorageField);

  }

}
