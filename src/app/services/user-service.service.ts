import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UserCreateDTO, User} from "../models/users.model";
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers
  private token: string

  constructor(private httpClient: HttpClient, private stockService: StockService) {

    if(localStorage.getItem("token") !== null){
      this.token = localStorage.getItem("token")!
    }
    else{
      this.token = sessionStorage.getItem("token")!
    }

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.token}`)
  }

  resetToken(){
    this.token = ''
    this.stockService.resetToken();
  }

  setToken(token: string){
    this.token=token
    this.stockService.setToken(this.token);
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`)


  }

  getToken(){
    return this.token !== null
  }


  getAllUsers(): Observable<any>{
    return this.httpClient.get<any>(
      `${environment.apiUserServerUrl}`,
      { headers: this.headers })
  }

  getUserById(id:number): Observable<User>{
    return this.httpClient.get<User>(
      `${environment.apiUserServerUrl}/`+id,
      { headers: this.headers })
  }

  createNewUser(firstName: string, lastName: string, email: string, password: string, permissions: any,dailyLimit: number, jobPosition: string,  active : string, jmbg: string, phone : string
    ): Observable<any>{
    return this.httpClient.post<UserCreateDTO>(
      `${environment.apiUserServerUrl}/register`,
      {firstName: firstName, lastName:lastName, email:email, password:password
      ,permissions: permissions, dailyLimit: dailyLimit, jobPosition: jobPosition, active:active, jmbg: jmbg, phone:phone},
      { headers: this.headers })
  }

  updateUser(
      id: number, 
      email: string, 
      permissions:[], 
      firstName: string, 
      lastName: string, 
      jobPosition: string, 
      dailyLimit: number, 
      phone: string, 
      active: boolean
    ): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUserServerUrl}/` + id,
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        permissions: permissions,
        jobPosition: jobPosition,
        dailyLimit: dailyLimit,
        active: active,
        phone: phone
      },
      { headers: this.headers })
  }

  updateProfile(id: number, email: string, firstName: string,
    lastName: string, phone: string): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUserServerUrl}/edit-profile/` + id,
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    },
    { headers: this.headers })
  }

  changePassword(id: number, password: string): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUserServerUrl}/password/` + id,
    {
      password: password
    },
    { headers: this.headers })
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUserServerUrl}/` + id, { headers: this.headers })
  }

  activateUser(id: number): Observable<User>{
    return this.httpClient.post<User>(
      `${environment.apiUserServerUrl}/reactivate/` + id,
      {},
      { headers: this.headers });

  }

  deactivateUser(id: number): Observable<any>{
    return this.httpClient.post(
      `${environment.apiUserServerUrl}/deactivate/` + id,
      {},
      { headers: this.headers })
  }

  getUserData(): Observable<any>{
    return this.httpClient.get(`${environment.apiUserServerUrl}/email` ,{ headers: this.headers })
  }

  getUserPermissions(id: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUserServerUrl}/permissions` + id,{ headers: this.headers })
  }

}
