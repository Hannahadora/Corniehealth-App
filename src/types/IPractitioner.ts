import { HoursOfOperation } from "./ILocation";

export { HoursOfOperation };
export default interface IPractitioner {
  id: string;
  firstName: string;

  lastName: string;

  email: string;

  activeState: string;

  gender: string;

  phone: string;

  address: string;

  dateOfBirth: string;

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
  organizationId: string;
}
