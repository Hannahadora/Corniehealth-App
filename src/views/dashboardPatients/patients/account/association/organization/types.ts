export interface IPatientOrganization {
  id?: string;
  email: string;
  organizationName: string;
}

export interface IOrganizationMember {
  dateAdded: string;
  organizationId: string;
  organizationName: string;
  patientPhone?: string;
  relationship: string;
  status: "Active" | "Inactive" | "Pending";
  associationId: string;
  role: "member" | "admin";
  patientId: string;
}

export interface IPatientDependent {
  mrn: string;
  dateAdded: string;
  name: string;
  dob: string;
  gender: string;
  status: "Active" | "Inactive" | "Pending";
  paymentAccount: string;
  id: string;
  patientId: string;
}
