import ILocation from "./ILocation"
import { IPatient } from "./IPatient";

export default interface IVisit {
    id: string,
    appointmentId: string,
    organizationId: string,
    patientId: string,
    type: string,
    status: string,
    roomId: string,
    checkInTime: string,
    checkOutTime: string,
    notes: string,
    followUpId: string,
    slotId: string,
    room: ILocation,
    practitioners: [
      string
    ],
    patient: IPatient,
    timelines: [
      {
        action: string,
        createdAt: string,
        visitId: string
      }
    ],
    startTime: string
  }