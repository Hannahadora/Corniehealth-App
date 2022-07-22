
export interface patientInsurance {
  id: string
  patientId: string
  type: string
  group: string
  payer: string
  plan: string
  policyNo: string
  policyExpiry: string
  deductible: number
  mainPolicyHolder: string
  groupPolicyNo: string
  description: number
  coverage: string
  excess: number
  policyStartDate: string
}

export interface chargeCard {
  id: string
  email: string
  cardType: string
  lastFourDigits: string
  expiryMonth: string
  expiryYear: string
}
export default interface IPaymentAccount {
  id: string
  accountType: "family" | "individual" | "corporate"
  type: "insure-emp" | "insure-pri" | "flerxi" | "wallet" | "cash" | "dc" | "cc" | "corp-bill-acct"
  accountNo: string
  ownerId: string
  card: chargeCard
  insurance: patientInsurance
}

