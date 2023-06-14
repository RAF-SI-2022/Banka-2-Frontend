export interface ForeignAccount {
  id: string,
  registrationNumber: string,
  ownerId: string,
  balance: number,
  availableBalance: number,
  assignedAgentId: number,
  creationDate: number,
  type: string,
  expirationDate: string,
  currency: string,
  balanceStatus: string,
  balanceType: string,
  interestRatePercentage: number,
  accountMaintenance: number,
  defaultCurrency: boolean,
  allowedCurrencies: string[]
}

export interface LocalAccount {
  id: string,
  registrationNumber: string,
  ownerId: string,
  balance: number,
  availableBalance: number,
  assignedAgentId: number,
  creationDate: number,
  type: string,
  expirationDate: string,
  currency: string,
  balanceStatus: string,
  balanceType: string,
  interestRatePercentage: number,
  accountMaintenance: number
}

export interface BusinessAccount {
  id: string,
  registrationNumber: string,
  ownerId: string,
  balance: number,
  availableBalance: number,
  assignedAgentId: number,
  creationDate: number,
  type: string,
  expirationDate: string,
  currency: string,
  balanceStatus: string,
  businessAccountType: string
}

export interface Client {
  id: string,
  name: string,
  lastname: string,
  dateOfBirth: string,
  gender: string,
  email: string,
  telephone: string,
  address: string,
  password: string
}


export interface PaymentInfo{
  receiverName: string;
  fromBalanceRegNum: string,
  toBalanceRegNum: string,
  amount: number,
  referenceNumber: string,
  paymentNumber: string
  paymentDescription: string
}

