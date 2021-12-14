import Period from "./IPeriod"

export interface Effective {
  effectiveDate: string;
  effectivePeriod: Period;
  date: string;
  assessor: string;
  previous: string;
  problem: string;
}
interface Investigation {
  code: string;
  item: string;
  protocol: string;
  summary: string;
}
interface Findings {
  item: string;
  itemReference: string;
  basis: string;
  prognosis: string;
  prognosisReference: string;
  supportingInfo: string;
  note: string;
}
export default interface IImpression {
  id?: string;
  updatedAt: string;
  status: string;
  statusReason: string;
  code: string;
  description: string;
  encounter: string;
  subject: string;
  effective: Effective;
  investigation: Investigation;
  findings: Findings;
}
