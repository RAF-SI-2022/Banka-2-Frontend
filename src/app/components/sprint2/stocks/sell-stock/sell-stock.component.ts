import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Stock} from 'src/app/models/stock-exchange.model';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent {

  sellStockForm: FormGroup;
  sellStockVisible: boolean = false;
  stock: Stock;
  isFormValid = false;


  constructor(private formBuilder: FormBuilder) {
    this.sellStockForm = this.formBuilder.group({
      kolicina: [null, Validators.required],
      limit: [null, Validators.required],
      stop: [null, Validators.required],
      allOrNone: false,
      margin: false
    });

    this.sellStockForm.valueChanges.subscribe(() => {
      this.isFormValid = this.sellStockForm.valid;
    });
  }

  submitSellStock() {
    if (this.sellStockForm.valid) {
      alert("buy");
      this.sellStockForm.reset();

    }
  }

  setSellStockVisible() {
    this.sellStockVisible = true;
  }

}
