import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = []; // prazno da ne bi bacalo greske


  constructor(private userService: UserService){

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

    let obj1 = {
      id: 1,
      email: "Filip@gmail.com",
      first_name: "filip",
      last_name: "jovanovic",
      jmbg: 123456,
      pozicija: "Doktor",

      broj_telefona: "+381/612345678",
      aktivan: 1,
    }

    let obj2 = {
      id: 2,
      email: "Filip@gmail.com",
      first_name: "filip",
      last_name: "jovanovic",
      jmbg: 123456,
      pozicija: "Doktor",

      broj_telefona: "+381/612345678",
      aktivan: 2,
    }
    let obj3 = {
      id: 3,
      email: "Filip@gmail.com",
      first_name: "filip",
      last_name: "jovanovic",
      jmbg: 123456,
      pozicija: "Doktor",

      broj_telefona: "+381/612345678",
      aktivan: 1,
    }
    // console.log(obj)

    //this.getUsers()
    this.users.push(obj1)
    this.users.push(obj2)
    this.users.push(obj3)
    // console.log(this.users)
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

}
