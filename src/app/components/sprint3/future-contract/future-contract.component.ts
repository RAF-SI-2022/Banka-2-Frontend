import { Component } from '@angular/core';
import {UserService} from 'src/app/services/user-service.service';
import {User} from 'src/app/models/users.model';

@Component({
  selector: 'app-future-contract',
  templateUrl: './future-contract.component.html',
  styleUrls: ['./future-contract.component.css']
})
export class FutureContractComponent {

  futureContracts : any[];

  values: any[] = [];

  user: User

  visible: boolean;

  constructor(private userService: UserService) {

  }

  ngOnInit() {

    this.getUser();
    // Test podaci 
    this.futureContracts = [
      {
        oznaka: 'ABC',
        berza: 'NYSE',
        kolicinaUvlasnistvu: 10,
        cena: 100,
        vrednost: 1000,
        vrednostRSD: 100000
      },
      {
        oznaka: 'XYZ',
        berza: 'NASDAQ',
        kolicinaUvlasnistvu: 5,
        cena: 200,
        vrednost: 1000,
        vrednostRSD: 100000
      }
    ];

    this.fillValues();

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


  getUser(){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
