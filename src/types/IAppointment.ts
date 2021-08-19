import Period from "./IPeriod";

export default interface IAppointment{
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
    period: {
      start: string,
      end: string
      };
    participantDetail: ParticipantDetail;
    Practitioners: [];
    Devices:[];
    Patients:[];
  }
  export interface ParticipantDetail {
      required: string;
      consultationMedium: string;
      period: Period;
  }
