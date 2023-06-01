import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {CompanyContract} from "../models/stock-exchange.model";

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contractSubject = new BehaviorSubject<CompanyContract | null>(null);
  public contract$ = this.contractSubject.asObservable();

  constructor() {}

  notify(contract: CompanyContract) {
    this.contractSubject.next(contract);
    this.contractSubject.next(null);
  }

}