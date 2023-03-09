import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {User} from "../model";

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
    return this.httpClient.get(`${environment.apiUserServerUrl}/getAll`, { headers: this.headers })
  }

  getUserById(id:number): Observable<User>{
    return this.httpClient.get<User>(`${environment.apiUserServerUrl}/`+id, { headers: this.headers })
  }

  //TODO ubaciti parametre za kreiranje
  createNewUser(): Observable<any>{
    return this.httpClient.post(`${environment.apiUserServerUrl, { headers: this.headers }}/register`,{})//i ovde ubaciti parametre
  }

  //TODO ubaciti parametre jos
  updateUser(user: User, id: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/` + id,
      {email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName, JMBG: user.JMBG, position: user.position,
        phoneNumber: user.phoneNumber, active: user.active}, { headers: this.headers })// i ovde parametre
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUserServerUrl}/` + id, { headers: this.headers });
  }

  //todo cekaj da backend tim napravi endpoint pre menjanaj activate/deactivate metoda
  activateUser(id: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/activate/` + id,{}, { headers: this.headers });
  }
  deactivateUser(id: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/deactivate/` + id,{}, { headers: this.headers })
  }

}
