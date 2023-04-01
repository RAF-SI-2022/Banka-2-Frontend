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

export interface Stock extends Listing {
  outstandingShares: number,
  dividendYield: number
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
  exchange_name: null
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
  zavrsena: string,
  lastModifed: Date,
}






