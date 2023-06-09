import { Component, ViewChild } from '@angular/core';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  @ViewChild(AddAccountComponent, {static: true}) addAccountComponent: AddAccountComponent

  accounts: any[] = [];

  addAccount() {
    this.accounts.push();
  }


  openLocalBalance(account: any){
    console.log(account)
  }

  showAddAccount(){
    this.addAccountComponent.addAccountVisible = true;
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
