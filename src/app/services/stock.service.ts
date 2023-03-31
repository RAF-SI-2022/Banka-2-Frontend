import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../models/users.model";
import {StockDetails} from "../models/stock-exchange.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private headers
  private readonly token: string

  constructor(private httpClient: HttpClient) {

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

  getStockDetails(ticker: string): Observable<any>{
    return this.httpClient.get<StockDetails>(
      `${environment.apiStockDetails}`+ticker,
      { headers: this.headers })
  }

  getAllFutures(): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/futures`,{ headers: this.headers })
  }

}
