import IMedication from "./IMedication"
import IPhone from "./IPhone"
import User from "./user"

interface IPerformer {
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string
}

interface IPInfo {
    emergencyContacts: any[]
    preferredLabs: any[]
    preferredPharmacies: any[]
    id: string,
    name: string,
    mrn: string,
    phone: string,
    email: string,
    address: string,
    contactInfo: any[],
    dateOfBirth: string,
    paymentInfo: string,
    firstname: string,
    lastname: string,
    middlename: string,
    profilePhoto: string,
}

interface IRequester {
    phone: IPhone,
    firstName: string,
    lastName: string,
    email: string,
    image: string,
    accessRole: string,
    userId: string,
    department: string,
    jobDesignation: string
    organizationId: string,
    identifier: string,
    id: string,
    user: User,
}

export default interface IDispenseInfo {
    id: string,
    allergies: string,
    basedOn: string,
    category: string,
    code: string
    conditions: any[]
    createdAt: string,
    deliveryLocation: string,
    detectedIssues: any[]
    dispensedAt: string
    dispenserId: string
    dosageInstruction: string,
    durationInDays: string,
    form: string,
    genericCode: string,
    genericName: string,
    identifier: string,
    intent: string,
    name: string,
    note: string,
    organizationId: string,
    courseOfTherapy: string,
    priority: string,
    requesterIdentifier: string,
    patient: IPInfo,
    patientId: string,
    performer: IPerformer,
    requester: IRequester
    medications: IMedication[],
    perfomer: string,
    performerRole: string,
    priorPrescription: string,
    priorityShipping: boolean
    reasonAgainstSubstitution: string,
    reasonCode: string,
    reasonForSubstitution: string
    reasonReference: string
    reference: string
    requestId: string,
    requesterId: string,
    statusHistory: any[]
    totalDiscount: string,
    subTotal: string,
    shippingCost: string
    coupon: string,
    safetyCapRequest: boolean
    status: string
    updatedAt: string,
    refills: [],
}
