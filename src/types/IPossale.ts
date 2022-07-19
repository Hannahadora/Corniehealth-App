export default interface IPossale {
  createdAt: string,
  id: string,
  identifier: string,
  patientId: string,
  type: string,
  status: string,
  coupon: string,
  medications: [
    {
      id: string,
      dispensedProductId: string,
      reasonForSubstitution: string,
      quantity: number
    }
  ],
  payments: [
    {
      id: string,
      paymentType: string,
      amount: number,
      total: number,
      status: string,
    }
  ],
  customer: {
    name: string
  }
}