import Period from "./IPeriod";

 export interface Identified {
    identifiedDate: string;
    identifiedPeriod: Period;
    authur: string;
    implicated: string;
  }
  interface Evidence {
    code: string;
    detail: string;
    item: string;
  }
  interface Mitigation {
    action: string;
    date: string;
    author: string;
  }
  export default interface IIssues {
    id?: string;
    // updatedAt:string,
    status: string;
    code: string;
    severity: string;
    patient: string;
    identified: Identified;
    evidence: Evidence;
    mitigation: Mitigation;

  }
  