import {Component, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Order, Type} from 'src/app/models/stock-exchange.model';
import {TransactionsArrayService} from "../../../services/transactions-array.service";
import { StockService } from 'src/app/services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/users.model';
import {Paginator} from "primeng/paginator";
import {Table} from "primeng/table";


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

  breadcrumbItems: MenuItem[];

  specialOrders: Order[]

  orders: Order[]

  ordersID: Order[]

  temp: Order

  currentPage: any

  loading: boolean = true;

  status!: any[];

  user: User

  @ViewChild('dt') dt: Table;
  @ViewChild('paginator', { static: true }) paginator?: Paginator;

  constructor(private transactionService: TransactionsArrayService,private toastr: ToastrService , private  stockService: StockService, private userService: UserService) {

  }

  ngOnInit() {

    this.getUser()

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


  private getOrdersFromBackbyID(): void {
    this.stockService.getAllOrdersByUserId(this.user?.id).subscribe({
      next: val => {
        this.ordersID=val
        //stara logika
        //this.orders = this.orders.concat(this.specialOrders)
        console.log(this.ordersID)

        for(var o in this.ordersID)
        {
          if(this.ordersID[o].status==='WAITING'){
            this.ordersID[o].status='NA CEKANJU'
          }
          if(this.ordersID[o].status==='DENIED'){
            this.ordersID[o].status='ODBIJENA'
          }
          if(this.ordersID[o].status==='IN_PROGRESS'){
            this.ordersID[o].status='U TOKU'
          }
          if(this.ordersID[o].status==='COMPLETE'){
            this.ordersID[o].status='ZAVRSENA'
          }
        }
      },
      error: err =>{
        this.toastr.error(err.error)
      }

    });


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

  getPermission(): boolean {
    if (localStorage.getItem("remember") !== null) {
        if ((localStorage.getItem("permissions")?.includes("CREATE_USERS") && localStorage.getItem("permissions")?.includes("READ_USERS") && localStorage.getItem("permissions")?.includes("DELETE_USERS") && localStorage.getItem("permissions")?.includes("UPDATE_USERS") ) || (localStorage.getItem("permissions")?.includes("ADMIN_USER")))
          return true
      } else {
        if ((sessionStorage.getItem("permissions")?.includes("CREATE_USERS") && sessionStorage.getItem("permissions")?.includes("READ_USERS") && sessionStorage.getItem("permissions")?.includes("DELETE_USERS") && sessionStorage.getItem("permissions")?.includes("UPDATE_USERS") ) || (sessionStorage.getItem("permissions")?.includes("ADMIN_USER")))
          return true
    }
    return false
  }


  approveTransaction(id :string){
    this.stockService.approveOrder(id)
    .subscribe({
      next: val => {
        console.log("KLIKNUT APPROVE")
        this.toastr.success("Porudzbina uspesno potvrdjena")
        this.getOrdersFromBack()
      },
      error: err => {
        this.toastr.error(err.error)
        console.log("PUCE KESA KUME")
        console.log(err)
      }
    });
  }

  declineTransaction(id :string){
    this.stockService.declineOrder(id)
    .subscribe({
      next: val => {
        this.toastr.success("Porudzbina uspesno odbijena")
        this.getOrdersFromBack()
        this.dt.first = this.currentPage * this.dt.rows
      },
      error: err => {
        this.toastr.error(err.error)
        console.log(err)
      }
    });

  }

  async getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          //TODO Porpaviti sinhronizaciju

          // this.getDefaultLimit(this.user?.id)
          this.getOrdersFromBackbyID()
        },
        error: err => {
          this.toastr.error(err.error)
          // console.log(err)
        }
      })
  }

  getAgentPerm():boolean{

    if (localStorage.getItem("remember") !== null) {
      if (localStorage.getItem("permissions")?.includes("UPDATE_USERS") && !localStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return true
    } else {
      if (sessionStorage.getItem("permissions")?.includes("UPDATE_USERS") && !sessionStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return true
    }
    return false
  }

  saveCurrentPage(event: any){
    this.currentPage = event.page || 0
  }

}
