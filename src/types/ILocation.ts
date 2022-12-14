import IPhone from "./IPhone";
export default interface ILocation {
  name: string;
  locationStatus: string;
  operationalStatus: string;
  description: string;
  alias: string;
  mode: string;
  type: string;
  phone: string;
  phoneObject: IPhone,
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  physicalType: string;
  latitude: string;
  longitude: string;
  altitude: string;
  managingOrg: string;
  partOf: string;
  availabilityExceptions: string;
  careOptions: string;
  openTo: string;
  id: string;
  hoursOfOperation: HoursOfOperation[];
}

export interface HoursOfOperation {
  day: string;
  openTime: string;
  closeTime: string;
  selected: boolean;
}
export interface AuthorizedLocation {
  address: string;
  alias: string;
  isDefault: boolean;
  id:string;
  name:string;
  currentLocation: boolean
}

