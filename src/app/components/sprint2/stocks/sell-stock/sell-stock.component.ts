import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {Stock} from 'src/app/models/stock-exchange.model';
import {StockService} from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent {
  @Output() stockSellEmitter = new EventEmitter<any>();


  sellStockForm: FormGroup;
  sellStockVisible: boolean = false;
  stock: Stock;
  isFormValid = false;

  userId: number;


  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService, private userServ: UserService) {
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
    this.getUserData()
  }

  getUserData(){
    this.userServ.getUserData()
    .subscribe({
      next: val=>{
        this.userId = val.id
      },
      error: err=>{
        this.toastr.error(err.error)
      }
    })

  }

  submitSellStock() {
    console.log(this.userId);

    if (this.sellStockForm.valid) {
      this.stockService.sellStock(
        this.stock.symbol,
        this.sellStockForm.get('kolicina')?.value,
        this.sellStockForm.get('limit')?.value,
        this.sellStockForm.get('stop')?.value,
        this.sellStockForm.get('allOrNone')?.value,
        this.sellStockForm.get('margin')?.value,
        this.userId
      ).subscribe({
        next: val => {
          this.stockSellEmitter.emit(this.stock.symbol);

        },
        error: err => {
          this.toastr.error(err.error)
          this.sellStockVisible = false;
        }
      });
      this.resetForm()
    }
  }

  setSellStockVisible() {
    this.sellStockVisible = true;
  }

  resetForm() {
    this.sellStockForm.get('kolicina')?.reset();
    this.sellStockForm.get('stop')?.reset();
    this.sellStockForm.get('limit')?.reset();
    this.sellStockForm.get('allOrNone')?.reset();
    this.sellStockForm.get('margin')?.reset();
  }

}
