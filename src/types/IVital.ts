import ILocation from "./ILocation";
import { IOrganization } from "./IOrganization";
import { IPatient } from "./IPatient"
import IPractitioner from "./IPractitioner";

export default interface IVital {
    id: string,
    patientId: string,
    practitionerId: string,
    practitioner: IPractitioner,
    encounterId: string,
    identifier: string,
    date: string,
    type: string,
    datacount: number,
    status: string,
    temperature: {
      unit: string,
      value: number
    },
    pulse: number,
    respiratoryRate: number,
    oxygenSaturation: number,
    height: {
      unit: string,
      value: number
    },
    weight: {
      unit: string,
      value: number
    },
    bloodPressure: IBloodPressure[],
    habits: IHabit[],
    comments: string,
    headCircumference: {
      unit: string,
      value: number
    },
    physicals: Physical[],
    organizationId: string,
    patient: IPatient,
    encounter: any,
    updatedAt: string,
  }

  export interface IEncounter {
    id: string,
    identifier: string,
    status: string,
    type: string,
    class: string,
    priority: string,
    serviceType: string,
    appointmentId: string,
    episodeId: string,
    organizationId: string,
    patientId: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    preAdmissionIdentifier: string,
    origin: string,
    admitSource: string,
    readmission: string,
    dietPreference: string,
    locationId: string,
    specialCourtesy: string,
    practitionerId: string,
    practitioner: IOrganization,
    organization: IOrganization,
    location: ILocation,
    episode: {
      id: string,
      name: string,
      start: string,
      end: string,
      patientId: string
    }
  }

  export interface IBloodPressure {
    type: string,
    position: string,
    measurement: {
      unit: string,
      value: number
    }
  }

  export interface IHabit {
    key: string,
    value: string
  }

  export interface Physical {
    key: string,
    value: string
  }