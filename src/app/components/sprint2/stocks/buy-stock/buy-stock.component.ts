import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../../models/stock-exchange.model";

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent {

  buyStockForm: FormGroup;
  buyStockVisible: boolean = false;
  stock: Stock;
  isFormValid = false;


//TODO:pokupiti limit od usera i stock name iz stocka
  constructor(private formBuilder: FormBuilder) {
    this.buyStockForm = this.formBuilder.group({
      kolicina: [null, Validators.required],
      limit: [null, Validators.required],
      stop: [null, Validators.required],
      allOrNone: false,
      margin: false
    });

    this.buyStockForm.valueChanges.subscribe(() => {
      this.isFormValid = this.buyStockForm.valid;
    });
  }

  submitBuyStock() {
    if (this.buyStockForm.valid) {
      alert("buy");
      this.buyStockForm.reset();

    }
  }

  setBuyStockVisible() {
    this.buyStockVisible = true;
  }


}
