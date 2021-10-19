import Period from "./IPeriod";
import IPractitioner from "./IPractitioner";

interface Range {
  unit: string;
  min: string;
  max: string;
}

interface OnSet {
  dateTime?: string;
  age?: string;
  period?: Period;
  range?: Range;
  onsetString?: string;
}

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

type VerificationStatus =
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

interface IAbatement {
  id?: string;
  dateTime?: string;
  age?: string;
  period?: string;
  range?: Range;
  string?: string;
  asserter: string;
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
  practitioner?: IPractitioner
}
export interface ICondition {
  id?: string;
  patientId: string;
  practitionerId: string;
  organizationId: string;
  encounterId: string;

  notes?: ConditionNote[];

  type: string;
  category: string;
  summary: string;
  detail: string;
  bodySite: string;
  severity: string;
  evidenceNote: string;
  code: string;
  onSet: OnSet;

  assessment: IAssessment;
  clinicalStatus: ClinicalStatus;
  verificationStatus: VerificationStatus;
  verificationSatusHistory: History<VerificationStatus>[];
  clinicalStatusHistory: History<ClinicalStatus>[];
  occurences?: IOccurence[];
  abatements?: IAbatement[];
  createdAt?: string;
  updatedAt?: string;
  practitioner?: IPractitioner;
}
