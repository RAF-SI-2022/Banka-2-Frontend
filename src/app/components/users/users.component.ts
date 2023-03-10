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

  loading: boolean = true;

  displayConfirmationDialog: boolean = false;
  selectedUserId: number = -1

  constructor(private userService: UserService, private toastr: ToastrService){

  }

  toggleConfirmationDialog(id: number){
    this.displayConfirmationDialog = !this.displayConfirmationDialog;
    this.selectedUserId = id
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
        this.loading = true
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })

  }

  clearSelectedUserId(){
    this.selectedUserId = -1
    this.displayConfirmationDialog = !this.displayConfirmationDialog
  }

  deleteUser() {
    if(this.selectedUserId === -1){
      alert("greska")
      return;
    }
    this.userService.deleteUser(this.selectedUserId)     //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL
      .subscribe({
        next: val =>{
          console.log(val)
          this.users = this.users.filter(user => user.id != this.selectedUserId);
          this.showToastDelete()
          this.selectedUserId = -1
          this.displayConfirmationDialog = !this.displayConfirmationDialog
        },
        error: err =>{
          console.log(err)
          this.selectedUserId = -1
          this.displayConfirmationDialog = !this.displayConfirmationDialog
        }
      })
  }

  activateUser(id:number){
    for(const item of this.users){
      if(item.id == id){
        item.active = true;
      }
    }

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
    for(const item of this.users){
      if(item.id == id){
        item.active = false;
      }
    }

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
