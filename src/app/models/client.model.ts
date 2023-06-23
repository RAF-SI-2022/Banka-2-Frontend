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
  senderEmail: string,
  receiverName: string;
  fromBalanceRegNum: string,
  toBalanceRegNum: string,
  amount: number,
  referenceNumber: string,
  paymentNumber: string
  paymentDescription: string
}

export interface TransactionInfo{
  fromBalanceRegNum: string,
  toBalanceRegNum: string,
  currency: string,
  amount: number,
}

export interface Recipient{
  id: string,
  savedByClientEmail: string,
  receiverName: string,
  balanceRegistrationNumber: string,
  referenceNumber: string,
  paymentNumber: string,
  paymentDescription: string
}


export interface ExchangeMoney{
  fromBalanceRegNum: string,
  toBalanceRegNum: string,
  exchange: string,
  amount: number
}



export interface Loan {
  id: string,
  clientEmail: string,
  name: string,
  accountRegNumber: string,
  creationDate: string,
  amount: number,
  remainingAmount: number,
  ratePercentage: number,
  monthlyRate: number,
  dueDate: string,
  currency: string,

}
