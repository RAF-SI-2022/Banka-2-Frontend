import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getAllUsersUrl: string
  getUserByIdUrl: string
  createNewUserUrl: string
  updateUserUrl: string
  deleteUserUrl: string
  activateUserUrl: string
  deactivateUserUrl: string


  constructor(private httpClient: HttpClient) { 
    this.getAllUsersUrl = 'localhost:4000/api/users/getAll';
    this.getUserByIdUrl = 'localhost:4000/api/users/getById/';
    this.createNewUserUrl = 'localhost:4000/api/users/create';
    this.updateUserUrl = 'localhost:4000/api/users/update/';
    this.deleteUserUrl = 'localhost:4000/api/users/delete/';
    this.activateUserUrl = 'localhost:4000/api/users/activate/';
    this.deactivateUserUrl = 'localhost:4000/api/users/deactivate/'
    
  }

  //TODO svuda ubaciti header za bearer token


  getAllUsers(): Observable<any>{
    return this.httpClient.get(this.getAllUsersUrl)
  }
  
  getUserById(id:number): Observable<any>{
    return this.httpClient.get(this.getUserByIdUrl+id)
  }

  //TODO ubaciti parametre za kreiranje
  createNewUser(): Observable<any>{
    return this.httpClient.post(this.createNewUserUrl,{})//i ovde ubaciti parametre
  }

  //TODO ubaciti parametre jos
  updateUser(id: number): Observable<any>{
    return this.httpClient.put(this.updateUserUrl + id,{})// i ovde parametre
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(this.deleteUserUrl + id);
  }

  //chat gbt kaze da posaljem ceo entitet koj menjam 
  activateUser(id: number): Observable<any>{
    return this.httpClient.put(this.activateUserUrl + id,{});
  }
  deactivateUser(id: number): Observable<any>{
    return this.httpClient.put(this.deactivateUserUrl + id,{})
  }

}
