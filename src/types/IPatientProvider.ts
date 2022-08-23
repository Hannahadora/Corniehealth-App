export interface IPatientProvider {
  id: string;
  patientId: string;
  email: string;
  name: string;
  referenceOrganization: string;
  identifier: string;
  default: boolean;
  provider:Providers;
  
}
export interface Providers {
    id?: string;
    email: string;
    identifier: string;
    name: string;
    organizationDetails: organizationDetails;
    organizationId: string;
    type: string;

}

export interface organizationDetails {
    phone: {
        number: string, 
        dialCode: string
    };
    address: string;

}