import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Future} from "../../../../models/stock-exchange.model";
import {StockService} from "../../../../services/stock.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-buy-future-with-limit',
  templateUrl: './buy-future-with-limit.component.html',
  styleUrls: ['./buy-future-with-limit.component.css']
})
export class BuyFutureWithLimitComponent {

  @Output() futureBuyEmitter = new EventEmitter<any>();

  buyFutureForm: FormGroup;
  buyFutureVisible: boolean = false;
  futureName: string;
  numOfZerosValid: boolean = false;
  userId: string

  constructor(private formBuilder: FormBuilder, private stockService: StockService, private toastr: ToastrService) {
    this.buyFutureForm = this.formBuilder.group({
      limit: 0,
      stop: 0
    });

    this.buyFutureForm.valueChanges.subscribe(() => {
      const numOfZeros = Object.values(this.buyFutureForm.value)
        .filter(val => val === 0)
        .length;

      this.numOfZerosValid = numOfZeros !== 2;
    });
  }

  resetForm() {
    this.buyFutureForm.setValue({
      limit: 0,
      stop: 0
    })
  }

  submitBuyFuture() {
    this.stockService.buyFuture(
      this.userId,
      this.futureName,
      "BUY",
      0,
      this.buyFutureForm.get('limit')?.value,
      this.buyFutureForm.get('stop')?.value
    ).subscribe({
      next: val => {
        this.toastr.info("Terminski ugovor je uspešno stavljen na čekanje.")
        this.futureBuyEmitter.emit(this.futureName);
      },
      error: err => {
        if (err.error.text === 'Future is set for custom sale and is waiting for trigger') {
          this.toastr.info("Terminski ugovor je uspešno stavljen na čekanje.")
          this.futureBuyEmitter.emit(this.futureName);
        } else {
          this.toastr.error("Greška pri kupovini.")
        }

      }
    });
  }
}
