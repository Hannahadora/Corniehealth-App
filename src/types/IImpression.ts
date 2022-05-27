import Period from "./IPeriod";

export interface BasicInfo {
  code: string;
  description: string;
}
export interface Effective {
  effectiveDate: string;
  effectivePeriod: Period;
}
interface Investigation {
  code: string;
  item: string;
}
interface Findings {
  item: string;
  itemReference: string;
  basis: string;
}
interface Prognosis {
  prognosis: string;
  prognosisReference: string;
  supportingInfo: string;
  note: string;
}
interface Recorded {
    date: string,
    assessor: string,
    previous: string,
    problem: string,
}
interface Protocol { 
  protocol: string;
  summary: string;
}
export default interface IImpression {
  id?: string;
  updatedAt: string;
  status: string;
  statusReason: string;
  basicInfo: BasicInfo
  encounter: string;
  subject: string;
  effective: Effective;
  investigation: Investigation;
  findings: Findings;
  prognosis: Prognosis;
  recorded: Recorded;
  protocol: Protocol;
  // recorded: [];
}
