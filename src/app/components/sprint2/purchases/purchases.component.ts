import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Order, Type} from 'src/app/models/stock-exchange.model';
import {TransactionsArrayService} from "../../../services/transactions-array.service";
import { StockService } from 'src/app/services/stock.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

  breadcrumbItems: MenuItem[];

  specialOrders: Order[]

  orders: Order[]

  temp: Order



  loading: boolean = true;

  status!: any[];

  constructor(private transactionService: TransactionsArrayService,private toastr: ToastrService , private  stockService: StockService) {

  }


  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Porudžbine', routerLink: ['/purchases']}
    ];

    this.status = [
      {label: 'Sve', value: ''},
      {label: 'Završene', value: 'ZAVRSENA'},
      {label: 'U toku', value: 'U TOKU'},
      {label: 'Odbijene', value: 'ODBIJENA'},
      {label: 'Na čekanju', value: 'NA CEKANJU'}
    ]

    this.specialOrders = this.transactionService.getTransactions()
    this.getOrdersFromBack()
  }

  private getOrdersFromBack(): void {
    this.stockService.getAllOrders().subscribe({
      next: val => {
        this.orders=val
        //stara logika
        //this.orders = this.orders.concat(this.specialOrders)
        //console.log(this.orders)

        for(var o in this.orders)
        {
          if(this.orders[o].status==='WAITING'){
            this.orders[o].status='NA CEKANJU'
          }
          if(this.orders[o].status==='DENIED'){
            this.orders[o].status='ODBIJENA'
          }
          if(this.orders[o].status==='IN_PROGRESS'){
            this.orders[o].status='U TOKU'
          }
          if(this.orders[o].status==='COMPLETE'){
            this.orders[o].status='ZAVRSENA'
          }
        }
      },
      error: err =>{
        this.toastr.error(err.error)
      }

    });
  }

  approveTransaction(id :string){
    this.stockService.approveOrder(id)
    .subscribe({
      next: val => {
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });
  }

  declineTransaction(id :string){
    this.stockService.declineOrder(id)
    .subscribe({
      next: val => {
        
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });

  }

}
