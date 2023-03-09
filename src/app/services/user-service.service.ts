import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

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
    return this.httpClient.get(`${environment.apiUserServerUrl}/getAll`)
  }

  getUserById(id:number): Observable<any>{
    return this.httpClient.get(`${environment.apiUserServerUrl}/getById/`+id)
  }

  //TODO ubaciti parametre za kreiranje
  createNewUser(): Observable<any>{
    return this.httpClient.post(`${environment.apiUserServerUrl}/create`,{})//i ovde ubaciti parametre
  }

  //TODO ubaciti parametre jos
  updateUser(id: number, email: String, password: String, firstName: String, lastName: String, JMBG: String, position: String, phoneNumber: String, active: boolean): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/update/` + id,{email: email, password: password, firstName: firstName, lastName: lastName, JMBG: JMBG, position: position, phoneNumber: phoneNumber, active: active})// i ovde parametre
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUserServerUrl}/delete/` + id);
  }

  //chat gbt kaze da posaljem ceo entitet koj menjam
  activateUser(id: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/activate/` + id,{});
  }
  deactivateUser(id: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUserServerUrl}/deactivate/` + id,{})
  }

}
