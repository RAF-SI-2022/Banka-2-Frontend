import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {StockService} from "../../../../services/stock.service";
import {Option, Stock, StockDetails} from "../../../../models/stock-exchange.model";
import {BuyStockComponent} from "../buy-stock/buy-stock.component";
import {BuyStockOptionComponent} from "../../../sprint3/buy-stock-option/buy-stock-option.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stock-options',
  templateUrl: './stock-options.component.html',
  styleUrls: ['./stock-options.component.css']
})
export class StockOptionsComponent {

  @ViewChild(BuyStockOptionComponent, {static: true}) buyStockOptionComponent: BuyStockOptionComponent

  breadcrumbItems: MenuItem[];
  dates: string[];
  selectedDate: string;
  selectedDateFormatted: Date
  stockSymbol: string;
  stockOptionsCalls: Option[]
  stockOptionsPuts: Option[]
  stockDetails: StockDetails

  tabMenuItems: MenuItem[];
  activeTabMenuItem: MenuItem

  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private stockService: StockService,
              private toastr: ToastrService,
              private router: Router
  ) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.stockSymbol = params.get('name')!;
    });

    this.tabMenuItems = [
      {
        label: this.stockSymbol + ' opcije',
        icon: 'pi pi-fw pi-chart-line',
        command: event => {
          this.router.navigate([`/stock-options/` + this.stockSymbol])
        }
      },
      {
        label: 'Moje ' + this.stockSymbol + ' opcije',
        icon: 'pi pi-fw pi-user',
        command: event => {
          this.router.navigate(['/my-stock-options/' + this.stockSymbol])
        }
      },
    ];


    this.activeTabMenuItem = this.tabMenuItems[0];


    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']},
      {label: this.stockSymbol + ' opcije', routerLink: ['/stock-options/' + this.stockSymbol]}
    ];

    this.getStockDetails(this.stockSymbol);
    this.getOptionDates();
  }

  // TODO: dohvatiti informacije o akciji po ticker-u
  getStockOptionsBySymbol() {
    this.stockService.getStockOptionsBySymbol(this.stockSymbol).subscribe({
      next: value => {


        console.log(value[0].expirationDate);
        console.log(this.selectedDate)

        this.stockOptionsCalls = value.filter((val: Option) => val.optionType === 'CALL' && val.expirationDate.toString() === this.selectedDate);
        this.stockOptionsPuts = value.filter((val: Option) => val.optionType === 'PUT' && val.expirationDate.toString() === this.selectedDate);

        this.loading = false;
      },
      error: err => {
          console.log(err);
          this.toastr.error(err.error.message)
      }
    });
  }

  getStockOptionsBySymbolByDate() {
    let newDate = this.selectedDate.split("-");
    let newDateString = newDate[2] + '-' + newDate[1] + '-' + newDate[0];
    this.stockService.getStockOptionsByDate(this.stockSymbol, newDateString)
      .subscribe({
          next: value => {
            this.stockOptionsCalls = value.filter((val: Option) => val.optionType === 'CALL');
            this.stockOptionsPuts = value.filter((val: Option) => val.optionType === 'PUT');
          },
          error: err => {
            console.log(err);
            this.toastr.error(err.error.message)
          }
        }
      )
  }

  getOptionDates() {
    if (localStorage.getItem('dates') !== null) {
      this.dates = JSON.parse(localStorage.getItem('dates')!);
    }
    this.stockService.getOptionsDates().subscribe({
      next: value => {
        localStorage.setItem('dates', JSON.stringify(value));
        this.dates = value;
        this.selectedDate = this.dates[0];
        this.getStockOptionsBySymbol();

      },
      error: err => {
        this.toastr.error(err.error)
        // console.error(err);
      }
    });
  }

  getStockDetails(symbol: string) {
    this.stockService.getStockBySymbol(symbol)
      .subscribe({
          next: value => {
            // console.log(value)
            this.stockDetails = value;
            this.loading = true
          },
          error: err => {
            // console.log(err)
            this.toastr.error(err.error)
          }
        }
      )
  }

  toggleBuyOptionDialog(event: MouseEvent, stockOption: Option) {
    event.stopPropagation()

    this.buyStockOptionComponent.buyOptionVisible = true;
    this.buyStockOptionComponent.stockOption = stockOption;
  }

  buyOption($event: any) {
    this.stockService.buyOption(
      $event.optionId,
      $event.amount,
      $event.premium
    ).subscribe({
      next: value => {
        this.toastr.success(`Uspešno ste kupili opciju ${this.stockDetails.symbol}`)
        this.buyStockOptionComponent.buyOptionVisible = false;
      },
      error: err => {
        // console.error(err)
        this.toastr.error(err.error)
      }
    })
  }

}
