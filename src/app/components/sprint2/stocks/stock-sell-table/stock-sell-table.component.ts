import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Stock, UserStock} from 'src/app/models/stock-exchange.model';
import {SellStockComponent} from '../sell-stock/sell-stock.component';
import {ToastrService} from 'ngx-toastr';
import {StockService} from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-sell-table',
  templateUrl: './stock-sell-table.component.html',
  styleUrls: ['./stock-sell-table.component.css']
})
export class StockSellTableComponent {

  breadcrumbItems: MenuItem[]

  userStocks: UserStock[]

  loading: boolean = true;


  @ViewChild(SellStockComponent, {static: true}) sellStockComponent: SellStockComponent

  constructor(private toastr: ToastrService, private stockService: StockService) {

  }

  ngOnInit() {

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']},
      {label: 'Moje akcije', routerLink: ['/stocks-table/sell']},
    ];

    this.getMyStocks()
  }

  getMyStocks() {
    this.stockService.getMyStocks().subscribe({
      next: val => {
        this.userStocks = val;
        this.loading = false;
      }
      , error: err => {
        this.toastr.error("Greska pri dovlacenju podataka")
        this.loading = false
      }
    })
  }


  toggleSellStockDialog(stock: Stock) {
    this.sellStockComponent.sellStockVisible = true;
    this.sellStockComponent.stock = stock;
  }

  refreshSell(symbol: string) {
    this.sellStockComponent.sellStockVisible = false;
    this.toastr.info("Akcija " + symbol + " je uspesno postavljena na prodaju!")
    this.getMyStocks()
  }

  removeFromSale(symbol: string) {
    this.stockService.removeStockFromSale(symbol).subscribe({
      next: val => {
        // console.log(val);
        this.getMyStocks()
        this.toastr.info("Uspesno skinuto")
      },
      error: err => {
        // console.log(err);
        this.toastr.error("Greska pri skidanju")
      }
    })
  }

}
