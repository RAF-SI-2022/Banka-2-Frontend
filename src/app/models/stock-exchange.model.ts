import { User } from "./users.model"

export interface Currency {
  currencyName: string,
  currencyCode: string,
  currencySymbol: string,
  polity: string
}

export interface Exchange {
  exchangeName: string,
  exchangeAcronym: string,
  exchangeMICCode: string,
  polity: string,
  currency: Currency,
  timeZone: number,
  openTime: string,
  closeTime: string,
}

export interface Listing {
  ticker: string,
  name: string,
  exchange: Exchange,
  lastRefresh: Date,
  price: number,
  ask: number,
  bid: number,
  change: number,
  volume: number
}

export interface Stock {
  changePercent: string,
  changeValue: number,
  companyName: string,
  dividendYield: number,
  exchange: Exchange,
  highValue: number,
  id: number,
  lastUpdated: string,
  lowValue: number,
  openValue: number,
  outstandingShares: number,
  previousClose: number,
  priceValue: number,
  symbol: string,
  volumeValue: number,
  websiteUrl: string
}

export interface Forex extends Listing {
  baseCurrency: Currency
  quoteCurrency: Currency
}

export interface Future {
  id: string,
  futureName: string,
  contractSize: number,
  contractUnit: string,
  maintenanceMargin: number,
  type: string,
  settlementDate: String,
  forSale: boolean,
  user: User,// mozda camel case
}

export interface StockDetails {
  id: number,
  symbol: string,
  companyName: string,
  outstandingShares: number,
  dividendYield: number,
  priceValue: number,
  openValue: number,
  lowValue: number,
  highValue: number,
  changeValue: number,
  previousClose: number,
  volumeValue: number,
  lastUpdated: string,
  changePercent: string,
  exchange: Exchange
  websiteUrl: string
}

export interface StockHistory {
  id: number,
  openValue: number,
  highValue: number,
  lowValue: number,
  closeValue: number,
  volumeValue: number,
  onDate: string,
  type: string
}

export interface Type {
  name: string,
}

export interface ISO {
  name: string,
}

export interface Transaction {
  exchangeMICCode: string, // NYCT
  transaction : string,
  hartija: string,
  volume: number,
  price: number,
  status: string,
  lastModifed: String,
}


export interface UserStock {
  id: number,
  user: User,
  stock: Stock,
  amount: number,
  amountForSale: number
}



