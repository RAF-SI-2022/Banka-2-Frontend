import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {UserCreateDTO, User} from "../models/users.model";
import {StockService} from './stock.service';
import {ClientService} from "./client.service";
import {CompanyService} from "./company.service";
import {OtcService} from "./otc.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers
  private token: string

  constructor(private httpClient: HttpClient, private stockService: StockService,
              private clientService: ClientService, private companyService: CompanyService,
              private otcService: OtcService) {

    if (localStorage.getItem("token") !== null) {
      this.token = localStorage.getItem("token")!
    } else {
      this.token = sessionStorage.getItem("token")!
    }

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.token}`)
  }

  resetToken() {
    this.token = ''
    this.stockService.resetToken();
    this.clientService.resetToken();
    this.companyService.resetToken();
    this.otcService.resetToken();
  }

  setToken(token: string) {
    this.token = token
    this.stockService.setToken(this.token);
    this.clientService.setToken(this.token);
    this.companyService.setToken(this.token);
    this.otcService.setToken(this.token);
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`)
  }

  getToken() {
    return this.token !== null
  }


  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.mainServiceURL}/api/users`,
      {headers: this.headers})
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.mainServiceURL}/api/users/` + id,
      {headers: this.headers})
  }

  createNewUser(firstName: string, lastName: string, email: string, password: string, permissions: any, dailyLimit: number | null, jobPosition: string, active: string, jmbg: string, phone: string
  ): Observable<any> {
    return this.httpClient.post<UserCreateDTO>(
      `${environment.mainServiceURL}/api/users/register`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
        ,
        permissions: permissions,
        dailyLimit: dailyLimit,
        jobPosition: jobPosition,
        active: active,
        jmbg: jmbg,
        phone: phone
      },
      {headers: this.headers})
  }

  updateUser(
    id: number,
    email: string,
    permissions: [],
    firstName: string,
    lastName: string,
    jobPosition: string,
    dailyLimit: number,
    phone: string,
    active: boolean
  ): Observable<any> {
    return this.httpClient.put<any>(`${environment.mainServiceURL}/api/users/` + id,
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
      {headers: this.headers})
  }

  updateProfile(id: number, email: string, firstName: string,
                lastName: string, phone: string): Observable<any> {
    return this.httpClient.put<any>(`${environment.mainServiceURL}/api/users/edit-profile/` + id,
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone
      },
      {headers: this.headers})
  }

  changePassword(id: number, password: string): Observable<any> {
    return this.httpClient.put<any>(`${environment.mainServiceURL}/api/users/password/` + id,
      {
        password: password
      },
      {headers: this.headers})
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.mainServiceURL}/api/users/` + id, {headers: this.headers})
  }

  activateUser(id: number): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.mainServiceURL}/api/users/reactivate/` + id,
      {},
      {headers: this.headers});

  }

  deactivateUser(id: number): Observable<any> {
    return this.httpClient.post(
      `${environment.mainServiceURL}/api/users/deactivate/` + id,
      {},
      {headers: this.headers})
  }

  getUserData(): Observable<any> {
    return this.httpClient.get(`${environment.mainServiceURL}/api/users/email`, {headers: this.headers})
  }

  getUserPermissions(id: number): Observable<any> {
    return this.httpClient.get(`${environment.mainServiceURL}/api/users/permissions` + id, {headers: this.headers})
  }

  sendTokenToEmail(email: string) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/client/sendToken/${email}`,
      {}, {
        headers: this.headers,
        responseType: 'text' as 'json'
      });
  }

  checkToken(token: string) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client/checkToken/${token}`,
       {
        headers: this.headers,
        responseType: 'text' as 'json'
      });
  }

  resetUserLimit(id: number): Observable<any> {
    return this.httpClient.patch(`${environment.mainServiceURL}/api/users/reset-limit/${id}`, {}, {headers: this.headers})
  }

  getUserDefaultDailyLimit(id: number): Observable<any> {
    return this.httpClient.get(`${environment.mainServiceURL}/api/users/default-limit/${id}`, {headers: this.headers})
  }
  changeUsersDailyLimit(id: number, limit: number): Observable<any>{
    return this.httpClient.patch(`${environment.mainServiceURL}/api/users/change-limit/${id}/${limit}`, {}, {headers: this.headers})
  }
}
