import { IPatient } from "./IPatient";
import IPractitioner from "./IPractitioner";

export default interface IVital {
  id: string;
  patientId: string;
  practitionerId: string;
  practitioner: IPractitioner;
  encounterId: string;
  identifier?: string;
  date: string;
  type: string;
  datacount?: number;
  status: string;
  bodyTemperature: {
    unit: string,
    value: number,
  };
  respiration: {
    respiratoryRate: {
      unit: string,
      value: number,
    },
    heartRate: {
      unit: string,
      value: number,
    },
    oxygenSaturation: {
      unit: string,
      value: number,
    },
    bloodGlucoseLevel: {
      unit: string,
      value: number,
    }
  },
  bloodPressure: IBloodPressure[],
  circumferences: {
    bodyHeight: {
      unit: string,
      value: number,
    },
    headCircumferences: {
      unit: string,
      value: number,
    }
  },

  bodyWeight: {
    bodyWeight: {
      unit: string,
      value: number,
    },
    bodyMassIndex: {
      unit: string,
      value: number,
    }
  }
  comments?: string;
  organizationId: string;
  patient: IPatient;
  encounter: any;
  updatedAt: string;
}

export interface IBloodPressure {
  position: string,
  systolicBloodPressure: {
    unit: string,
    value: number,
  },
  diastolicBloodPressure: {
    unit: string,
    value: number,
  }
  date?: string,
  time?: string,
}

export interface IHabit {
  key: string;
  value: string;
}

export interface Physical {
  key: string;
  value: string;
}
