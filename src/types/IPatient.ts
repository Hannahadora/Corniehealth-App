import Period from "./IPeriod";
import Phone from "./IPhone";

export interface Contact {
  id?: string;
  type: "work" | "home";
  patientId: string;
  primaryAddress: string;
  secondaryAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  state?: string;
  email?: string;
  phone?: Phone;
}
export interface Demographics {
  id?: string;
  primaryLanguage: string;
  secondaryLanguage?: string;
  race?: string;
  patientId: string;
  preferredContactChannel: string;
  primaryEthnicity: string;
  secondaryEthnicity?: string;
}
export interface Identity {
  id?: string;
  patientId: string;
  type: string;
  number: string;
}
export interface Practitioner {
  id?: string;
  patientId: string;
  practice: string;
  email: string;
  identifier: string;
  referenceOrg: string;
  default?: boolean;
}
export interface Provider {
  id?: string;
  name: string;
  email: string;
  referenceOrganization?: string;
  identifier: string;
  default?: boolean;
  patientId: string;
  type: "lab" | "pharmacy" | "clinic";
}

export interface PatientPharmacy extends Provider {
  type: "pharmacy";
}

export interface PatientLab extends Provider {
  type: "lab";
}

export interface Insurance {
  id?: string;
  type: string;
  group: string;
  payer: string;
  plan: string;
  policyNo: string;
  policyExpiry: Date | string;
  deductible: string;
  mainPolicyHolder: string;
  groupPolicyNo: string;
  patientId: string;
}

export interface RelatedPerson {
  id?: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  gender?: "male" | "female" | "other";
  relationship: string;
  mailingAddress?: string;
  city?: string;
  country?: string;
  state?: string;
  email?: string;
  postalCode?: string;
  aptNumber?: string;
  primaryPhone: Phone;
  secondaryPhone?: Phone;
  patientId: string;
  organization?: string;
  period?: Period;

  type: string;
}
export interface authorizedPractitioners {
  id?: string;
  patient_authorized_practitioners: string;
  user: {}
}

export interface Guarantor extends RelatedPerson {
  type: "guarantor";
}
export interface EmergencyContact extends RelatedPerson {
  type: "emergency-contact";
}

// export interface authorizedPractitioners {
//   id?: string;
//   patient_authorized_practitioners?: object;
//   user?: object;
// }

export interface IPatient {
  id?: string;
  mrn?: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  maritalStatus?: "single" | "married" | "divorced" | "seperated";
  multipleBirths?: boolean;
  multipleBirthInteger?: number;
  identityNos?: Identity[];
  contactInfo?: Contact[];
  generalPractitioners?: Practitioner[];
  emergencyContacts?: EmergencyContact[];
  preferredLabs?: PatientLab[];
  preferredPharmacies?: PatientPharmacy[];
  guarantor?: Guarantor;
  userId?: string;
  accountType?: "individual" | "family" | "corporate";
  vip?: boolean;
  insurances?: Insurance[];
  deceased?: boolean;
  demographicsData?: Demographics;
  belongsToPractice?: boolean;
  profilePhoto?: string;
  authorizedPractitioners?: authorizedPractitioners[];
}
