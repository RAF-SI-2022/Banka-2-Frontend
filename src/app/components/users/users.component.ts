import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user-service.service';
import {MenuItem, MessageService} from "primeng/api";
import {MenuItemContent} from "primeng/menu";
import {UserModel} from "../../models/users.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: UserModel[]; // prazno da ne bi bacalo greske //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL


  displayDialog: boolean = false;
  items: MenuItem[];


  roles!: any[];
  selectedRole!: any

  constructor(private userService: UserService, private toastr: ToastrService){

  }

  toggleDialog(id: number) {
    this.userService.getUserById(id).subscribe({
      next: val =>{
        console.log(val)
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })
    this.displayDialog = !this.displayDialog;
  }

  updateUser() {

  }

  ngOnInit(){


    this.items = [
      {label: 'Početna', routerLink: ['/']},
      {label: 'Korisnici', routerLink: ['/users']}
    ];

    // TODO promeniti labele i value na role
    this.roles = [
      {label: 'Doktor', value: 'Doktor'},
      {label: 'Lider', value: 'Lider'},
      {label: 'Debil', value: 'Debil'}
  ]


    this.getUsers()
  }

  // ToastrService.success/error/warning/info/show()
  showToastDelete(){
    this.toastr.error("Korisnik obrisan")
  }

  // Filtriranje globalno
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // Dovlacenje svih usera
  getUsers(){

    this.userService.getAllUsers()     //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL
    .subscribe({
      next: val =>{
        this.users = val;
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })

  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)     //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL
      .subscribe({
        next: val =>{
          console.log(val)
          this.users = this.users.filter(user => user.id != id);
          this.showToastDelete()
          //strpati sve podatke u listu usera
        },
        error: err =>{
          //alertovati error
          console.log(err)
        }
      })
  }

  activateUser(id:number){

    // for(const item of this.users){
    //   if(item.id == id){//todo ovde ti se buni jer User ne poseduje polje id, necu da ostavim error ne zakomentarisan
    //     item.active = true;
    //   }
    // }

    // this.userService.activateUser(id)
    // .subscribe({
    //   next: val=>{
    //     alert("success")
    //     for(const item of this.users){
    //       if(item.id == id){
    //         item.aktivan = 2;
    //       }
    //     }
    //   },
    //   error: err=>{
    //     alert("greska")
    //   }
    // })
    // alert(id)
  }
  deactivateUser(id:number){

    // for(const item of this.users){
    //   if(item.id == id){todo ovde ti se buni jer User ne poseduje polje id, necu da ostavim error ne zakomentarisan
    //     item.active = false;
    //   }
    // }

    // this.userService.deactivateUser(id)
    // .subscribe({
    //   next: val=>{
    //     alert("success")
    //     for(const item of this.users){
    //       if(item.id == id){
    //         item.aktivan = 2;
    //       }
    //     }
    //   },
    //   error: err=>{
    //     alert("greska")
    //   }
    // })
    // alert(id)
  }

}
