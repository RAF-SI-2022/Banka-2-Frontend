import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { MyOption, Option, StockDetails } from 'src/app/models/stock-exchange.model';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-my-stock-options',
  templateUrl: './my-stock-options.component.html',
  styleUrls: ['./my-stock-options.component.css']
})
export class MyStockOptionsComponent {

  private stockTicker: string;
  inTheMoneyColor = "#cdf5cd"
  breadcrumbItems: MenuItem[];
  dates: string[];
  selectedDate: string;
  stockSymbol: string;
  stockOptionsCalls: Option[]
  stockOptionsPuts: Option[]
  stockDetails: StockDetails

  myOptionsCalls: MyOption[]
  myOptionsPuts: MyOption[]

  tabMenuItems: MenuItem[];
  activeTabMenuItem: MenuItem

  loading: boolean = false;


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
          this.router.navigate([`/stock-options/`+ this.stockSymbol])
        }
      },
      { label: 'Moje ' + this.stockSymbol + ' opcije',
        icon: 'pi pi-fw pi-user',
        command: event => {
          this.router.navigate(['/my-stock-options/' + this.stockSymbol])
        }
      },
    ];


    this.activeTabMenuItem = this.tabMenuItems[1];




    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Akcije', routerLink: ['/stocks']},
      {label: this.stockSymbol + ' opcije', routerLink: ['/stock-options/' + this.stockSymbol]}
    ];

    this.getStockDetails(this.stockSymbol);
    this.getOptionDates();
    this.getStockOptionsBySymbol();



  }

  // TODO: dohvatiti informacije o akciji po ticker-u
  getStockOptionsBySymbol() {
    this.stockService.getMyStockOptions(this.stockSymbol).subscribe({
      next: value => {
        // console.log(value);
        
        this.myOptionsCalls = value.filter((val: MyOption) => val.type === 'CALL');
        this.myOptionsPuts = value.filter((val: MyOption) => val.type === 'PUT');

        // if(this.myOptionsCalls.length === 0 ){
        //   this.myOptionsCalls = []
        // } 
        // if(this.myOptionsPuts.length === 0 ){
        //   this.myOptionsPuts = []
        // }
      },
      error: err => {
        console.log(err);
        this.toastr.error(err.error)

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
            // console.log(err);
            this.toastr.error(err.error)

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
        // console.error(err);
        this.toastr.error(err.error)

      }
    });
  }

  getStockDetails(symbol: string) {
    this.stockService.getStockBySymbol(symbol)
      .subscribe({
          next: value => {
            this.stockDetails = value;
            this.loading = true;
          },
          error: err => {
            // console.log(err)
            this.toastr.error(err.error)

          }
        }
      )
  }
}
