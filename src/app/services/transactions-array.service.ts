import { Injectable } from '@angular/core';
import {Transaction} from "../models/stock-exchange.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionsArrayService {

  transactionList: Transaction[]

  constructor() {
    if(sessionStorage.getItem('porudzbine') !== null){
      this.transactionList=JSON.parse(sessionStorage.getItem('porudzbine')!)
    }else{
      this.transactionList=[]
    }
  }

  getTransactions(){
    return this.transactionList
  }

  addTransactions(transaction: Transaction){
    this.transactionList.push(transaction)
    sessionStorage.setItem('porudzbine',JSON.stringify(this.transactionList))
  }
}
