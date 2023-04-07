import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import {Stock} from "../../../../models/stock-exchange.model";
import { ToastrService } from 'ngx-toastr';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { SortEvent } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {BuyStockComponent} from "../buy-stock/buy-stock.component";
import { SellStockComponent } from '../sell-stock/sell-stock.component';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  breadcrumbItems: MenuItem[];
  stocks: Stock[]

  allStocks: Stock[]
  myStocks: Stock[] = []

  displayDetails: boolean = false

  loading: boolean = true;

  BuySellOption: boolean = true;
  switch: boolean = false;

  userId: number;

  symbolInput: string;


  @ViewChild(StockDetailsComponent, {static : true}) stockDetailsChild : StockDetailsComponent
  @ViewChild(BuyStockComponent, {static : true}) buyStockComponent : BuyStockComponent



  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private toastr: ToastrService, private userService: UserService, private stockService: StockService) {
  }



  ngOnInit() {

    const source = interval(10000); // 10000 ms = 10 seconds
    source.subscribe(() => {
      // this.getUser()
      
      this.getAllStocks();
      this.getMyStocks();
    });


    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']}
    ];


    this.getAllStocks()


    this.getUserData()

    // TODO timeout za testiranje

    // TODO timeout 30minuta za refresh
    // setTimeout(()=>{
    //   this.refresh();
    // }, 2000);

    // this.insertUsers();
  }

  getUserData(){
    this.userService.getUserData().subscribe({
      next: val=>{

        this.userId = val.id
        this.getMyStocks()
        // this.stocks = this.allStocks
      },
      error: err=>{
        console.log(err);

      }
    })
  }

  getAllStocks(){
    this.stockService.getAllStocks().subscribe({
      next: val=>{
        this.allStocks = val;

        // TODO dodati onaj temp kao u getMyStocks

        if(!this.switch){
          this.stocks = this.allStocks
        }

        this.loading = false
      },
      error: err=>{
        console.log(err);
        this.toastr.error("Greska pri dohvatanju podataka")
        this.allStocks = []
      }
    })
  }

  getStockBySymbol(symbol: string){
    this.stockService.getStockBySymbol(symbol)
    .subscribe({
      next: val=>{
          console.log(val);
          //todo dodati u red
          this.allStocks.push(val)
          if(!this.switch){
            this.stocks = this.allStocks
          }
      },
      error: err=>{
        console.log(err);
        this.toastr.error("Greska pri trazenju akcije")
      }
    })
  }

  getMyStocks(){
    this.stockService.getMyStocks().subscribe({
      next: val=>{
        let tempStocks: Stock[] = []
        for(const single of val){

          if(single.user.id === this.userId){
            console.log(single);

            if(single.amount > 0){
              tempStocks.push(single.stock)
            }
            else if(single.amountForSale > 0){
              tempStocks.push(single.stock)
            }
          }
        }
        if(tempStocks.length <1){
          this.myStocks = []
        }
        else{
          this.myStocks = tempStocks
        }
        if(this.switch){
          this.stocks = this.myStocks
        }
    },
    error: err=>{
      console.log(err);
      this.toastr.error("Greska pri dohvatanju podataka")

    }
    })
  }



  promeniOpciju(){
    if(this.switch){
      this.stocks = this.myStocks
    }
    else{
      this.stocks = this.allStocks
    }
  }

  toggleBuyStockDialog(event: MouseEvent, stock: Stock){
    event.stopPropagation()

    this.buyStockComponent.buyStockVisible = true;
    this.buyStockComponent.stock = stock;

    //TODO OTVORITI DIALOG ZA KUPOVINU SA VEC POSTAVLJENIM PODACIMA

    // this.toastr.info("kupi popup " + stock.ticker)
  }



  openMoreInfoDialog(event: Stock){
    // Slanje podataka na details dialog

    this.stockDetailsChild.stock = event
    this.stockDetailsChild.getStockDetails(event.id);
    this.stockDetailsChild.getStockGraph(event.id, "ONE_DAY");
    this.stockDetailsChild.displayDetails = true;
    this.stockDetailsChild.resetPeriodOption()
    //OPENDIALOG() ili set bool na true
  }


  formatNumber(num: number): string {
    if (num >= 1000000000) {
      const billions = num / 1000000000;
      return billions.toFixed(1) + 'b';
    } else if (num >= 1000000) {
      const millions = num / 1000000;
      return millions.toFixed(1) + 'm';
    } else {
      return num.toString();
    }
  }

  removeFromSellStock(symbol:string){
    this.stockService.removeStockFromSale(symbol).subscribe({
      next:val=>{
        this.toastr.info("Uspesno skinut!");
        this.getAllStocks();
        this.getMyStocks();
      },
      error: err => {
        this.toastr.error("Greska!");
        this.getAllStocks();
        this.getMyStocks();

      }
    })
  }
  
  refreshBuy(symbol:string){
    this.getAllStocks();
    this.getMyStocks();
    this.buyStockComponent.buyStockVisible = false;
    this.toastr.info("Akcija " + symbol + " je uspesno kupljena!")
  }



}
