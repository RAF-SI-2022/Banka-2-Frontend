import {Injectable} from '@angular/core';
import {Order} from "../models/stock-exchange.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionsArrayService {

  orderList: Order[]

  constructor() {
    if (sessionStorage.getItem('porudzbine') !== null) {
      this.orderList = JSON.parse(sessionStorage.getItem('porudzbine')!)
    } else {
      this.orderList = []
    }
  }

  getTransactions() {
    return this.orderList
  }

  addTransactions(transaction: Order) {
    this.orderList.push(transaction)
    sessionStorage.setItem('porudzbine', JSON.stringify(this.orderList))
  }
}
