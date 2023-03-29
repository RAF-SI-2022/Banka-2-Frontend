export interface Currency {
  currencyName: string,
  currencyCode: string,
  currencySymbol: string,
  polity: string
}

export interface Exchange {
  exchangeName: string, // New york stock
  exchangeAcronym: string,
  exchangeMICCode: string, // NYCT
  polity: string,
  currency: Currency,
  timeZone: number
  // radi: true/false
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

export interface Futures {
  contractSize: number,
  contractUnit: string,
  openInterest: number,
  settlementDate: Date
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






