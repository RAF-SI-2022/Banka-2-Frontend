import {Component, ViewChild} from '@angular/core';
import {Future} from "../../../../models/stock-exchange.model";
import {StockService} from "../../../../services/stock.service";
import {ActivatedRoute} from "@angular/router";
import {error} from 'cypress/types/jquery';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import {MenuItem} from 'primeng/api';
import {ToastrService} from 'ngx-toastr';
import {StockDetailsComponent} from "../../stocks/stock-details/stock-details.component";
import {SellFutureComponent} from "../sell-future/sell-future.component";
import {SellFutureWithLimitComponent} from "../sell-future-with-limit/sell-future-with-limit.component";
import { interval } from 'rxjs';
import {BuyFutureWithLimitComponent} from "../buy-future-with-limit/buy-future-with-limit.component";

@Component({
  selector: 'app-single-future-table',
  templateUrl: './single-future-table.component.html',
  styleUrls: ['./single-future-table.component.css']
})
export class SingleFutureTableComponent {

  @ViewChild(SellFutureComponent, {static : true}) sellFutureComponent : SellFutureComponent
  @ViewChild(BuyFutureWithLimitComponent, {static : true}) buyFutureWithLimitComponent : BuyFutureWithLimitComponent
  @ViewChild(SellFutureWithLimitComponent, {static : true}) sellFutureWithLimitComponent : SellFutureWithLimitComponent

  loading: boolean = true; // on load setovati na false

  allFutures: Future[] // prosledjuje mi parent
  futures: Future[] // za prikaz
  myFutures: Future[] // moji
  buyableFutures: Future[]// za kupovinu
  futureName: string = "";
  userId: number;
  changeOption: boolean = false;

  breadcrumbItems: MenuItem[]

  constructor(private stockService: StockService, private userService: UserService
    , private route: ActivatedRoute, private toastr: ToastrService) {

  }

  ngOnInit() {

    const source = interval(10000); // 10000 ms = 10 seconds
    source.subscribe(() => this.getUser());

    this.route.paramMap.subscribe(params => {
      this.futureName = params.get('name')!;
      // console.log(this.futureName);
    });

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Terminski ugovori', routerLink: ['/futures']},
      {label: `${this.futureName}`, routerLink: [`/future/${this.futureName}`]}
    ];

    this.getUser()
    this.getAllWaitingFuturesForUser()
  }

  getUser() {
    this.userService.getUserData().subscribe({
      next: val => {


        this.userId = val.id;
        // console.log(this.userId)
        this.getAllFutures()

      },
      error: err => {
        console.log(err);
      }
    })
  }

  getAllFutures() {
    this.stockService.getAllFuturesByName(this.futureName).subscribe({
      next: val => {
        // console.log(val)
        // console.log(val.user)
        for (const a of val) {
          if (a.user !== null) {
            // console.log(a.user.id)
          }
        }
        // dohvatam sve ali treba da se filtrira
        this.allFutures = val;

        this.futures = []
        this.myFutures = []
        this.buyableFutures = []
        // todo mozda promeniti da je userId ne user_id
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
    //todo dohvatiti id futura
    // this.stockService.buyFuture()
    // console.log(futureToBuy)
    // console.log(futureToBuy)
    // this.stockService.buyFuture(
    //   futureToBuy.id,
    //   futureToBuy.futureName,
    //   "BUY",
    //   futureToBuy.maintenanceMargin,
    //   0,
    //   0
    // ).subscribe({
    //   next: val => {
    //     console.log(val)
    //     this.getAllFutures()
    //     this.toastr.info("Uspesno je kupljen")
    //
    //   },
    //   error: err => {
    //     console.log(err)
    //     this.toastr.error("Greska pri kupovini")
    //   }
    // })
  }

  sellFuture(id: number) {
    console.log("Stigla poruka iz SellFutureComponent sa id: " + id)
    this.getUser()
  }

  sellFutureWithLimit(id: number) {
    console.log("Stigla poruka iz SellFutureWithLimitComponent sa id: " + id)
    this.getUser()
  }

  buyFutureWithLimit(id: number) {
    console.log("Stigla poruka iz BuyFutureWithLimit sa id: " + id)
    this.getUser()
  }

  removeFromMarket(futereId: string) {
    this.stockService.removeFutureFromMarket(
      futereId
    ).subscribe({
      next: val => {
        // console.log(val);
        this.getAllFutures()
        this.toastr.info("Uspesno je skinut sa prodaje")
      },
      error: err => {
        console.log(err)
        this.toastr.error("Greska pri skidanju sa prodaje")
      }
    })
  }

  openSellFutureDialog(future: Future) {
    this.sellFutureComponent.future = future
    this.sellFutureComponent.open()
    // this.sellFutureComponent.sellFutureVisible = true;
  }

  openSellFutureWithLimitDialog(future: Future) {
    this.sellFutureWithLimitComponent.future = future
    this.sellFutureWithLimitComponent.sellFutureVisible = true;
  }

  openBuyFutureDialog(futureName: string) {
    this.buyFutureWithLimitComponent.futureName = futureName
    this.buyFutureWithLimitComponent.buyFutureVisible = true;
  }

  buyWithLimit() {

  }

  getAllWaitingFuturesForUser() {
    // console.log(this.futureName);

    this.stockService.getAllWaitingFuturesForUser(
      "sell",
      this.futureName
    ).subscribe({
      next: val => {
        console.log(val);
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
