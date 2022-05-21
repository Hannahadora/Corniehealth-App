export interface IClinicalImpression {
  status: string;
  statusReason: string;
  patientId: string;
  code: string;
  description: string;
  subject: string;
  encounter: string;
  effective: {
    effectiveDate: string;
    effectivePeriod: {
      start: string;
      end: string;
    };
  };
  recorded: {
    date: string;
    assessor: string;
    previous: string;
    problem: string;
  };
  investigation: {
    code: string;
    item: string;
    protocol: string;
    summary: string;
  };
  protocol: {
    protocol: string;
    summary: string;
  },
  findings: {
    item: string;
    itemReference: string;
    basis: string;
  };
  prognosis: {
    prognosis: string;
    prognosisReference: string;
    supportingInfo: string;
    note: string;
  };
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}