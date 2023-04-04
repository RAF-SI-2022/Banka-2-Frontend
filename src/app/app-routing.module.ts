import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/sprint1/login/login.component";
import { UsersComponent } from './components/sprint1/users/users.component';
import {HomeComponent} from "./components/sprint1/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import { ProfileComponent } from './components/sprint1/profile/profile.component';
import { ForgotPasswordComponent } from './components/sprint1/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/sprint1/page-not-found/page-not-found.component';
import { PageForbidenComponent } from './components/sprint1/page-forbiden/page-forbiden.component';
import { NotAuthorisedGuard } from './guards/not.authorised.guard';
import {ChangePasswordComponent} from "./components/sprint1/change-password/change-password.component";
import {StocksComponent} from "./components/sprint2/stocks/stocks-table/stocks.component";
import { ForexComponent } from './components/sprint2/forex/forex.component';
import { BuysellComponent } from './components/sprint2/buysell/buysell.component';
import {StockOptionsComponent} from "./components/sprint2/stocks/stock-options/stock-options.component";
import { PurchasesComponent } from './components/sprint2/purchases/purchases.component';
import {FuturesComponent} from "./components/sprint2/futures/futures-component/futures.component";
import {SingleFutureTableComponent} from "./components/sprint2/futures/single-future-table/single-future-table.component";
import { StockSellTableComponent } from './components/sprint2/stocks/stock-sell-table/stock-sell-table.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "login", redirectTo: ""
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard, NotAuthorisedGuard]
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
    component: ChangePasswordComponent
  },
  {
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'forex',
    component: ForexComponent
  },
   {
    path: "buysell",
    component: BuysellComponent
  },
  {
    path: "purchases",
    component: PurchasesComponent
  },
  {
    path: "stock-options/:name",
    component: StockOptionsComponent
  },
  {
    path: "stocks-table/sell",
    component: StockSellTableComponent
  },
  {
    path: "futures",
    component: FuturesComponent
  },
  {
    path: "future/:name",
    component: SingleFutureTableComponent
  },
  {
    path: '**', redirectTo: '404-not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
