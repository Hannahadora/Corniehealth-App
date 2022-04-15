import IMedication from "./IMedication"
interface IPerformer {
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string
}

interface IPInfo {
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string
}

export default interface IDispense {
    status: string,
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