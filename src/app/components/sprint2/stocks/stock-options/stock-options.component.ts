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

  private stockTicker: string;
  inTheMoneyColor = "#cdf5cd"
  breadcrumbItems: MenuItem[];
  dates: string[];
  selectedDate: string;
  stockSymbol: string;
  stockOptionsCalls: Option[]
  stockOptionsPuts: Option[]
  stockDetails: StockDetails


  constructor(private route: ActivatedRoute, private stockService: StockService, private toastr: ToastrService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.stockSymbol = params.get('name')!;
    });

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']},
      {label: 'Opcije', routerLink: [`/stock-options/${this.stockTicker}`]}
    ];

    this.getStockDetails(this.stockSymbol);
    this.getOptionDates();
    this.getStockOptionsBySymbol();
  }

  // TODO: dohvatiti informacije o akciji po ticker-u
  getStockOptionsBySymbol() {
    this.stockService.getStockOptionsBySymbol(this.stockSymbol).subscribe({
      next: value => {
        this.stockOptionsCalls = value.filter((val: Option) => val.optionType === 'CALL');
        this.stockOptionsPuts = value.filter((val: Option) => val.optionType === 'PUT');
      },
      error: err => {
        console.log(err);
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
      },
      error: err => {
        console.error(err);
      }
    });
  }

  getStockDetails(symbol: string) {
    this.stockService.getStockBySymbol(symbol)
      .subscribe({
          next: value => {
            console.log(value)
            this.stockDetails = value;
          },
          error: err => {
            console.log(err)
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
        console.error(err)
      }
    })
  }

}
