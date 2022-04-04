// import IBill from ./IBill

export default interface IDispense {
    createdAt: string,
    priority: string,
    requester: string,
    requesterIdentifier: string,
    patient: {
        name: string,
        mrn: string,
        phone: string,
        email: string,
        address: string
    },
    performer: {
        name: string,
        mrn: string,
        phone: string,
        email: string,
        address: string
    },
    medications: [
        {
            code: string,
            name: string,
            reference: string,
            courseOfTherapy: string,
            dosageInstruction: string,
            durationInDays: number,
            requestId: string,
            genericCode: string,
            genericName: string,
            strength: string,
            form: string,
            refills: [
                {
                    medicationId: string,
                    interval: number,
                    intervalUnit: string,
                    startDate: string,
                    quantity: number,
                    supplyDuration: number,
                    supplyDurationUnit: string
                }
            ],
            substitutionAllowed: true,
            substitutionCode: string,
            reasonForSubstitution: string,
            reasonAgainstSubstitution: string,
            brandCode: string,
            unitPrice: number,
            quantity: number,
            available: true,
            amount: number
        }
    ],
    totalDiscount: number,
    subTotal: number,
    shippingCost: number
}


