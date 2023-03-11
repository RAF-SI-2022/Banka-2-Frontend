import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: User

  constructor(private userService: UserService){

  }

  ngOnInit(){
    this.userService.getUserData()
    .subscribe({
      next: val =>{
        this.user = val
      },
      error: err =>{
        console.log(err)
      }
    })
  }
}
