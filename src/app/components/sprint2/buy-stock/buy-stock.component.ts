import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent {

  buyStockForm: FormGroup;
  buyStockVisible: boolean = false;
//TODO:pokupiti limit od usera i stock name iz stocka
  constructor(private formBuilder: FormBuilder) {
    this.buyStockForm = this.formBuilder.group({
      stockName: ['', Validators.required],
      kolicina: [0, Validators.required],
      limit: [0, Validators.required],
      stop: [0, Validators.required],
      allOrNone: false,
      margin: false
    })
  }

  submitBuyStock(){
    alert("buy");
  }

  setBuyStockVisible(){
    this.buyStockVisible = true;
  }

}
