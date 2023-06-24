import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/sprint1/login/login.component";
import {UsersComponent} from './components/sprint1/users/users.component';
import {HomeComponent} from "./components/sprint1/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import {ProfileComponent} from './components/sprint1/profile/profile.component';
import {ForgotPasswordComponent} from './components/sprint1/forgot-password/forgot-password.component';
import {PageNotFoundComponent} from './components/sprint1/page-not-found/page-not-found.component';
import {PageForbidenComponent} from './components/sprint1/page-forbiden/page-forbiden.component';
import {NotAuthorisedGuard} from './guards/not.authorised.guard';
import {ChangePasswordComponent} from "./components/sprint1/change-password/change-password.component";
import {StocksComponent} from "./components/sprint2/stocks/stocks-table/stocks.component";
import {ForexComponent} from './components/sprint2/forex/forex.component';
import {BuysellComponent} from './components/sprint2/buysell/buysell.component';
import {StockOptionsComponent} from "./components/sprint2/stocks/stock-options/stock-options.component";
import {PurchasesComponent} from './components/sprint2/purchases/purchases.component';
import {FuturesComponent} from "./components/sprint2/futures/futures-component/futures.component";
import {SingleFutureTableComponent} from "./components/sprint2/futures/single-future-table/single-future-table.component";
import {StockSellTableComponent} from './components/sprint2/stocks/stock-sell-table/stock-sell-table.component';
import { CapitalComponent } from './components/sprint3/capital/capital.component';
import { FutureContractComponent } from './components/sprint3/future-contract/future-contract.component';
import { MyStockOptionsComponent } from './components/sprint3/my-stock-options/my-stock-options.component';
import { AgentsComponent } from './components/sprint3/agents/agents.component';
import {CompaniesComponent} from "./components/sprint4/companies/companies.component";
import {CompanyDetailsComponent} from "./components/sprint4/company-details/company-details.component";
import { SingleContractComponent } from './components/sprint4/single-contract/single-contract.component';
import { RegisterComponent } from './components/newSpec/register/register.component';
import { TransactionElementCreationComponent } from './components/sprint4/transaction-element-creation/transaction-element-creation.component';
import { BalanceComponent } from './components/sprint5/balance/balance.component';
import { PaymentsComponent } from './components/sprint5/payments/payments.component';
import { ClientGuard} from "./guards/client.guard";
import {ClientOnlyGuard} from "./guards/client-only.guard";
import {UserBalanceComponent} from "./components/sprint5/user-balance/user-balance.component";
import { LoanComponent } from './components/sprint5/loan/loan.component';

const routes: Routes = [
  {
    path: "",
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "login", redirectTo: ""
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard, NotAuthorisedGuard, ClientGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "403-forbiden",
    component: PageForbidenComponent
  },
  {
    path: "404-not-found",
    component: PageNotFoundComponent
  },
  {
    path: 'auth/change-password',
    component: ChangePasswordComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'stocks',
    component: StocksComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: 'forex',
    component: ForexComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "buysell",
    component: BuysellComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "purchases",
    component: PurchasesComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "stock-options/:name",
    component: StockOptionsComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "my-stock-options/:name",
    component:MyStockOptionsComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "stocks-table/sell",
    component: StockSellTableComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "futures",
    component: FuturesComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "future/:name",
    component: SingleFutureTableComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "capital",
    component: CapitalComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "future-contract",
    component: FutureContractComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "agents",
    component: AgentsComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "companies",
    component: CompaniesComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "company/:id",
    component: CompanyDetailsComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: "login-admin",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'company/:companyId/contract/:contractId',
    component: SingleContractComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: 'transaction/element',
    component: TransactionElementCreationComponent,
    canActivate: [AuthGuard, ClientGuard]
  },
  {
    path: 'balance',
    component: BalanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthGuard, ClientOnlyGuard]
  },
  {
    path: 'user-balance',
    component: UserBalanceComponent,
    canActivate: [ClientOnlyGuard]
  },
  {
    path: 'loans',
    component: LoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '404-not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
