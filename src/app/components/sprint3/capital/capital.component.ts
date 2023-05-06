import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Order } from 'src/app/models/stock-exchange.model';
import { Balance } from 'src/app/models/stock-exchange.model';
import { DepositWithdrawCapitalComponent } from '../deposit-withdraw-capital/deposit-withdraw-capital.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Router } from '@angular/router';
import { MarginTransactionListComponent } from '../margin-transaction-list/margin-transaction-list.component';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/users.model';
import { ToastrService } from 'ngx-toastr';
/* Model za privremene podatke */
export interface TableData {
  valuta: string;
  ukupno: number;
  rezervisano: number;
  raspolozivo: number;
}


@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.css']
})
export class CapitalComponent  {


  dataset: TableData[] = [
    {valuta: "RSD", ukupno: 25, rezervisano: 10, raspolozivo: 15},
    {valuta: "USD", ukupno: 125, rezervisano: 100, raspolozivo: 25},
    {valuta: "EUR", ukupno: 251, rezervisano: 0, raspolozivo: 251},
    {valuta: "CHF", ukupno: 123, rezervisano: 123, raspolozivo: 0},
  ];


  breadcrumbItems: MenuItem[];

  specialOrders: Order[]

  capitalOverview: any;

  capitalTableValues: string[];

  status!: any[];

  balance: Balance[]

  user: User

  constructor(private router: Router,private toastr: ToastrService, private  stockService: StockService, private userService: UserService) {

  }

  @ViewChild(DepositWithdrawCapitalComponent, {static: true}) depositWithdrawCapitalComponent: DepositWithdrawCapitalComponent
  @ViewChild(TransactionListComponent, {static: true}) transactionListComponent: TransactionListComponent
  @ViewChild(MarginTransactionListComponent, {static: true}) marginTransactionListComponent: MarginTransactionListComponent




  ngOnInit() {

    this.getUser()

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Porudžbine', routerLink: ['/purchases']}
    ];


    this.capitalOverview = [
      { type: 'AKCIJA', total: '$0' },
      { type: 'FUTURE_UGOVOR', total: '$0' }
    ];

      this.capitalOverview = [
      { type: 'AKCIJA', total: '$0' },
      { type: 'FUTURE_UGOVOR', total: '$0' }
    ];

  }

  onCapitalRowClick(type: string) {
    if (type === 'AKCIJA') {
      this.router.navigate(['/stocks-table/sell']);
    } else if (type === 'FUTURE_UGOVOR') {
      this.router.navigate(['/future-contract']);
    }
  }

  toggleDepositWithdrawCapitalkDialog() {
    this.depositWithdrawCapitalComponent.visible=true;
  }

  toggleTransactionListDialog(event:string) {
    this.transactionListComponent.currencyCode = event;
    this.transactionListComponent.getUser();
    this.transactionListComponent.visible=true;
  }

  toggleMarginTransactionListDialog() {
    this.marginTransactionListComponent.visible=true;
  }

  private getBalanceFromBack(): void {

    this.stockService.getAllBalancesByUserId(this.user?.id)
    .subscribe({
      next: val => {
        this.balance=val
      },
      error: err =>{
        this.toastr.error(err.error)
      }
    })

  }

  refresh(s:string){
    this.getBalanceFromBack();
  }

  async getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          //TODO Porpaviti sinhronizaciju
          this.getBalanceFromBack()
        },
        error: err => {
          this.toastr.error(err.error)
          // console.log(err)
        }
      })
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

}

