import { Component } from '@angular/core';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';
import {StockService} from "../../../services/stock.service";
import {Future} from "../../../models/stock-exchange.model";

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

  constructor(private userService: UserService, private futureService: StockService) {

  }

  ngOnInit() {

    this.getUser();
    // Test podaci
    this.futureContracts = [
      {
        oznaka: 'corn',
        berza: 'NYSE',
        kolicinaUvlasnistvu: 10,
        cena: 1600,
        vrednost: 16000,
        vrednostRSD: 1697520
      },
      {
        oznaka: 'Chicago wheat',
        berza: 'NASDAQ',
        kolicinaUvlasnistvu: 5,
        cena: 2500,
        vrednost: 12500,
        vrednostRSD: 1326187
      }
    ];


  }

  onItemClicked(future: any){
    this.showDialog(future)
  }

  showDialog(future: any) {
    this.visible = true;
  }

  fillValues(){
    this.values = [
      {
        id: 3,
        refNumber: 'EF789',
        status: 'Aktivan',
        created: '2023-01-10',
        modified: '2023-01-12',
      },
      {
        id: 4,
        refNumber: 'GH012',
        status: 'U izradi',
        created: '2023-01-15',
        modified: '2023-01-17',
      }
    ]

  }

  getMyFutures(){
    this.futureService.getAllFutures().subscribe({
      next: val => {
        this.userFuture = val;
        console.log(val)

        this.tempList = []
        for(let obj in this.userFuture){
          if(this.userFuture[obj].user.id === this.user?.id){
            this.tempList.push(this.userFuture[obj])
          }
        }
        this.futureContracts = this.tempList
      }
      , error: err => {
        console.log(err)
      }
    })


  }


  getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val

          // this.getMyFutures()
          this.fillValues();
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
