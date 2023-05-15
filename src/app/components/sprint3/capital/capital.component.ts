import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Currency, Order } from 'src/app/models/stock-exchange.model';
import { Balance } from 'src/app/models/stock-exchange.model';
import { DepositWithdrawCapitalComponent } from '../deposit-withdraw-capital/deposit-withdraw-capital.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Router } from '@angular/router';
import { MarginTransactionListComponent } from '../margin-transaction-list/margin-transaction-list.component';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';
import { Permission, User } from 'src/app/models/users.model';
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

  futureContracts: any[] = [];

  specialOrders: Order[]

  capitalOverview: any[] = [];

  capitalTableValues: string[];

  status!: any[];

  totalContracts: number;
  totalOrders: number;

  balance: Balance[]

  myOrders: any[] = [];

  per: Permission[] =[{
  id: 0,
  permissionName: ""
  }]

  user: User

  defaultLimit: number = 0;

  currentDailyLimit: number = 0;

  cur: Currency ={
    currencyCode: "",
    currencyName: "",
    currencySymbol: "",
     polity: ""
   }

  newselectedBalance: Balance =
    {  amount: 0,
       currency: this.cur,
      free: 0,
      id: 0,
      reserved: 0,}

  constructor(private router: Router,private toastr: ToastrService, private  stockService: StockService, private userService: UserService, ) {

  }

  @ViewChild(DepositWithdrawCapitalComponent, {static: true}) depositWithdrawCapitalComponent: DepositWithdrawCapitalComponent
  @ViewChild(TransactionListComponent, {static: true}) transactionListComponent: TransactionListComponent
  @ViewChild(MarginTransactionListComponent, {static: true}) marginTransactionListComponent: MarginTransactionListComponent

  ngOnInit() {

    this.getUser()


    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kapital', routerLink: ['/capital']}
    ];


    // console.log(this.totalContracts)

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
        this.balance = val
        this.newselectedBalance = this.balance[1]//0 za dinarski 1 za dolarski
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
          this.defaultLimit = this.user.defaultDailyLimit
          this.currentDailyLimit = this.user.dailyLimit
          // this.getDefaultLimit(this.user?.id)
          this.getBalanceFromBack()
          this.getMyFutures();
          this.getMyOrders();
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

  getDefaultLimit(id: number){
    this.userService.getUserDefaultDailyLimit(id).subscribe({
      next: val => {
        this.defaultLimit = val;
      }
    })
  }

  getMyFutures(){

    // TODO ova ruta ne postoji sta ti treba?
    this.stockService.getFuturesByUserId(this.user?.id).subscribe({
      next: val => {
        this.futureContracts = val;

        this.totalContracts = this.futureContracts.reduce((accumulator, contract) => {
          return accumulator + contract.maintenanceMargin;
        }, 0);

        const el =  { type: 'FUTURE_UGOVOR', total: this.totalContracts }

        this.capitalOverview.push(el)

      }
      , error: err => {
        this.toastr.error(err)
      }
    })
  }

  getMyOrders(){

    this.stockService.getMyStocks()
      .subscribe({
        next: val => {


          this.myOrders = val

          this.totalOrders = this.myOrders.reduce((accumulator, order) => {
            return accumulator + order.amount;
          }, 0);


          const el =  { type: 'AKCIJA', total: this.totalOrders }

          this.capitalOverview.push(el)


        },
        error: err => {
          // console.log(err)
          this.toastr.error(err.error)
        }
      })
  }

  roundNumber(num: number){
    return Math.round(num * 10) / 10
    // Math.round((num + Number.EPSILON) * 100) / 100
  }

}

