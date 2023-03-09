import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/users.model';
import {MenuItem} from "primeng/api";
import {MenuItemContent} from "primeng/menu";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = []; // prazno da ne bi bacalo greske
  displayDialog: boolean = false;
  items: MenuItem[];


  roles!: any[];
  selectedRole!: any

  constructor(private userService: UserService){

  }

  toggleDialog(id: number) {
    this.displayDialog = !this.displayDialog;
  }

  updateUser() {

  }

  initialUser(){
    // this.user.id = 1;
    // this.user.first_name = "filip"
    // this.user.last_name = "jovanovic"
    // this.user.jmbg = 123456;
    // this.user.email = "Filip@gmail.com"
    // this.user.position = "Doktor"
    // this.user.limit = "Neogranicen"
    // this.user.limit_left = 1.5;
  }

  ngOnInit(){

    this.items = [
      {label: 'Početna', routerLink: ['/']},
      {label: 'Korisnici', routerLink: ['/users']}
    ];

    // let obj1 = {
    //   id: 1,
    //   email: "Filip@gmail.com",
    //   first_name: "filip",
    //   last_name: "jovanovic",
    //   jmbg: 123456,
    //   pozicija: "Debil",
    //
    //   broj_telefona: "+381/612345678",
    //   aktivan: 1,
    // }
    //todo ovo da se skloni kada se endpoint aktivira

    // let obj1 = {
    //   id: 1,
    //   email: "Filip@gmail.com",
    //   first_name: "filip",
    //   last_name: "jovanovic",
    //   jmbg: 123456,
    //   pozicija: "Debil",
    //
    //   broj_telefona: "+381/612345678",
    //   aktivan: 1,
    // }
    //
    // let obj2 = {
    //   id: 2,
    //   email: "Srdja@gmail.com",
    //   first_name: "Srdja",
    //   last_name: "Lazic",
    //   jmbg: 123456,
    //   pozicija: "Doktor",
    //
    //   broj_telefona: "+381/612345678",
    //   aktivan: 2,
    // }
    // let obj3 = {
    //   id: 3,
    //   email: "Relja@gmail.com",
    //   first_name: "relja",
    //   last_name: "ivanovic",
    //   jmbg: 123456,
    //   pozicija: "Lider",
    //
    //   broj_telefona: "+381/612345678",
    //   aktivan: 1,
    // }
    // console.log(obj)


    // this.users.push(obj1)
    // this.users.push(obj2)
    // this.users.push(obj3)

    this.roles = [
      {label: 'Doktor', value: 'Doktor'},
      {label: 'Lider', value: 'Lider'},
      {label: 'Debil', value: 'Debil'},
      // {label: 'Negotiation', value: 'negotiation'},
      // {label: 'Renewal', value: 'renewal'},
      // {label: 'Proposal', value: 'proposal'}
  ]

    // console.log(this.users)

    //this.getUsers()
  }

  // Filtriranje globalno
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getUsers(){
    this.userService.getAllUsers()
    .subscribe({
      next: val =>{
        this.users = val
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
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
  openEditPopup(){
    // popup(id)
    alert("popup")
  }

}
