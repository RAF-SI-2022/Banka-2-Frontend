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
  timeZone: number
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
  outstandingShares: number,
  dividendYield: number
}




