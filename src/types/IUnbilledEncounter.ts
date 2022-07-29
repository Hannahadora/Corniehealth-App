export default interface unbilledEncounter {
  id: string;
  identifier: string;
  status: string;
  class: string;
  serviceType: string;
  appointmentId: string;
  hospitalization: EncounterHospitalization;
  organizationId: string;
  patientId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  locationId: string;
  practitionerId: string;
  attendingPhysician: string;
  updatingPhysician: string;
  basedOn: string;
  providerName: string;
  billingStatus: "billed" | "collected" | "pending";
  createdAt: Date;
}

export interface EncounterHospitalization {
  preAdmissionIdentifier: EncounterReference;
  origin: HospitalizationOrigin;
  ward: string;
  room: string;
  bed: string;
  admitSource: string;
  readmission: boolean;
  dietPreferences: string[];
  specialCourtesy: string;
  specialAgreement: string;
  destination: string;
  dischargeDisposition: string;
}

export interface EncounterReference {
  type: "condition" | "procedure" | "observation" | "immunization";
  description: string;
  identifier: string;
  practitioner: string;
}

export interface HospitalizationOrigin {
  type: "location" | "organization";
  name: string;
  address: string;
}
