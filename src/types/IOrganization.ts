import IPhone from "./IPhone";

export interface IOrganization {
  id: string;
  name: string;
  image: string;
  alias: string;
  organisationType: string;
  registrationNumber: string;
  phone: IPhone,
  domainName: string;
  identifier: string;
  providerProfile: string;
  incorporationType: string;
  website: string;
  incorporationStatus: string;
  reference: string;
  practiceType?: string;
  practiceSubType?: string;
  address?: string;
  email: string,
  createdAt: string;
  
  
}
