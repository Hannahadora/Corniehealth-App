import IPhone from "./IPhone";
import IKycref  from "./IKycref";

export default interface IKyc {
  id?: string;
  practiceRegister: boolean;
  incoporatedName: string;
  rcNumber: string;
  certificateOfIncoporation: string;
  formCAC: string;
  memorandumAndArticleOfAssociation: string;
  taxIdentificationNumber: string;
  country: string;
  stateRegion: string;
  city: string;
  zipCode: string;
  address: string;
  apartment: string;
  proofOfAddressUpload: string;
  particularOfDirectors: ParticularOfDirectors[];
  beneficialOwners: BeneficialOwners[];
  referees: IKycref[];
}

export interface ParticularOfDirectors {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    emailAddress: string;
    phoneNumber: IPhone;
    taxIdentificationNumber: string;
    identificationDocumentNumber: string;
    uploadedIdentificationDocument: string;
    practiceLicenseDocument: string;
    uploadedPracticeLicenseDocument: string;
    practiceLicenseNumber: string;
  }

export interface BeneficialOwners {
    name: string;
    percentage: string;
  }
