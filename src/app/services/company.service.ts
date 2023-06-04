import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CompanyContract} from "../models/stock-exchange.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private headers
  private token: string

  constructor(private httpClient: HttpClient) {

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
  }

  setToken(token: string) {
    this.token = token
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`)

  }

  getAllCompanies(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/company`
      , {headers: this.headers})
  }

  getCompanyById(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/company/${id}`
      , {headers: this.headers})
  }

  changeCompany(
    id: string,
    name: string,
    registrationNumber: string,
    taxNumber: string,
    activityCode: string,
    address: string
  ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8082/api/company/edit`,
      {
        id: id,
        name: name,
        registrationNumber: registrationNumber,
        taxNumber: taxNumber,
        activityCode: activityCode,
        address: address
      },
      {headers: this.headers}
    )

  }

  createCompany(name: string,
                registrationNumber: string,
                taxNumber: string,
                activityCode: string,
                address: string): Observable<any> {

    console.log("headeri")
    console.log(this.headers)

    return this.httpClient.post<any>(`http://localhost:8082/api/company/create`,
      {
        name: name,
        registrationNumber: registrationNumber,
        taxNumber: taxNumber,
        activityCode: activityCode,
        address: address
      },
      {headers: this.headers}
    )
  }

  createCompanyBankAccount(
    companyId: string,
    accountNumber: string,
    currency: string,
    bankName: string
  ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8082/api/bankaccount/${companyId}`,
      {
        id: "1",
        accountNumber: accountNumber,
        currency: currency,
        bankName: bankName
      },
      {headers: this.headers}
    )
  }

  getAllCompanyBankAccounts(companyId: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8082/api/bankaccount/company/${companyId}`,
      {headers: this.headers});
  }

  editCompanyBankAccount(
    id: string,
    accountNumber: string,
    currency: string,
    bankName: string
  ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8082/api/bankaccount/edit`,
      {
        id: id,
        accountNumber: accountNumber,
        currency: currency,
        bankName: bankName
      },
      {headers: this.headers}
    )
  }

  deleteCompanyBankAccount(id: string): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8082/api/bankaccount/delete/${id}`,
      {headers: this.headers})
  }


}
