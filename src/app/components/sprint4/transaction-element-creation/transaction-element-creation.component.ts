import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CompanyContract, Currency, TransactionElement} from 'src/app/models/stock-exchange.model';
import {UserService} from "../../../services/user-service.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/users.model";
import {OtcService} from "../../../services/otc.service";


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
  priceOfOneElement: number
  contracts: CompanyContract[]
  selectedContract: CompanyContract

  title: string;


  constructor(private router: Router, private formBuilder: FormBuilder,
              private userService: UserService, private toastr: ToastrService, private otcService: OtcService) {
    const navigation = this.router.getCurrentNavigation();


    let tempAmount: number | undefined;

    if (navigation && navigation.extras && navigation.extras.state) {

      let futureStorageFieldJSON = {}

      if ('stock' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stock'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.STOCK
        this.title = this.receivedItem.symbol
        this.priceOfOneElement = this.receivedItem.priceValue

        futureStorageFieldJSON = {
          stock_id: this.receivedItem.priceValue
        }

      } else if ('userStock' in navigation.extras.state) {
        console.log(this.receivedItem)
        this.receivedItem = navigation.extras.state['userStock'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.STOCK
        this.title = this.receivedItem.stock.symbol
        this.priceOfOneElement = this.receivedItem.stock.priceValue

        futureStorageFieldJSON = {
          stock_id: this.receivedItem.priceValue
        }

      } else if ('stockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['stockOption'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.OPTION
        this.title = this.receivedItem.stockSymbol
        this.priceOfOneElement = this.receivedItem.price

        futureStorageFieldJSON = {
          "option_id": this.receivedItem.id,
          "premium": 20,
          "type": this.receivedItem.optionType,
          "expiration_date": this.receivedItem.expirationDate,
          "strike": this.receivedItem.strike,
          "stock_symbol": this.receivedItem.stockSymbol,
          "last_price": this.receivedItem.price
        }

      } else if ('userStockOption' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userStockOption'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.OPTION
        this.title = this.receivedItem.stockSymbol
        this.priceOfOneElement = this.receivedItem.option.price

        futureStorageFieldJSON = {
          "option_id": this.receivedItem.id,
          "premium": 20,
          "type": this.receivedItem.optionType,
          "expiration_date": this.receivedItem.expirationDate,
          "strike": this.receivedItem.strike,
          "stock_symbol": this.receivedItem.stockSymbol,
          "last_price": this.receivedItem.price
        }

      } else if ('futureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['futureContract'];
        this.buyOrSell = Trade.BUY;
        this.transactionElement = Type.FUTURE
        tempAmount = 1;
        futureStorageFieldJSON = this.receivedItem
        this.title = this.receivedItem.futureName
        this.priceOfOneElement = this.receivedItem.maintenanceMargin;

      } else if ('userFutureContract' in navigation.extras.state) {
        this.receivedItem = navigation.extras.state['userFutureContract'];
        this.buyOrSell = Trade.SELL;
        this.transactionElement = Type.FUTURE
        tempAmount = 1;
        futureStorageFieldJSON = this.receivedItem;
        this.title = this.receivedItem.futureName
        this.priceOfOneElement = this.receivedItem.maintenanceMargin;

      }
      this.futureStorageField = this.flattenJSON(futureStorageFieldJSON);
      this.mariadbID = this.receivedItem.id;
    }

    this.elementForm = this.formBuilder.group({
      status: ["", Validators.required],
      referenceNumber: ["", Validators.required],
      priceOfOneElement: [this.priceOfOneElement, Validators.required],
      amount: [tempAmount !== undefined ? tempAmount : this.receivedItem.amount, Validators.required],
      balance: ["CASH", Validators.required],
      currency: ['', Validators.required],
      selectedContract: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.initCurrencies();
    this.getUser();
    this.getContracts();
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

  getContracts() {
    this.otcService.getAllCompanyContracts().subscribe({
      next: value => {
        console.log(value);
        this.contracts = value;
      },
      error: err => {
        this.toastr.error("Greška pri dohvatanju ugovora")
        console.log(err);
      }
    })
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
    let selectedContract = this.elementForm.get('selectedContract')?.value;

    let element: TransactionElement = {
      contractId: selectedContract.id,
      elementId: "0",
      buyOrSell: this.buyOrSell,
      transactionElement: this.transactionElement,
      balance: balance,
      currency: currency,
      amount: amount,
      priceOfOneElement: priceOfOneElement,
      userId: userId,
      mariaDbId: this.mariadbID,
      futureStorageField: this.futureStorageField
    }

    console.log(element);


    this.otcService.createElement(element).subscribe({
      next: value => {

      },
      error: err => {
        if (err.error.text === 'Element uspesno dodat') {
          this.toastr.success("Uspešno dodat element")
        } else {
          this.toastr.error("Greška prilikom čuvanja elementa")
        }
      }
    })
  }

  flattenJSON(jsonObj: any): string {
    const values: any[] = [];

    function processValue(value: any) {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            processValue(item);
          });
        } else {
          for (const key in value) {
            processValue(value[key]);
          }
        }
      } else {
        values.push(value);
      }
    }

    processValue(jsonObj);

    return values.join(',');
  }

}
