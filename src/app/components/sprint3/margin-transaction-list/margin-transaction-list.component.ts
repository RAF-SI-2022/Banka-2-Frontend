import { Component } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { MarginTransactions } from 'src/app/models/stock-exchange.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-margin-transaction-list',
  templateUrl: './margin-transaction-list.component.html',
  styleUrls: ['./margin-transaction-list.component.css']
})
export class MarginTransactionListComponent {
  visible: boolean = false;

  data:MarginTransactions[];

  constructor(private toastr: ToastrService,private  stockService: StockService ) {

  }

  ngOnInit(){
    this.getMarginTransactions();
  }

  
  private getMarginTransactions(): void {

    this.stockService.getMarginTransactions()
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
