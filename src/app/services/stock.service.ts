import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')

  constructor(private httpClient: HttpClient) {}

  getWebsite(name:string) {
    return this.httpClient.get<any>(`${environment.apiYahooFinanceUrl}${name}?modules=assetProfile`, {observe: 'response', headers: this.headers});
  }
}
