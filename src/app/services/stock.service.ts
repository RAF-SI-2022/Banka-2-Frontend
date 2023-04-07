import {Injectable} from '@angular/core';
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

  getAllStocks(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/stock`
      , {headers: this.headers})
  }

  getStockBySymbol(symbol: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/stock/symbol/${symbol}`
      , {headers: this.headers})
  }

  getMyStocks(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/stock/user-stocks`
      , {headers: this.headers})
  }


  getStockDetails(id: number): Observable<any> {
    return this.httpClient.get<StockDetails>(
      `${environment.apiStockDetails}` + id,
      {headers: this.headers})
  }

  getStockGraph(id: number, type: string): Observable<any> {
    return this.httpClient.get<StockDetails>(
      `${environment.apiStockGraph}${id}/history/${type}`,
      {headers: this.headers})
  }

  getAllFutures(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/futures`, {headers: this.headers})
  }

  getCurrencies(curr0: string, curr1: string): Observable<any> {
    return this.httpClient.get(`${environment.apiForexUrl}/${curr0}/${curr1}`, {headers: this.headers})
  }

  loadCSVData() {
    return this.httpClient.get('assets/csv/filtered_forex_pairs.csv', {responseType: 'text'});
  }

  getAllFuturesByName(futureName: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/futures/name/${futureName}`, {headers: this.headers})
  }

  buyFuture(id: string, futureName: string, action: string, price: number, limit: number, stop: number): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/futures/buy`
      , {
        id: id,
        futureName: futureName,
        action: action,
        price: price,
        limit: limit,
        stop: stop,
      }
      , {headers: this.headers})
  }

  sellFuture(id: string, futureName: string, action: string, price: number, limit: number, stop: number): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/futures/sell`
      , {
        id: id,
        userId: null,
        futureName: futureName,
        action: action,
        price: price,
        limit: limit,
        stop: stop,
      }
      , {headers: this.headers})
  }


  buyStock(symbol: string, amount: number, limit: number, stop: number, allOrNone: boolean, margin: boolean): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/stock/buy`
      , {
        stockSymbol: symbol,
        amount: amount,
        limit: limit,
        stop: stop,
        allOrNone: allOrNone,
        margin: margin,
      }
      , {headers: this.headers})
  }

  sellStock(symbol: string, amount: number, limit: number, stop: number, allOrNone: boolean, margin: boolean): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/stock/sell`
      , {
        stockSymbol: symbol,
        amount: amount,
        limit: limit,
        stop: stop,
        allOrNone: allOrNone,
        margin: margin,
      }
      , {headers: this.headers})
  }

  removeStockFromSale(symbol: string) {
    return this.httpClient.post<any>(`http://localhost:8080/api/stock/remove/${symbol}`,
      {}
      , {headers: this.headers})
  }

  removeFutureFromMarket(futureId: string): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/futures/remove/${futureId}`,
      {}
      , {headers: this.headers})
  }

  getAllWaitingFuturesForUser(type: string, futureName: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/futures/waiting-futures/${type}/${futureName}`
      , {headers: this.headers})
  }

  getExchangeStatus(micCode: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiExchangeUrl}/status/${micCode}`,
      {headers: this.headers})
  }

  removeFromWaitingSellFuture(id: number): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/futures/remove-waiting-sell/${id}`
      , {}
      , {headers: this.headers})
  }

  removeFromWaitingBuyFuture(id: number): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/futures/remove-waiting-buy/${id}`
      , {}
      , {headers: this.headers})
  }


  buyForex(fromCurrency: string, toCurrency: string, ammount: number): Observable<any> {

    if (ammount == 0) {
      ammount = 1
    }

    return this.httpClient.post(`${environment.apiForexUrl}/buy-sell`,
      {
        fromCurrencyCode: fromCurrency,
        toCurrencyCode: toCurrency,
        amountOfMoney: ammount,
      },
      {headers: this.headers})
  }


}
