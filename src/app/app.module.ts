import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from "primeng/button";
import { AppRoutingModule } from './app-routing.module';
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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ActivityPipe } from './pipes/activity-pipe.pipe';
import { EditUserComponent } from './components/edit-user/edit-user.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ActivityPipe,
    EditUserComponent
  ],
  imports: [
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
    DropdownModule,
    FormsModule
  ],
  // exports: [
  //   ActivityPipe
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
