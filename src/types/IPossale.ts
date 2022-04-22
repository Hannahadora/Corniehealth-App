export default interface IPossale {
    id: string,
      identifier: string,
      patientId: string,
      type: string,
      status: string,
      coupon: string,
      medications: [
        {
          dispensedProductId: string,
          reasonForSubstitution: string,
          quantity: 0
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