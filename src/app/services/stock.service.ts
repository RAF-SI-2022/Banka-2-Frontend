import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  private headers
  private token: string

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
  
  
  getCurrencies(curr0: string, curr1: string): Observable<any>{
    return this.httpClient.get(`${environment.apiForexUrl}/${curr0}/${curr1}` ,{ headers: this.headers })
  }

  loadCSVData(){
    return this.httpClient.get('assets/csv/filtered_forex_pairs.csv', { responseType: 'text' });
  }



}