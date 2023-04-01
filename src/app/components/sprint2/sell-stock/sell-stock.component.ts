import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent {

  sellStockForm: FormGroup;
  sellStockVisible: boolean = false;

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

  submitSellStock() {
    if (this.sellStockForm.valid) {
      alert("sell");
    } else {
      this.sellStockForm.markAllAsTouched();
      alert('Niste popunili sva polja!');
      //Nakon prvog izbacenog alerta , nastavlja da baca gresku jer je stockName jos uvek null

    }
  }

  setSellStockVisible(){
    this.sellStockVisible = true;
  }

}
