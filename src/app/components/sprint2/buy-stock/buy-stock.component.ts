import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent {

  buyStockForm: FormGroup;
  buyStockVisible: boolean = true;
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

  submitBuyStock() {
    if (this.buyStockForm.valid) {
      alert("buy");
    } else {
      this.buyStockForm.markAllAsTouched();
      alert('Niste popunili sva polja!');
      //Nakon prvog izbacenog alerta , nastavlja da baca gresku jer je stockName jos uvek null

    }
  }

  setBuyStockVisible(){
    this.buyStockVisible = true;
  }

}
