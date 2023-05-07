import { Component } from '@angular/core';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import {StockService} from "../../../services/stock.service";
import {Future} from "../../../models/stock-exchange.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-future-contract',
  templateUrl: './future-contract.component.html',
  styleUrls: ['./future-contract.component.css']
})
export class FutureContractComponent {

  futureContracts : any[];

  tempList: any[]

  values: any[] = [];

  userFuture: Future[]

  selectedFuture: any;

  user: User

  visible: boolean;

  total: number;

  constructor(private userService: UserService, private toastr: ToastrService, private futureService: StockService) {

  }

  ngOnInit() {
    this.getUser();
  }

  onItemClicked(future: any){
    this.showDialog(future)
  }

  showDialog(future: any) {
    this.visible = true;
  }

  getMyFutures(id: number){

    this.futureService.getFuturesByUserId(id).subscribe({
      next: val => {
        this.futureContracts = val;
        
        // this.total = this.futureContracts.reduce((accumulator, contract) => {
        //   return accumulator + contract.maintenanceMargin;
        // }, 0);

      }
      , error: err => {
        this.toastr.error(err)
      }
    })
  }


  getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          this.getMyFutures(this.user.id)
        },
        error: err => {
          this.toastr.error(err.error)
        }
      })
  }

  

}
