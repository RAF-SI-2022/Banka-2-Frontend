import { Component } from '@angular/core';
import { Stock } from 'src/app/models/stock-exchange.model';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {

  displayDetails:boolean = false

  stock: Stock

}
