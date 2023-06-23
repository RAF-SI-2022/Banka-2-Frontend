import { Component , EventEmitter, Output} from '@angular/core';
import { Client, ForeignAccount } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-single-user-balance',
  templateUrl: './single-user-balance.component.html',
  styleUrls: ['./single-user-balance.component.css']
})
export class SingleUserBalanceComponent {

  @Output() editBalanceNameEmitter = new EventEmitter<any>();
  singleUserBalance = false;
 // balance 
  account: any;
  client: Client;
  name: string;

  constructor(private clientService: ClientService) {
  }


  open(account: any) {
    this.singleUserBalance = true
    this.account = account;
    this.clientService.getClientById(this.account.ownerId).subscribe({
      next: value => {
        this.client = value;
        this.name = this.client.name+ " " + this.client.lastname
      },
      error: err => {
      }
    })
  }

  submitEditBalanceName(){
    //DOO
    this.editBalanceNameEmitter.emit(this.account)
  }

}
