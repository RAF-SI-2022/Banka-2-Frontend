import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../../models/stock-exchange.model";
import {StockService} from 'src/app/services/stock.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent {
  @Output() stockBuyEmitter = new EventEmitter<any>();


  buyStockForm: FormGroup;
  buyStockVisible: boolean = false;
  stock: Stock;
  isFormValid = false;


//TODO:pokupiti limit od usera i stock name iz stocka
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
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
      this.stockService.buyStock(
        this.stock.symbol,
        this.buyStockForm.get('kolicina')?.value,
        this.buyStockForm.get('limit')?.value,
        this.buyStockForm.get('stop')?.value,
        this.buyStockForm.get('allOrNone')?.value,
        this.buyStockForm.get('margin')?.value
      ).subscribe({
        next: val => {
          this.stockBuyEmitter.emit(this.stock.symbol);

        },
        error: err => {
          this.toastr.error("Greska pri prodaji")
          this.buyStockVisible = false
        }
      });
      this.resetForm()

    }
  }

  setBuyStockVisible() {
    this.buyStockVisible = true;
  }

  resetForm() {
    this.buyStockForm.get('kolicina')?.reset();
    this.buyStockForm.get('stop')?.reset();
    this.buyStockForm.get('limit')?.reset();
    this.buyStockForm.get('allOrNone')?.reset();
    this.buyStockForm.get('margin')?.reset();
  }


}
