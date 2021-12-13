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
    scheduleTiming: string;
    startDate: string;
    endDate: string;
    location: string;
    performer: string;
  };
  product: {
    productCode: string;
    productReference: string;
    dailyAmount: string;
    quantity: string;
    description: string;
    note: string;
  };
}

export interface IPlanDetail {
  kind: string;
  instantiatesCanonical: string;
  instantiatesUri: string;
  code: string;
  reasonCode: string;
  referenceCode: string;
  goal: string;
  status: string;
  statusReason: string;
  doNotPerform: true;
}
