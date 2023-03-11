import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UserCreateDTO, User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers


  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
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

  // LUKA NE DIRAJ ARGUMENTE

  createNewUser(firstName: string, lastName: string, email: string, password: string,
    permissions: any, jobPosition: string,active : string, jmbg: string, phone : string
    ): Observable<any>{//todo kada bude imao UI proveri dali je dobar
    return this.httpClient.post<UserCreateDTO>(
      `${environment.apiUserServerUrl}/register`,
      {firstName: firstName, lastName:lastName, email:email, password:password
      ,permissions: permissions, jobPosition: jobPosition, active:active, jmbg: jmbg, phone:phone},
      { headers: this.headers })
  }

  //todo kada bude imao UI proveri dali je dobar
  updateUser(id: number, email: string, firstName: string, lastName: string,
    jmbg: string, jobPosition: string, phone: string, active: boolean): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUserServerUrl}/` + id,
      {id: id,email: email,password: "1234567891", firstName: firstName, lastName: lastName,
        jmbg: jmbg,  phone: phone, jobPosition: jobPosition,active: active},
      { headers: this.headers })
  }

  deleteUser(id: number): Observable<any>{//todo kada bude imao UI proveri dali je dobar
    return this.httpClient.delete(`${environment.apiUserServerUrl}/` + id, { headers: this.headers })
  }

  //todo cekaj da backend tim napravi endpoint pre menjanaj activate/deactivate metoda
  activateUser(id: number): Observable<User>{
    return this.httpClient.post<User>(
      `${environment.apiUserServerUrl}/reactivate/` + id,
      {},
      { headers: this.headers });
  }

  //todo cekaj da backend tim napravi endpoint pre menjanaj activate/deactivate metoda
  deactivateUser(id: number): Observable<any>{
    return this.httpClient.post(
      `${environment.apiUserServerUrl}/deactivate/` + id,
      {},
      { headers: this.headers })
  }

}
