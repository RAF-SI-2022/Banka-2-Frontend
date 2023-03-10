import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UserModel} from "../models/users.model";

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

  getUserById(id:number): Observable<UserModel>{
    return this.httpClient.get<UserModel>(
      `${environment.apiUserServerUrl}/`+id,
      { headers: this.headers })
  }

  createNewUser(user: UserModel): Observable<UserModel>{//todo kada bude imao UI proveri dali je dobar
    return this.httpClient.post<UserModel>(
      `${environment.apiUserServerUrl}/register`,
      {user},
      { headers: this.headers })
  }

  updateUser(user: UserModel, id: number): Observable<any>{//todo kada bude imao UI proveri dali je dobar
    return this.httpClient.put<UserModel>(`${environment.apiUserServerUrl}/` + id,
      {email: user.email, firstName: user.firstName, lastName: user.lastName, JMBG: user.jmbg, position: user.jobPosition, phoneNumber: user.phone, active: user.active},
      { headers: this.headers })
  }

  deleteUser(id: number): Observable<any>{//todo kada bude imao UI proveri dali je dobar
    return this.httpClient.delete(
      `${environment.apiUserServerUrl}/` + id,
      { headers: this.headers });
  }

  //todo cekaj da backend tim napravi endpoint pre menjanaj activate/deactivate metoda
  activateUser(id: number): Observable<any>{
    return this.httpClient.put(
      `${environment.apiUserServerUrl}/activate/` + id,
      {},
      { headers: this.headers });
  }

  //todo cekaj da backend tim napravi endpoint pre menjanaj activate/deactivate metoda
  deactivateUser(id: number): Observable<any>{
    return this.httpClient.put(
      `${environment.apiUserServerUrl}/deactivate/` + id,
      {},
      { headers: this.headers })
  }

}
