import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Stock, UserStock} from 'src/app/models/stock-exchange.model';
import {SellStockComponent} from '../sell-stock/sell-stock.component';
import {ToastrService} from 'ngx-toastr';
import {StockService} from 'src/app/services/stock.service';
import {Router} from "@angular/router";
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import { error } from 'cypress/types/jquery';


@Component({
  selector: 'app-stock-sell-table',
  templateUrl: './stock-sell-table.component.html',
  styleUrls: ['./stock-sell-table.component.css']
})
export class StockSellTableComponent {

  breadcrumbItems: MenuItem[]
  tabMenuItems: MenuItem[];

  activeTabMenuItem: MenuItem

  tempList: any[]

  userStocks: UserStock[]

  loading: boolean = true;

  visible: boolean;

  values: any[] = [];

  selectedStock: any;

  user: User

  @ViewChild(SellStockComponent, {static: true}) sellStockComponent: SellStockComponent

  constructor(private userService: UserService, private toastr: ToastrService, private stockService: StockService, private router: Router) {

  }

  ngOnInit() {

    this.getUser();

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
    this.populateValues();
  }

  showDialog(userStock: any) {
    this.visible = true;
  }

  populateValues(){

    this.tempList = []

    this.stockService.getAllOrdersByUserId(this.user?.id)
      .subscribe({
        next: val => {
          this.values = val

          for(let obj in this.values){
            if(this.values[obj].orderType === "STOCK" && this.values[obj].symbol === this.selectedStock?.stock?.symbol){
              this.tempList.push(this.values[obj])
            }
          }

          this.values = this.tempList;

        },
        error: err => {
          console.log(err)
        }
      })
  }

  getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
