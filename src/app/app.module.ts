import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from "primeng/button";
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from "primeng/card";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MultiSelectModule} from 'primeng/multiselect';
import {SkeletonModule} from 'primeng/skeleton';
import {InputSwitchModule} from 'primeng/inputswitch';



import { LoginComponent } from './components/sprint1/login/login.component';
import { UsersComponent } from './components/sprint1/users/users.component';
import { ActivityPipe } from './pipes/activity-pipe.pipe';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import { HomeComponent } from './components/sprint1/home/home.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { AddUserComponent } from './components/sprint1/add-user/add-user.component';
import { EditUserComponent } from './components/sprint1/edit-user/edit-user.component';
import { ProfileComponent } from './components/sprint1/profile/profile.component';
import { ForgotPasswordComponent } from './components/sprint1/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/sprint1/page-not-found/page-not-found.component';
import {SidebarModule} from "primeng/sidebar";
import { PageForbidenComponent } from './components/sprint1/page-forbiden/page-forbiden.component';
import { ChangePasswordComponent } from './components/sprint1/change-password/change-password.component';
import { StocksComponent } from './components/sprint2/stocks/stocks.component';
import { ChangePercPipe } from './pipes/change-perc.pipe';
import { StockDetailsComponent } from './components/sprint2/stock-details/stock-details.component';
import {ChartModule} from "primeng/chart";
import {DividerModule} from "primeng/divider";
import { BuysellComponent } from './components/sprint2/buysell/buysell.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {StyleClassModule} from "primeng/styleclass";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ActivityPipe,
    HomeComponent,
    AddUserComponent,
    EditUserComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    PageForbidenComponent,
    ChangePasswordComponent,
    StocksComponent,
    ChangePercPipe,
    StockDetailsComponent,
    BuysellComponent,

  ],
  imports: [
    InputNumberModule,
    SelectButtonModule,
    MultiSelectModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InputTextModule,
    RippleModule,
    CheckboxModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    DropdownModule,
    TableModule,
    FormsModule,
    BreadcrumbModule,
    SkeletonModule,
    ToastrModule.forRoot(),
    SidebarModule,
    ChartModule,
    DividerModule,
    InputSwitchModule,
    StyleClassModule
  ],
  // exports: [
  //   ActivityPipe
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
