import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Future, Stock, Order} from "../../../../models/stock-exchange.model";
import {StockService} from "../../../../services/stock.service";
import {TransactionsArrayService} from "../../../../services/transactions-array.service";
import { ToastrService } from 'ngx-toastr';

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


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, 
    private stockService: StockService, private transactionService: TransactionsArrayService) {
    this.sellFutureForm = this.formBuilder.group({
      price: [null, Validators.required],
    });

    this.sellFutureForm.valueChanges.subscribe(() => {
      this.isFormValid = this.sellFutureForm.valid;
    });
  }

  resetForm() {
    this.sellFutureForm.setValue({
      price: [null, Validators.required]
    })
  }

  open() {
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
          let tempOrder: Order = {
            symbol: this.future.futureName, // futureName
            tradeType: "SELL", //KUPLJENO Provalimo iz poziva
            orderType: "FUTURE CONTRACT",  //FUTURE provalimo iz poziva
            amount: this.future.contractSize,  //contractSize
            price: this.future.maintenanceMargin, // maintenanceMargin
            status: "NA CEKANJU",  //NA CEKANJU
            lastModified: this.future.settlementDate.toString(), //settlementDate
          }
          console.log(tempOrder)
          this.transactionService.addTransactions(tempOrder)
          this.futureSoldEmitter.emit(this.future.id);
          this.sellFutureVisible = false;
          this.toastr.info("Terminski ugovor uspesno stavljen na prodaju")
        },
        error: err => {
          // console.log(err);
          this.toastr.error(err.error)

        }
      })

    }
    this.sellFutureForm.reset();
  }
}
