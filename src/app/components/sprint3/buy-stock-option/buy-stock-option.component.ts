import {Component, EventEmitter, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StockService} from "../../../services/stock.service";
import {Option} from "../../../models/stock-exchange.model";

@Component({
  selector: 'app-buy-stock-option',
  templateUrl: './buy-stock-option.component.html',
  styleUrls: ['./buy-stock-option.component.css']
})
export class BuyStockOptionComponent {

  @Output() buyOptionEvent = new EventEmitter<any>();

  buyOptionVisible: boolean = false;
  buyOptionForm: FormGroup;
  isFormValid = false;
  stockOption: Option

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.buyOptionForm = this.formBuilder.group({
      kolicina: [null, Validators.required]
    });

    this.buyOptionForm.valueChanges.subscribe(() => {
      this.isFormValid = this.buyOptionForm.valid;
    });
  }

  resetForm() {

  }

  submitBuyOption() {

    const amount = this.buyOptionForm.get('kolicina')?.value;

    if(amount > this.stockOption.openInterest) {
      this.toastr.error(`Nema dovoljno opcija na stanju. Količina na stanju: ${this.stockOption.openInterest}`)
      return;
    }

    const option = {
      optionId: this.stockOption.id,
      amount: amount,
      premium: this.stockOption.strike * 1.4
    }

    this.buyOptionEvent.emit(option)
  }

}
