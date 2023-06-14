import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CompanyContract, TransactionElement} from "../models/stock-exchange.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OtcService {
  private contractSubject = new BehaviorSubject<CompanyContract | null>(null);
  public contract$ = this.contractSubject.asObservable();
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

  getAllCompanyContracts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc`
      , {headers: this.headers})
  }

  getAllCompanyContacts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/contact`
      , {headers: this.headers})
  }

  getAllCompanyMyContracts(id:string): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/byCompany/${id}`
      , {headers: this.headers})
  }

  getCompanyContractById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/${id}`
      , {headers: this.headers})
  }

  createCompanyContact(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position: string,
    note: string
  ): Observable<any> {
    return this.httpClient.post<any>(`${environment.otcServiceURL}/api/contact`,
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        email: email,
        position: position,
        note: note
      },
      {headers: this.headers}
    );
  }

  openCompanyContract(
    companyId: string,
    contractStatus: string,
    contractNumber: string,
    description: string
  ): Observable<any> {
    return this.httpClient.post<any>(`${environment.otcServiceURL}/api/otc/open`,
      {
        companyId: companyId,
        contractStatus: contractStatus,
        contractNumber: contractNumber,
        description: description
      },
      {headers: this.headers}
    );
  }

  editCompanyContract(
    companyId: string,
    contractStatus: string,
    contractNumber: string,
    description: string
  ): Observable<any> {
    return this.httpClient.patch<any>(`${environment.otcServiceURL}/api/otc/edit`,
      {
        companyId: companyId,
        contractStatus: contractStatus,
        contractNumber: contractNumber,
        description: description
      },
      {headers: this.headers})
  }

  editCompanyContact(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position: string,
    note: string
  ): Observable<any> {
    return this.httpClient.post<any>(`${environment.otcServiceURL}/api/contact/edit`,
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        email: email,
        position: position,
        note: note
      },
      {headers: this.headers})
  }

  finalizeCompanyContract(id: string): Observable<any> {
    return this.httpClient.patch<any>(`${environment.otcServiceURL}/api/otc/finalize/${id}`,
      {

      },
      {headers: this.headers}
    );
  }

  deleteCompanyContract(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.otcServiceURL}/api/otc/delete/${id}`
      , {headers: this.headers})
  }

  getAllElements(): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/elements`
      , {headers: this.headers})
  }

  getElementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/element/${id}`
      , {headers: this.headers})
  }

  getAllContractElements(contractId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/contract_elements/${contractId}`
      , {headers: this.headers})
  }

  getElementByContractId(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.otcServiceURL}/api/otc/contract_element/${id}`
      , {headers: this.headers})
  }

  createElement(element: TransactionElement): Observable<any> {
    return this.httpClient.post<any>(`${environment.otcServiceURL}/api/otc/add_element`,
      {
        contractId: element.contractId,
        elementId: element.elementId,
        buyOrSell: element.buyOrSell,
        transactionElement: element.transactionElement,
        balance: element.balance,
        currency: element.currency,
        amount: element.amount,
        priceOfOneElement: element.priceOfOneElement,
        userId: element.userId,
        mariaDbId: element.mariaDbId,
        futureStorageField: element.futureStorageField
      },
      {headers: this.headers})
  }

  editElement(
    contractId: string,
    elementId: string,
    buyOrSell: string,
    transactionElement: string,
    balance: string,
    currency: string,
    amount: number,
    priceOfOneElement: number
  ): Observable<any> {
    return this.httpClient.patch<any>(`${environment.otcServiceURL}/api/otc/edit_element`,
      {
        contractId: contractId,
        elementId: elementId,
        buyOrSell: buyOrSell,
        transactionElement: transactionElement,
        balance: balance,
        currency: currency,
        amount: amount,
        priceOfOneElement: priceOfOneElement
      },
      {headers: this.headers})
  }

  deleteElement(contractId: string, elementId: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.otcServiceURL}/api/otc/remove_element/${contractId}/${elementId}`
      , {headers: this.headers})
  }

  notify(contract: CompanyContract) {
    this.contractSubject.next(contract);
    this.contractSubject.next(null);
  }

  uploadContractToBack(){

  }

  downloadContractFromBack(){

  }


}
