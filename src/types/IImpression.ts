import Period from "./IPeriod";

  interface Effective {
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
    status: string;
    statusReason: string;
    code: string;
    description: string;
    encounter: string;
    effective: Effective;
    investigation: Investigation;
    findings: Findings;

  }
  