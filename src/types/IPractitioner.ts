export default interface IPractitioner {
  name: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  activeState: string;
  gender: string;
  phone: string;
  address: string;
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
  organizationId: string;
}

export interface HoursOfOperation {
  day: string;
  openTime: string;
  closeTime: string;
}
