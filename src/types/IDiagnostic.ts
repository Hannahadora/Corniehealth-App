export default interface IDiagnostic {
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
    note: string;
    identifier: string;
    safetyCapRequest: boolean;
    deliveryLocation: string;
    priorPrescription: string;
    priorityShipping: boolean;
    performer: string;
    performerRole: string;
    patientInstructions: null;

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
    asNeeded: null;
    asNeededCode: null;
    forms: string[];
  }
  