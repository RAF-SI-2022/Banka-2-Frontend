import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Stock, UserStock} from 'src/app/models/stock-exchange.model';
import {SellStockComponent} from '../sell-stock/sell-stock.component';
import {ToastrService} from 'ngx-toastr';
import {StockService} from 'src/app/services/stock.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-sell-table',
  templateUrl: './stock-sell-table.component.html',
  styleUrls: ['./stock-sell-table.component.css']
})
export class StockSellTableComponent {

  breadcrumbItems: MenuItem[]
  tabMenuItems: MenuItem[];

  activeTabMenuItem: MenuItem

  userStocks: UserStock[]

  loading: boolean = true;

  visible: boolean;

  values: any[] = [];

  selectedStock: any;

  @ViewChild(SellStockComponent, {static: true}) sellStockComponent: SellStockComponent

  constructor(private toastr: ToastrService, private stockService: StockService, private router: Router) {

  }

  ngOnInit() {

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']},
      {label: 'Moje akcije', routerLink: ['/stocks-table/sell']},
    ];

    this.tabMenuItems = [
      {
        label: 'Akcije',
        icon: 'pi pi-fw pi-chart-line',
        command: () => {
          this.router.navigate(['/stocks'])
        }
      },
      { label: 'Moje akcije',
        icon: 'pi pi-fw pi-user',
        command: () => {
          this.router.navigate(['/stocks-table/sell'])
        }
      },
    ];

    this.activeTabMenuItem = this.tabMenuItems[1];

    this.getMyStocks()

    this.populateValues();
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

  onItemClicked(userStock: any){
    this.selectedStock = userStock;
    this.showDialog(userStock)
    console.log(this.selectedStock.stock.symbol)
  }

  showDialog(userStock: any) {
    this.visible = true;
  }

  populateValues(){
    this.values = [
      {
        orderType: "Kupovina",
        amount: "2.0",
        total: "1000",
        date: "22-20-2020"
      },
      {
        orderType: "Prodaja",
        amount: "3.0",
        total: "200",
        date: "23-20-2020"
      },
      
    ];
  }

}
