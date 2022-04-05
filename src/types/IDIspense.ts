// import IBill from ./IBill

import { IPatient } from "./IPatient"

export default interface IRefill {
    medicationId: string,
    interval: string,
    intervalUnit: string,
    startDate: string,
    quantity: string,
    supplyDuration: string,
    supplyDurationUnit: string
}

export default interface IMedication {
    code: string,
    name: string,
    reference: string,
    courseOfTherapy: string,
    dosageInstruction: string,
    durationInDays: string,
    requestId: string,
    genericCode: string,
    genericName: string,
    strength: string,
    form: string,
    refills: IRefill[],
    substitutionAllowed: true,
    substitutionCode: string,
    reasonForSubstitution: string,
    reasonAgainstSubstitution: string,
    brandCode: string,
    unitPrice: string,
    quantity: string,
    available: true,
    amount: string
}

export default interface IPerformer {
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string
}

export default interface IPInfo {
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string
}


export default interface IDispense {
    createdAt: string,
    priority: string,
    requester: string,
    requesterIdentifier: string,
    patient: IPInfo,
    performer: IPerformer,
    medications: IMedication[],
    totalDiscount: string,
    subTotal: string,
    shippingCost: string
}