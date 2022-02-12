import IKycref  from "./IKycref";
import IDirector  from "./IDirector";
import IOwner  from "./IOwner";

export default interface IKyc {
  id?: string;
  practiceRegister: true;
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
  directors: IDirector[];
  beneficialOwners: IOwner[];
  referees: IKycref[];
}
