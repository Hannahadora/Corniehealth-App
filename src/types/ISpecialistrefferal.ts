export default interface ISpecialistrefferal {
    id?: string;
    status: string;
    basedOn: string;
    intent: string;
    priority: string;
    category: string;
    requesterId: string;
    patientId: string;
    dispenserId: string;
    supportingInformation: string;
    reasonCode: null;
    reasonReference: null;
    note: null;
    identifier: string;
    safetyCapRequest: boolean;
    deliveryLocation: string;
    priorPrescription: string;
    priorityShipping: boolean;
    performer: string;
    performerRole: string;
    patientInstruction: null;

    orderDetail: string;
    requestDescription: string;
    bodySite: string;
    quantityUnit: string;
    quantityValue: string;
    organizationId: string;
    encounterId: null;
    performerId: string;
    locationId: string;
    occurenceUnit: string;
    occurenceValue: string;
    replaces: null;
    asNeeded: boolean;
    asNeededCode: null;
    forms: string[];

    specialty: string;
    performerLocationId: string;
    requestDescriptions: string;
  }
  