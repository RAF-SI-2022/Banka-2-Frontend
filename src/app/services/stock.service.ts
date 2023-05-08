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

  getFuturesByUserId(userId: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/futures/user/${userId}`, {headers: this.headers})
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
        currencyCode: 'USD' // TODO: ovo kasnije promeniti
      }
      , {headers: this.headers})
  }

  sellStock(symbol: string, amount: number, limit: number, stop: number, allOrNone: boolean, margin: boolean,userId: number): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/stock/sell`
      , {
        stockSymbol: symbol,
        amount: amount,
        limit: limit,
        stop: stop,
        allOrNone: allOrNone,
        margin: margin,
        userId: userId,
        currencyCode: 'USD' // TODO: ovo kasnije promeniti
      }
      , {headers: this.headers})
  }

  getOptionsDates() {
    return this.httpClient.get<any>(`http://localhost:8080/api/options/dates`, {headers: this.headers})
  }

  getStockOptionsBySymbol(symbol: string) {
    return this.httpClient.get<any>(`http://localhost:8080/api/options/${symbol}`, {headers: this.headers})
  }

  getStockOptionsByDate(symbol: string, date: string) {
    return this.httpClient.get<any>(`http://localhost:8080/api/options/${symbol}/${date}`, {headers: this.headers})
  }

  getMyStockOptions(symbol: string){
    return this.httpClient.get<any>(`http://localhost:8080/api/options/user-options/${symbol}`
    , {headers: this.headers})
  }

  removeStockFromSale(symbol: string) {
    return this.httpClient.post<any>(`http://localhost:8080/api/stock/remove/${symbol}`,
      {}
      , {headers: this.headers})
  }

  buyOption(optionId: number, amount: number, premium: number) {
    return this.httpClient.post<any>(
      `http://localhost:8080/api/options/buy`,
      {optionId: optionId, amount: amount, premium: premium},
      { headers: this.headers }
    );
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
        amount: ammount,
      },
      {headers: this.headers})
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/orders`, {headers: this.headers})
  }

  getAllOrdersByUserId(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/orders/${id}`, {headers: this.headers})
  }

  getAllBalancesByUserId(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/balances/${id}`, {headers: this.headers})
  }

  getAllTransactionsByCurrency(currencyCode: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/transactions/${currencyCode}`, {headers: this.headers})
  }

  depositBalance(amount: number,userEmail:string,currencyCode:string): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/balances/increase` , {
      userEmail: userEmail,
      currencyCode: currencyCode,
      amount: amount,
    }
    , {headers: this.headers})
  }

  withdrawBalance(amount: number,userEmail:string,currencyCode:string): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/balances/decrease` , {
      userEmail: userEmail,
      currencyCode: currencyCode,
      amount: amount,
    }
    , {headers: this.headers})
  }

  declineOrder(id: string): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:8080/api/orders/deny/`+id
      , {headers: this.headers})
  }

  approveOrder(id: string): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:8080/api/orders/approve/`+id
      , {headers: this.headers})
  }



}


