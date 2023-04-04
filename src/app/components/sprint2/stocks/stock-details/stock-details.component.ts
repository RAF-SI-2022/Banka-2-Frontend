import {Component, ViewChild} from '@angular/core';
import {Stock, StockDetails, StockHistory} from 'src/app/models/stock-exchange.model';
import {UIChart} from "primeng/chart";
import {StockService} from "../../../../services/stock.service";
import {error} from "cypress/types/jquery";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {

  displayDetails: boolean = false
  stock: Stock
  stockDetails: StockDetails
  basicData: any;
  basicOptions: any;
  variable = true;
  periodOptions: any[];
  selectedPeriodOption: any
  exchangeActive: boolean = false;

  @ViewChild('chart') chart: UIChart;

  constructor(private stockService: StockService, private toaster: ToastrService) {
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'High',
          data: [],
          fill: {
            target: 'origin',
            above: 'rgba(135,236,122,0.29)',   // Area will be red above the origin
          },
          borderColor: '#7fc418',
          tension: .3,
          pointRadius: 1,
          pointHoverRadius: 10,
        }
      ]
    };

    this.applyTheme();

    this.periodOptions = [
      {period: '1d', value: "ONE_DAY"},
      {period: '5d', value: "FIVE_DAYS"},
      {period: '1m', value: "ONE_MONTH"},
      {period: '6m', value: "SIX_MONTHS"},
      {period: '1y', value: "ONE_YEAR"},
      {period: 'ytd', value: "YTD"}
    ];
    this.selectedPeriodOption = this.periodOptions[0]
  }

  getStockDetails(id: number) {
    this.stockService.getStockDetails(id)
      .subscribe({
          next: value => {
            this.stockDetails = value;

            this.stockService.getExchangeStatus(value.exchange.micCode)
              .subscribe({
                next: value1 => {
                  this.exchangeActive = value1;
                },
                error: err => {
                  console.log(err)
                }
              });
          },
          error: err => {
            console.log(err)
          }
        }
      )
  }

  getStockGraph(id: number, type: string) {
    console.log("TYPE" + type)
    this.stockService.getStockGraph(id, type)
      .subscribe({
          next: value => {
            this.basicData.labels = value.map((obj: StockHistory) => new Date(obj.onDate).toLocaleDateString('en-GB'));
            this.basicData.datasets[0].data = value.map((obj: StockHistory) => obj.highValue);
            this.chart.refresh();
          },
          error: err => {
            if(err.error.status === 429) {
              this.toaster.warning("Sačekajte par sekundi pre sledeće promene perioda.")
            }
          }
        }
      )
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

  applyTheme() {
    this.basicOptions = {
      plugins: {
        tooltip: {
          mode: 'nearest',
          intersect: false
        },
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 66
            }
          }
        },
      },
      scales: {
        x: {
          ticks: {
            autoskip: true,
            maxTicksLimit: 20,
            color: '#495057',
            font: {
              size: 14,
              family: "'Segoe UI', sans-serif"
            }
          },
          grid: {
            color: '#ebedef',


          }
        },
        y: {
          ticks: {
            color: '#495057',
            font: {
              size: 12,
              family: "'Segoe UI', sans-serif"
            }
          },
          grid: {
            color: '#ebedef'
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutCubic'
      }
    };
  }

  updateChart(obj: any) {
    this.getStockGraph(this.stock.id, obj.value.value);
  }

  resetPeriodOption() {
    this.selectedPeriodOption = this.periodOptions[0]
  }

}
