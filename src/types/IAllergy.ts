export default interface IAllergy {
  id?: string;
  clinicalStatus: string;
  verificationStatus: string;
  type: string;
  category: string;
  criticality: string;
  code: string;
  onSet: OnSet;
  reaction: Reaction;
  recorderId : string;
  asserterId : string;
  occurences : Occurrences[];
  recordDate : string;
  note: string;
  patientId: string;
  practitionerId: string;
  verificationStatusHistory: History<VerificationStatus>[];
  clinicalStatusHistory: History<ClinicalStatus>[];
  updatedAt: string;
}

interface History<T> {
  value: T;
  current: boolean;
  start: string;
  end?: string;
  practitionerId: string;
  practitionerName?: string;
}

export type VerificationStatus =
  | "unconfirmed"
  | "provisional"
  | "differential"
  | "confirmed"
  | "refuted"
  | "entered-in-error";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";


export interface OnSet {
  onsetDateTime: string;
  onsetAge: string;
  onsetPeriod: {
    start: string,
    end: string,
    startTime: string,
    endTime: string
  };
  onsetRange: [];
  recordedDate: string;
  recorder: string;
  asserter: string;
  lastOccurence: string;
  note: string;
  dateTime: string;
  age: {
    unit: "",
    value: 0
  };
  period:{
    start: string,
    end: string,
    startTime: string,
    endTime: string
  };
  range:{
    unit: string,
    min: number,
    max: number
  };
  string: string;

}
export interface Reaction {
  substance: string;
  manifestation: string;
  description: string;
  onset: string;
  severity: string;
  exposureRoute: string;
  note: string;
}

export interface Occurrences {
  time: string;
}