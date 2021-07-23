export default interface IHealthCareService {
    id?: string;
    name: string;
  activeState: string;
  eligibilityComment: string;
  provisionCode: string;
  eligibilityCode: string;
  coverageArea: string;
  type: string;
  phone: string;
  address: string;
  characteristics: string;
  communication: string;
  photo: string;
  specialty: string;
  referralMethod: string;
  appointmentRequired: string;
  providedBy: string;
  category: string;
  notAvailableDescription: string;
  notAvailableDateRange: string;
  notAvailableChannel: string;
  availabilityExceptions: string;
  extraDetails: string;
  comment: string;
 hoursOfOperation: HoursOfOperation[];
}
export interface HoursOfOperation {
  day: string;
  openTime: string;
  closeTime: string;
}