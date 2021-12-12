import Period from './IPeriod'

interface BasicInfo {
  activityDefinition?: string;
  basedOn?: string;
  replaces?: string;
  intent?: string;
  category?: string;
  priority?: string;
  doNotPerform?: string;
}
interface RequestInfo {
  requester?: string;
  encounter?: string;
}
interface Subject {
  paymentOption?: string;
  subject?: string;
}
interface Performer {
  performerType?: string;
  performer?: string;
  locationCode?: string;
  location?: string;
}
interface Forms {
  linkForms?: string;
}
interface Request {
  requestCode?: string;
  orderDetail?: string;
  preCondition?: string;
  preconditionCode?: string;
  reasonCode?: string;
  requestReference?: string;
  supportingInfo?: string;
  specimen?: string;
  bodySite?: string;
  quantity?: string;
  ratio?: string;
  range: [number, number];
  occurenceDate?: string;
  occurencePeriod?: Period;
  occurenceTiming?: string;
  note?: string;
  patientInstructions?: string;
}
export default interface IOtherrequest {
  id?: string;
  basicInfo: BasicInfo;
  requestInfo: RequestInfo;
  subject: Subject;
  performer: Performer;
  forms: Forms;
  request: Request;
}
