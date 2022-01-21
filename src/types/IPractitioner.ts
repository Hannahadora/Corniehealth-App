import Period from "./IPeriod";
import User from "./user";

export default interface IPractitioner {
  defaultLocation: string;
  name: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  activeState: string;
  gender: string;
  createdAt: string;
  phone: {
    number: string;
    code: string;
  };
  address: string;
  user: User;
  domain: string;
  dateOfBirth: "2021-07-16";
  image: string;
  jobDesignation: string;
  department: string;
  accessRole: string;
  qualificationIdentifier: string;
  qualificationIssuer: string;
  licenseNumber: string;
  communicationLanguage: string;
  availabilityExceptions: string;
  consultationChannel: string;
  hoursOfOperation: HoursOfOperation[];
  qualificationCode?: string;
  organizationId: string;
  type: string;
  period: Period;
  locations: [];
  authorizedLocations: [];
  identifier: string;
}

export interface HoursOfOperation {
  day: string;
  openTime: string;
  closeTime: string;
  selected: boolean;
}
