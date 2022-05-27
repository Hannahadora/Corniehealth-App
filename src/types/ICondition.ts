import Period from "./IPeriod";
import IPractitioner from "./IPractitioner";
import { IOrganization } from "./IOrganization";

interface Range {
  unit: string;
  min: string;
  max: string;
}

export interface Timeable {
  id?: string;
  dateTime?: string;
  age?: string;
  period?: Period;
  range?: Range;
  string?: string;
  [state: string]: any;
}

// interface OnSet extends Timeable {
//   onsetString?: string;
// }

// interface IAbatement extends Timeable {
//   asserter: string;
//   practitionerId: string;
//   conditionId: string;
// }

export interface IAssessment {
  reference: "Clinical Impression" | "Diagnostic Reports" | "Observation";
  id: string;
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

interface IOccurence {
  id?: string;
  lastOccurrence: string;
  lastOccurrenceNote: string;
  substance: string;
  manifestation: string;
  description: string;
  onSet: string;
  severity: "Mild" | "Moderate" | "Severe";
  exposureRoute: string;
  note: string;
  practitionerId: string;
  conditionId: string;
}

export interface ConditionNote {
  note: string;
  practitionerId: string;
  conditionId: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
  practitioner?: IPractitioner;
}

export interface OnSet {
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
export interface Abatement {
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


export interface ICondition {
  id?: string;
  patientId: string;
  category: string;
  bodySite: string;
  severity: string;
  code: string;
  onSet: OnSet;
  abatement: Abatement[];
  recordDate : string;
  recorderId : string;
  type : string;
  assessment : {
    id: "",
    reference: "",
    description: ""
  };
  evidence: {
    code: "",
    detail: "",
    note: ""
  },
  clinicalStatus : string;
  verificationStatus : string;



  practitionerId: string;
  organizationId: string;
  encounterId: string;
  asserterId: string;
 

  notes?: ConditionNote[];
  summary: string;
  detail: string;
  evidenceNote: string;

  verificationSatusHistory: History<VerificationStatus>[];
  clinicalStatusHistory: History<ClinicalStatus>[];
  occurences?: IOccurence[];
  createdAt: string;
  updatedAt?: string;
  practitioner?: IPractitioner;
  organization?: IOrganization;

}
