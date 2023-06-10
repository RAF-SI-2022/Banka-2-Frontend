import { Component } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { MarginTransaction } from 'src/app/models/stock-exchange.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-margin-transaction-list',
  templateUrl: './margin-transaction-list.component.html',
  styleUrls: ['./margin-transaction-list.component.css']
})
export class MarginTransactionListComponent {
  visible: boolean = false;

  data:MarginTransaction[];

  constructor(private toastr: ToastrService,private stockService: StockService ) {

  }

  ngOnInit(){

  }

  open(type: string) {
    this.getMarginTransactions(type);
  }

  private getMarginTransactions(type: string): void {

    this.stockService.getMarginTransactions(type)
    .subscribe({
      next: val => {
        this.data = val;
      },
      error: err =>{
        this.toastr.error(err.error)
      }
    })

  }
}
