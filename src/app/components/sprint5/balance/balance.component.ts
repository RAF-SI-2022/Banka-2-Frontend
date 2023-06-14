import { Component, ViewChild } from '@angular/core';
import { AddAccountComponent } from '../add-account/add-account.component';
import { Router } from '@angular/router';
import {AddUserAccountComponent} from "../../add-user-account/add-user-account.component";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  // @ViewChild(AddAccountComponent, {static: true}) addAccountComponent: AddAccountComponent
  @ViewChild(AddUserAccountComponent, {static: true}) addUserAccountComponent: AddUserAccountComponent


  accounts: any[] = [];


  constructor(private router: Router){

  }

  addAccount() {
    this.accounts.push();
  }


  openLocalBalance(account: any){
    console.log(account)
  }

  showAddAccountTest(){
    // this.addAccountComponent.addAccountVisible = true;
    this.addUserAccountComponent.visible = true;
  }

  showAddAccount(){
    // this.router.navigate(['create-user-account']);
    this.addUserAccountComponent.visible = true;
  }

  submitAddAccount(obj: any){
    const account = {
      currency: {
        name: obj.value.currencyMain.name,
        key: obj.value.currencyMain.key
      },
      accountType: {
        name: obj.value.accountType.name,
        key: obj.value.accountType.key
      }
    };



    this.accounts.push(account);
  }

}
