export interface IPatientAssociation {
  id?: string;
  dateAdded?: string;
  patientMRN: string;
  dob?: string;
  gender: string;
  familyId?: string;
  patientId?: string;
  patientName?: string;
  relationship?: string;
  role?: string;
  status?: string;
  paymentAccounts?: [];
  accountManger?: string;
  associationId?: string;
  defaultPaymentAccountId?: string;


}
