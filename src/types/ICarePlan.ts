export default interface ICarePlan {
  id: string;
  patientId: string;
  practitionerId: string;
  organizationId: string;
  instantiatesUri: string;
  basedOn: string;
  replaces: string;
  partOf: string;
  intent: string;
  status: string;
  author: string;
  contributor: string;
  careTeam: string;
  category: string;
  addresses: string;
  referenceEncounter: string;
  title: any;
  description: string;
  startDate: string;
  endDate: string;
  reference: string;
  outcomeReference: string;
  progress: string;
  outcome: string;
  detail: IPlanDetail;
  scheduleTiming: {
    date: null,
    location: string,
    performer: string,
    period: {
      start: null,
      end: null,
    }
  };
  product: {
    productCode: string;
    productReference: string;
    dailyAmount: string;
    quantity: string;
    description: string;
    note: string;
  };
  startTime: string;
  endTime: string;
  ReasonCode: string;
  reasonReference: string;
}

export interface IPlanDetail {
  reasonCode: string,
    goal: string,
    status: string,
    statusReason: string,
    doNotPerform: boolean,
    reasonReference : string,
}
