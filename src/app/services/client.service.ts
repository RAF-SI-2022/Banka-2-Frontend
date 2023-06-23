import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BusinessAccount, Client, ExchangeMoney, ForeignAccount, LocalAccount, Recipient, TransactionInfo} from "../models/client.model";
import {cli} from "cypress";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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

  // LOGIN CLIENT

  loginClient(email: string, password: string) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/client/login`,
      {email: email, password: password}, {
        headers: this.headers,
        responseType: 'text' as 'json'
      })
  }

  // CREATE CLIENT:

  registerClient(client: Client) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/client/createClient`,
      client, {
        headers: this.headers,
        responseType: 'text' as 'json'
      })
  }


  // GET CLIENT:

  getClientData() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client/mailFromToken`,
      {
        headers: this.headers,
        responseType: 'text' as 'json'
      })
  }

  getAllClients() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client`, {headers: this.headers})
  }

  getClientById(id: string) {
    console.log(id)
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client/${id}`, {headers: this.headers})
  }

  createClient(client: Client) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/client/createClient`,
      client, {headers: this.headers}
    )
  }

  getAccountsByClientEmail(email: string) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/forClient/${email}`, {headers: this.headers})
  }

  //GET ALL ACCOUNTS:

  getAllLocalAccounts() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/tekuci`, {headers: this.headers})
  }

  getAllForeignAccounts() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/devizni`, {headers: this.headers})
  }

  getAllBusinessAccounts() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/poslovni`, {headers: this.headers})
  }

  // GET ACCOUNT BY ID:

  getLocalAccountById(id: number) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/tekuci/${id}`, {headers: this.headers})
  }

  getForeignAccountById(id: number) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/devizni/${id}`, {headers: this.headers})
  }

  getBusinessAccountById(id: number) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/balance/poslovni/${id}`, {headers: this.headers})
  }

  // CREATE ACCOUNT:

  openForeignAccount(foreignAccount: ForeignAccount) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/balance/openDevizniRacun`,
      {
        ownerId: foreignAccount.ownerId,
        assignedAgentId: foreignAccount.assignedAgentId,
        currency: foreignAccount.currency,
        balanceType: foreignAccount.balanceType,
        interestRatePercentage: foreignAccount.interestRatePercentage,
        accountMaintenance: foreignAccount.accountMaintenance,
        defaultCurrency: foreignAccount.defaultCurrency,
        allowedCurrencies: foreignAccount.allowedCurrencies
      }
      , {
        headers: this.headers,
        responseType: 'text' as 'json'
      }
    )
  }

  openLocalAccount(localAccount: LocalAccount) {

    return this.httpClient.post<any>(
      `${environment.clientServiceURL}/api/balance/openTekuciRacun`,
      {
        ownerId: localAccount.ownerId,
        assignedAgentId: localAccount.assignedAgentId,
        currency: localAccount.currency,
        balanceType: localAccount.balanceType,
        interestRatePercentage: localAccount.interestRatePercentage,
        accountMaintenance: localAccount.accountMaintenance
      },
      {
        headers: this.headers,
        responseType: 'text' as 'json'
      }
    );
  }

  openBusinessAccount(businessAccount: BusinessAccount) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/balance/openPoslovniRacun`,
      {
        ownerId: businessAccount.ownerId,
        assignedAgentId: businessAccount.assignedAgentId,
        currency: businessAccount.currency,
        businessAccountType: businessAccount.businessAccountType,
      }, {
        headers: this.headers,
        responseType: 'text' as 'json'
      }
    )
  }

  sendPayment(paymentInfo: any){
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/payment/makePayment`,
      paymentInfo, { headers: this.headers, responseType: 'text' as 'json'})
  }

  sendTransaction(transactionInfo: TransactionInfo){
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/payment/transferMoney`,
    transactionInfo, { headers: this.headers, responseType: 'text' as 'json'})
  }

  addRecipient(recipient: Recipient){
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/payment/addReceiver`,
    recipient, { headers: this.headers, responseType: 'json' })
  }

  getRecipients(email: string){
    console.log(email)
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/payment/getReceivers/${email}`, {headers: this.headers})
  }

  updateRecipient(recipient: Recipient, receiverId: string){
    return this.httpClient.patch<any>(`${environment.clientServiceURL}/api/payment/editReceiver/${receiverId}`, recipient, {headers: this.headers})
  }


  deleteRecipient(receiverId: string) {
    return this.httpClient.delete(`${environment.clientServiceURL}/api/payment/deleteReceivers/${receiverId}`, 
        { headers: this.headers, responseType: 'text' });
  }

  getUserPayments(email: string){
    return this.httpClient.get(`${environment.clientServiceURL}/api/payment/payments/${email}`, 
      { headers: this.headers, responseType: 'json' });
  }

  exchangeCredits(exchange: ExchangeMoney){
    return this.httpClient.post(`${environment.clientServiceURL}/api/payment/exchangeMoney`, exchange, 
      { headers: this.headers, responseType: 'json' });
  }

  getClientLoans(email: string){
    return this.httpClient.get(`${environment.clientServiceURL}/api/credit/${email}`, 
    { headers: this.headers});
  }


}
