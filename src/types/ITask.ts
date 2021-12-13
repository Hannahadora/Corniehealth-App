import Period from "./IPeriod"

export default interface ITask {
  id?: string;
  activityDefinition: string;
  description: string;
  intent: string;
  priority: string;
  statusReason: string;
  businessStatus: string;
  status: string;
  code: string;
  for: string;
  performerType: string;
  owner: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  recipient: string;
  excecutionPeriod: Period;
  basedOn: string;
  partOf: string;
  reasonCode: string;
  reasonReference: string;
  note: string;
  focus: string;
  encounter: string;
  repitition: string;
  inputType: string;
  inputValue: string;
  outputType: string;
  outputValue: string;
}
