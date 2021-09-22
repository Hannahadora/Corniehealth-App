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
  appointmentId: string;
  comment: string;
  status: string;
}
export interface Practitioners{
  id: string;
  type: string,
  required: boolean,
  consultationMedium: string,
  period: Period;
}
export interface Devices{
  id: string;
  type: string,
  required: boolean,
  consultationMedium: string,
  period: Period;
}
export interface Patients {
  id: string;
  type: string,
  required: boolean,
  consultationMedium: string,
  period: Period;
  firstname: string,
  lastname: string,
  gender: string,
  dateOfBirth: string,
  accountType: string,
  mrn: string,
}

export interface ParticipantDetail {
  required: string;
  consultationMedium: string;
  period: Period;
}

