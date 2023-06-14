import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BusinessAccount, Client, ForeignAccount, LocalAccount} from "../models/client.model";
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

  // GET CLIENT:

  getAllClients() {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client`, {headers: this.headers})
  }

  getClientById(id: number) {
    return this.httpClient.get<any>(`${environment.clientServiceURL}/api/client/${id}`, {headers: this.headers})
  }

  createClient(client: Client) {
    return this.httpClient.post<any>(`${environment.clientServiceURL}/api/client/createClient`,
      client, {headers: this.headers}
    )
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


}