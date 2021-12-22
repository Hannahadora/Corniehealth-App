import Period from "./IPeriod";

export default interface IAppointment {
  id?: string;
  serviceCategory: string;
  locationId: null;
  deviceId: null;
  serviceType: string;
  specialty: string;
  appointmentType: string;
  reasonCode: string;
  reasonRef: string;
  priority: string;
  description: string;
  supportingInfo: string;
  slot: string;
  basedOn: string;
  duration: string;
  comments: string;
  patientInstruction: string;
  period: Period;
  participantDetail: ParticipantDetail;
  Practitioners: Practitioners[];
  Devices: Devices[];
  Patients: Patients[];
  Locations: Location[];
  HealthCare: HealthCare[];
  appointmentId: string;
  comment: string;
  status: string;
}
export interface Practitioners {
  id?: string;
  type: string;
  required: string;
  consultationMedium: string;
  period: Period;
  practitionerId: string;
}
export interface Devices {
  id?: string;
  type: string;
  required: string;
  consultationMedium: string;
  period: Period;
  deviceId: string;
}
export interface Patients {
  id?: string;
  type: string;
  required: string;
  consultationMedium: string;
  period: Period;
  patientId: string;
  firstname: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  accountType: string;
  mrn: string;
}
export interface Location {
  id?: string;
  type: string;
  required: string;
  consultationMedium: string;
  period: Period;
  deviceId: string;
}
export interface HealthCare {
  id?: string;
  type: string;
  required: string;
  consultationMedium: string;
  period: Period;
  deviceId: string;
}
export interface ParticipantDetail {
  required: string;
  consultationMedium: string;
  period: Period;
}
