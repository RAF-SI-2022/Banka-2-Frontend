import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Future, Transaction} from "../../../../models/stock-exchange.model";
import {StockService} from "../../../../services/stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from 'cypress/types/jquery';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import {MenuItem} from 'primeng/api';
import {ToastrService} from 'ngx-toastr';
import {StockDetailsComponent} from "../../stocks/stock-details/stock-details.component";
import {SellFutureComponent} from "../sell-future/sell-future.component";
import {SellFutureWithLimitComponent} from "../sell-future-with-limit/sell-future-with-limit.component";
import {interval} from 'rxjs';
import {BuyFutureWithLimitComponent} from "../buy-future-with-limit/buy-future-with-limit.component";
import {TransactionsArrayService} from "../../../../services/transactions-array.service";

@Component({
  selector: 'app-single-future-table',
  templateUrl: './single-future-table.component.html',
  styleUrls: ['./single-future-table.component.css']
})
export class SingleFutureTableComponent {

  @ViewChild(SellFutureComponent, {static: true}) sellFutureComponent: SellFutureComponent
  @ViewChild(BuyFutureWithLimitComponent, {static: true}) buyFutureWithLimitComponent: BuyFutureWithLimitComponent
  @ViewChild(SellFutureWithLimitComponent, {static: true}) sellFutureWithLimitComponent: SellFutureWithLimitComponent

  loading: boolean = true; // on load setovati na false

  allFutures: Future[] // prosledjuje mi parent
  futures: Future[] // za prikaz
  myFutures: Future[] // moji
  buyableFutures: Future[]// za kupovinu
  futureName: string = "";
  userId: number;
  changeOption: boolean = false;

  breadcrumbItems: MenuItem[]

  constructor(private stockService: StockService, private userService: UserService,
              private transactionService: TransactionsArrayService,
              private route: ActivatedRoute, private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {

    const source = interval(10000); // 10000 ms = 10 seconds
    source.subscribe(() => {
      // this.getUser()
      this.getAllFutures()
    });

    this.route.paramMap.subscribe(params => {
      this.futureName = params.get('name')!;
    });

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Terminski ugovori', routerLink: ['/futures']},
      {label: `${this.futureName}`, routerLink: [`/future/${this.futureName}`]}
    ];

    this.getUser()
  }

  getUser() {
    this.userService.getUserData().subscribe({
      next: val => {
        this.userId = val.id;
        this.getAllFutures()
      },
      error: err => {
        console.log(err);
        this.toastr.error("Greska probajte kasnije")
        this.router.navigate(["home"]);
      }
    })
  }

  getAllFutures() {
    this.stockService.getAllFuturesByName(this.futureName).subscribe({
      next: val => {

        // dohvatam sve ali treba da se filtrira
        this.allFutures = val;

        this.futures = []
        this.myFutures = []
        this.buyableFutures = []
        for (const f of this.allFutures) {
          if (f.user !== null) {
            if (f.user.id !== this.userId) {
              if (f.forSale) {
                this.buyableFutures.push(f)
                this.futures.push(f)
              }
            } else {
              this.myFutures.push(f)
            }
          } else {
            this.buyableFutures.push(f)
            this.futures.push(f)
          }
        }
        if (this.changeOption) {
          this.futures = this.myFutures

        } else {
          this.futures = this.buyableFutures
        }

        this.getAllWaitingForSellFuturesForUser()
        this.getAllWaitingForBuyFuturesForUser()

        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.allFutures = []
        this.loading = false;
      }
    })
  }

  changeFuturesForShow() {
    if (this.changeOption) {
      this.futures = this.myFutures

    } else {
      this.futures = this.buyableFutures
    }
    // this.changeOption = !this.changeOption
  }

  buyFuture(futureToBuy: Future) {
    this.stockService.buyFuture(
      futureToBuy.id,
      futureToBuy.futureName,
      "BUY",
      futureToBuy.maintenanceMargin,
      0,
      0
    ).subscribe({
      next: val => {
        // console.log(val)
        let tempTransaction: Transaction = {
          exchangeMICCode: futureToBuy.futureName, // futureName
          transaction: "Kupovina", //KUPLJENO Provalimo iz poziva
          hartija: "Terminski ugovor",  //FUTURE provalimo iz poziva
          volume: futureToBuy.contractSize,  //contractSize
          price: futureToBuy.maintenanceMargin, // maintenanceMargin
          status: "IZVRSENA",  //NA CEKANJU
          lastModifed: futureToBuy.settlementDate, //settlementDate
        }
        this.transactionService.addTransactions(tempTransaction)
        this.getAllFutures()
        this.toastr.info("Terminski ugovor je uspešno kupljen.")

      },
      error: err => {
        console.log(err)
        this.getAllFutures()
        this.toastr.error("Greska pri kupovini")
      }
    })
  }

