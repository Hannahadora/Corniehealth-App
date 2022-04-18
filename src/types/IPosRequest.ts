interface IPMed {
    dispensedProductId: string,
    reasonForSubstitution: string,
    quantity: string
}

interface IPPayment  {
    id: string,
    paymentType: string,
    amount: string,
    total: string,
    status: string
}

export default interface IPosRequest {
    id: string,
    identifier: string,
    patientId: string,
    type: string,
    status: string,
    coupon: string,
    medications: IPMed[],
    payments: IPPayment[],
    customer: {
        name: string
    }
}