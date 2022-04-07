import IMedication from './IMedication'

export default interface IMedicationReq {
    organizationId: string,
    basedOn: string,
    intent: string,
    priority: string,
    category: string,
    requesterId: string,
    patientId: string,
    dispenserId: string,
    supportingInformation: string,
    medications: IMedication[],
    status: string,
    reasonCode: string,
    reasonReference: string,
    note: string,
    allergies: [
      string
    ],
    conditions: [
      string
    ],
    identifier: string,
    statusHistory: [
      {
        value: string,
        start: string,
        end: string,
        practitionerId: string,
        practitionerName: string,
        current: boolean,
        priorPrescription: string,
        detectedIssue: string,
        eventHistory: string
      }
    ],
    safetyCapRequest: boolean,
    deliveryLocation: string,
    priorPrescription: string,
    priorityShipping: boolean,
    performer: string,
    performerRole: string,
    detectedIssues: [
      string
    ]
  }