  sellFuture(id: number) {
    console.log("Stigla poruka iz SellFutureComponent sa id: " + id)
    this.sellFutureComponent.sellFutureVisible = false;
    this.sellFutureComponent.resetForm();
    this.getAllFutures()

  }

  sellFutureWithLimit(id: number) {
    console.log("Stigla poruka iz SellFutureWithLimitComponent sa id: " + id)
    this.sellFutureWithLimitComponent.sellFutureVisible = false;
    this.sellFutureWithLimitComponent.resetForm();
    this.getAllFutures()
  }

  buyFutureWithLimit(id: number) {
    console.log("Stigla poruka iz BuyFutureWithLimit sa id: " + id)
    this.buyFutureWithLimitComponent.buyFutureVisible = false;
    this.buyFutureWithLimitComponent.resetForm();
    this.getAllFutures()
  }

  removeFromMarket(futereId: string) {
    this.stockService.removeFutureFromMarket(
      futereId
    ).subscribe({
      next: val => {
        this.getAllFutures()
        this.toastr.info("Uspesno je skinut sa prodaje")
      },
      error: err => {
        console.log(err)
        this.getAllFutures()
        this.toastr.error("Greska pri skidanju sa prodaje")
      }
    })
  }

  openSellFutureDialog(future: Future) {
    this.sellFutureComponent.future = future
    this.sellFutureComponent.open()
  }

  openSellFutureWithLimitDialog(future: Future) {
    this.sellFutureWithLimitComponent.future = future
    this.sellFutureWithLimitComponent.open()

    //this.sellFutureWithLimitComponent.sellFutureVisible = true;
  }

  openBuyFutureDialog(futureName: string) {
    this.buyFutureWithLimitComponent.futureName = futureName
    this.buyFutureWithLimitComponent.buyFutureVisible = true;
    this.buyFutureWithLimitComponent.userId = this.userId.toString();
  }

  buyWithLimit() {

  }


  idsToBeSold: number[]
  idsToBeBought: number[] = []

  getAllWaitingForSellFuturesForUser() {

    this.stockService.getAllWaitingFuturesForUser(
      "sell",
      this.futureName
    ).subscribe({
      next: val => {
        // console.log("SELL");
        // console.log(val);
        this.idsToBeSold = val;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getAllWaitingForBuyFuturesForUser() {

    this.stockService.getAllWaitingFuturesForUser(
      "buy",
      this.futureName
    ).subscribe({
      next: val => {
        console.log("BUY");
        console.log(val);
        // TODO ovde mora da se doda ili na beku da mi se proveri da li ima konkretni user to
        this.idsToBeBought = val
      },
      error: err => {
        console.log(err);
      }
    })
  }

  checkIfFutureIsWaitingSell(id: number): boolean {
    for (const singleId of this.idsToBeSold) {
      if (singleId === id) {
        return false;
      }
    }
    return true;
  }

  checkIfFutureIsWaitingBuy(): boolean {
    if (this.idsToBeBought.length === 0) {
      return true;
    }

    for (const singleId of this.idsToBeBought) {
      if (singleId === this.userId) {
        return false;
      }
    }
    return true;
  }

  removeFutureFromWaitingToBeSold(id: number) {
    this.stockService.removeFromWaitingSellFuture(id)
      .subscribe({
        next: val => {
          // console.log(val.message);
          this.toastr.info("Uspesno skinut sa cekanja")
          this.getAllFutures()
        },
        error: err => {
          // console.log(err);
          this.toastr.error("Greska pri skidanju")
          this.getAllFutures()
        }
      })


  }

  removeFutureFromWaitingToBeBought() {
    this.stockService.removeFromWaitingBuyFuture(
      this.userId
    )
      .subscribe({
        next: val => {
          // console.log(val.message);
          this.toastr.info("Uspesno skinut sa cekanja")
          this.getAllFutures()
        },
        error: err => {
          // console.log(err);
          this.toastr.error("Greska pri skidanju")
          this.getAllFutures()
        }
      })


  }


}
