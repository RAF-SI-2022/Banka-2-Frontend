import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent {

  sellStockForm: FormGroup;
  sellStockVisible: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.sellStockForm = this.formBuilder.group({
      stockName: ['', Validators.required],
      kolicina: [0, Validators.required],
      limit: [0, Validators.required],
      stop: [0, Validators.required],
      allOrNone: false,
      margin: false
    })
  }

  submitSellStock(){
    alert("sell");
  }

  setSellStockVisible(){
    this.sellStockVisible = true;
  }

}
