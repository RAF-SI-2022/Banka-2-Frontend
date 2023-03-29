import {Component, ViewChild} from '@angular/core';
import { Stock } from 'src/app/models/stock-exchange.model';
import {UIChart} from "primeng/chart";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {

  displayDetails : boolean = false
  stock: Stock
  basicData: any;
  basicOptions: any;
  variable = true;
  periodOptions: any[];
  selectedPeriodOption: any

  @ViewChild("chart") chart: UIChart;

  constructor() {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
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
      {period: '1d'},
      {period: '5d'},
      {period: '1m'},
      {period: '6m'},
      {period: '1y'},
      {period: 'ytd'}
    ];
    this.selectedPeriodOption = this.periodOptions[0]
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
        duration: 1000,
        easing: 'easeInOutCubic'
      }
    };
  }

  updateChart() {
    console.log(this.selectedPeriodOption)
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [22, 66, 44, 33, 88, 22, 66],
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
  }

  resetPeriodOption() {
    this.selectedPeriodOption = this.periodOptions[0]
  }

}
