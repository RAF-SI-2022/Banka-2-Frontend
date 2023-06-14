import {Component, ViewChild} from '@angular/core';
import {AddAccountComponent} from '../add-account/add-account.component';
import {Router} from '@angular/router';
import {AddUserAccountComponent} from "../add-user-account/add-user-account.component";
import {ClientService} from "../../../services/client.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/users.model";
import {UserService} from "../../../services/user-service.service";
import {error} from "cypress/types/jquery";
import {Client} from "../../../models/client.model";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  @ViewChild(AddUserAccountComponent, {static: true}) addUserAccountComponent: AddUserAccountComponent

  accounts: any[] = [];
  users: Client[] = [];
  selectedClient: Client;


  constructor(private router: Router, private clientService: ClientService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clientService.getAllClients().subscribe({
      next: value => {
        this.users = value;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addAccount() {
    this.accounts.push();
  }

  getAllAccounts(email: string) {
    this.clientService.getAccountsByClientEmail(email).subscribe({
      next: value => {
        console.log(value);
        this.accounts = value;
      },
      error: err => {

      }
    })
  }


  openLocalBalance(account: any) {
    console.log(account)
  }

  showAddAccountTest() {
    // this.addAccountComponent.addAccountVisible = true;
    this.addUserAccountComponent.visible = true;
  }

  showAddAccount() {
    // this.router.navigate(['create-user-account']);
    this.addUserAccountComponent.visible = true;
  }

  submitAddAccount(obj: any) {
    if (obj.type === 'Business') {
      this.clientService.openBusinessAccount(obj.value).subscribe({
          next: value => {
            this.selectedClient = obj.client;
            this.toastr.success(value);
            this.getAllAccounts(obj.client.email);
            this.addUserAccountComponent.close()
          },
          error: err => {
            this.toastr.error("Greška pri dodavanju računa");
          }
        }
      );
    } else if (obj.type === 'Local') {
      this.clientService.openLocalAccount(obj.value).subscribe({
          next: value => {
            this.selectedClient = obj.client;
            console.log(obj.value);
            this.toastr.success(value);
            this.getAllAccounts(obj.client.email);
            this.addUserAccountComponent.close()
          },
          error: err => {
            this.toastr.error("Greška pri dodavanju računa");
          }
        }
      );
    } else {
      this.clientService.openForeignAccount(obj.value).subscribe({
          next: value => {
            this.selectedClient = obj.client;
            this.toastr.success(value);
            this.getAllAccounts(obj.client.email);
            this.addUserAccountComponent.close()
          },
          error: err => {
            this.toastr.error("Greška pri dodavanju računa");
          }
        }
      );
    }
  }

}
