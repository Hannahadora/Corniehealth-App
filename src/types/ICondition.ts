import Period from "./IPeriod";

interface Range {
  min: string;
  max: string;
}

export interface OnSet {
  dateTime: string;
  age: string;
  period: Period;
  range: Range;
  onsetString: string;
}

export interface Abatement {
  abatementDateTime: string;
  abatementAge: string;
  abatementPeriod: Period;
  abatementRange: Range;
  abatementString: string;
  recordedDate: string;
  asserter: string;
}

export interface ICondition {
  id?: string;
  patientId: string;
  practitionerId: string;
  encounterId: string;
  clinicalStatus: string;
  verificationStatus: string;
  type: string;
  category: string;
  summary: string;
  detail: string;
  notes: string;
  bodySite: string;
  subject: "patient" | "group";
  assesment: "Clinical Impression" | "Diagnostic Reports" | "Observation";
  severity: string;
  evidenceNote: string;
  code: string;
  onSet: OnSet;
  abatement: Abatement;
}
