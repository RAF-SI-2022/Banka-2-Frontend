import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Future, Stock} from "../../../../models/stock-exchange.model";
import {StockService} from "../../../../services/stock.service";

@Component({
  selector: 'app-sell-future',
  templateUrl: './sell-future.component.html',
  styleUrls: ['./sell-future.component.css']
})
export class SellFutureComponent {

  @Output() futureSoldEmitter = new EventEmitter<any>();

  sellFutureForm: FormGroup;
  sellFutureVisible: boolean = false;
  future: Future;
  isFormValid: boolean = true;


  constructor(private formBuilder: FormBuilder, private stockService: StockService) {
    this.sellFutureForm = this.formBuilder.group({
      price: [null , Validators.required],
    });

    this.sellFutureForm.valueChanges.subscribe(() => {
      this.isFormValid = this.sellFutureForm.valid;
    });
  }

  open(){
    this.sellFutureVisible = true
    this.sellFutureForm.patchValue({
      price: this.future.maintenanceMargin
    })
  }

  submitSellFuture() {
    
    console.log(this.future);
    
    console.log(          
      this.future.id,
      this.future.futureName,
      "SELL",
      this.sellFutureForm.get('price')?.value,
      0,
      0);
    

    if (this.sellFutureForm.valid) {

        this.stockService.sellFuture(
          this.future.id,
          this.future.futureName,
          "SELL",
          this.sellFutureForm.get('price')?.value,
          0,
          0
        ).subscribe({
          next: val => {
            this.futureSoldEmitter.emit(this.future.id);
            this.sellFutureVisible = false;
          },
          error: err => {
            console.log(err);
            
          }
        })

      }
      this.sellFutureForm.reset();
  }
}
