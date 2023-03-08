import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  //user: User[] (iz modela) = [] // prazno da ne bi bacalo greske

  constructor(private userService: UserService){

  }

  ngOnInit(){
    //getUsers()
  }

  getUsers(){
    this.userService.getAllUsers()
    .subscribe({
      next: val =>{
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })
  }

}
