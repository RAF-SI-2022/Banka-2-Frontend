import {User, UserCreateDTO} from "./users.model"

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

export interface Option {
  id: number,
  stockSymbol: string,
  contractSymbol: string,
  optionType: string,
  strike: number,
  impliedVolatility: number,
  price: number,
  expirationDate: Date,
  openInterest: number,
  contractSize: number,
  maintenanceMargin: number,
  bid: number,
  ask: number,
  changePrice: number,
  percentChange: number,
  inTheMoney: boolean
}

export interface MyOption{
  id:number,
  userId:number,
  optionId:number,
  premium: number,
  amount: number,
  type: string,
  expirationDate: string,
  strike: number,
  stockSymbol: string
}


export interface Type {
  name: string,
}

export interface ISO {
  name: string,
}

// export interface Transaction {
//   exchangeMICCode: string, // NYCT
//   transaction: string,
//   hartija: string,
//   volume: number,
//   price: number,
//   status: string,
//   lastModifed: String,
// }

export interface Order {
  orderType: string, //Stock
  tradeType: string, // BUY
  symbol: string, //AAPL
  amount: number, //12
  price: number, //23
  status: string, //Complete
  lastModified: string // datum

}

export interface Balance {
  amount: number,
  currency: Currency,
  free: number,
  id: number,
  reserved: number,
}

export interface Currency {
  currencyCode: string,
  currencyName: string

}


export interface UserStock {
  id: number,
  user: User,
  stock: Stock,
  amount: number,
  amountForSale: number
}

export interface Transaction {
  amount: number,
  currency: Currency,
  user: User,
  description: string,
  timestamp: Date,
  reserved: number,
}

// Ispod ovoga je mongo, pa su id string

export interface Company {
  id: string,
  name: string,
  address: string,
  contractPersons: ContactPerson[],
  bankAccounts: CompanyAccount[],
  registrationNumber: string, // maticni broj
  taxNumber: string, // poreski broj
  activityCode: string // sifra aktivnosti
}

export interface CompanyAccount {
  id: string,
  accountNumber: string,
  currency: string,
  bankName: string,
}

export interface CompanyContract {
  id: string,
  company: Company,
  contractElement: string,
  contractNumber: number,
  description: string,
  transactionElements: TransactionElement[]
  contractStatus: string,
  creationDate: Date,
  lastUpdatedDate: Date
}

// TODO: bice promenjen
export interface TransactionElement {
  id: string,
  buyOrSell: string,
  transactionElement: string,
  balance: string,
  currency: string,
  amount: number,
  priceOfOneElement: number
}

export interface ContactPerson {
  id: string,
  firstName: string,
  lastName: string
  phoneNumber: string,
  email: string,
  position: string,
  note: string
}

