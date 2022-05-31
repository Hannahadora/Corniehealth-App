import Period from "./IPeriod";


export interface BasicInfo {
  code: string,
  description: string,
  basedOn?  : string,
  category?: string,
  subject: string,
  encounter: string,
  partOf?: string,
  focus?: string
}

export interface Effective {
  recordDate: string;
  effectivePeriod: Period;
}

interface Problem {
  referenceType: string;
  referenceId: string;
  practitioner: string;
  practitionerSpecialty: string;
  description: string;
  details: string
}

export interface Investigation {
  code: string,
  item: {
    type: string,
    details: string,
    id: string
  }
}
interface Findings {
  itemCode: string,
  itemReference: Problem,
  basis: string
}
interface Prognosis {
  itemCode: string,
  itemReference: string,
  supportingInfo: string,
  note: string
}
interface Recorded {
  recordDate: string;
  previous: string;
  asserterId: string;
  problem: Problem[]
}
interface Protocol { 
  protocol: string;
  summary: string;
}
export default interface IImpression {
  id?: string;
  patientId: string;
  updatedAt: string;
  status: string; 
  basicInfo: BasicInfo;
  statusReason?: string;
  effective: Effective;
  investigation: Investigation[];
  findings: Findings;
  prognosis: Prognosis;
  recorded: Recorded;
  protocol: Protocol;
}
