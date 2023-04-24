import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {StockService} from "../../../../services/stock.service";

@Component({
  selector: 'app-stock-options',
  templateUrl: './stock-options.component.html',
  styleUrls: ['./stock-options.component.css']
})
export class StockOptionsComponent {

  private stockTicker: string;
  inTheMoneyColor = "#cdf5cd"
  breadcrumbItems: MenuItem[];
  dates: [];
  selectedDate: Date

  constructor(private route: ActivatedRoute, private stockService: StockService) {

  }

  stockOptions: any[] = [
    {
      puts: {
        last: 1,
        theta: 2,
        bid: 3,
        ask: 4,
        volatile: 5,
        oi: 6,
      },
      strike: 160,
      calls: {
        last: 1,
        theta: 2,
        bid: 3,
        ask: 4,
        volatile: 5,
        oi: 6,
      }
    },
    {
      puts: {
        last: 10,
        theta: 20,
        bid: 30,
        ask: 40,
        volatile: 50,
        oi: 60,
      },
      strike: 170,
      calls: {
        last: 10,
        theta: 20,
        bid: 30,
        ask: 40,
        volatile: 50,
        oi: 60,
      }
    },
    {
      puts: {
        last: 100,
        theta: 200,
        bid: 300,
        ask: 400,
        volatile: 500,
        oi: 600,
      },
      strike: 180,
      calls: {
        last: 100,
        theta: 200,
        bid: 300,
        ask: 400,
        volatile: 500,
        oi: 600,
      }
    }
  ]

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.stockTicker = params["name"];
      }
    )
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Berza', routerLink: ['/stocks-table']},
      {label: 'Opcije', routerLink: [`/stock-options/${this.stockTicker}`]}
    ];

    this.stockService.getOptionsDates().subscribe({
      next: value => {
        this.dates = value;
      },
      error: err => {
        console.error(err);
      }
    });

  }

  // TODO: dohvatiti informacije o akciji po ticker-u
  getByTickerName() {

  }


}
