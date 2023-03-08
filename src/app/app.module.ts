import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from "primeng/button";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login-component/login.component';
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
