import Period from './IPeriod'

interface RequestInfo {
  statusReason?: string;
  intent?: string;
  category?: string;
  priority?: string;
  doNotPerform?: string;
  reasonForProhibition?: string;
}
interface RequestDetails {
  recorder?: string;
  requester?: string;
  encounter?: string;
  reasonCode?: string;
  reasonReference?: string;
  definition?: string;
  basedOn?: string;
  supportingInformation?: string;
}
interface Subject {
  paymentOption?: string;
  subject?: string;
}
interface Performer {
  dispenserType?: string;
  dispenser?: string;
}
interface MedicationAdministration {
  performerType?: string;
  performer?: string;
}
interface Fufillment {
  nonSafetyCapRequest?: string;
  affixLabel?: string;
  fulfillmentOption?: string;
  priorityShipping?: string;
}
interface History {
  priorPrescription?: string;
  detectedIssue?: string;
  eventHistory?: string;
}
export interface MedicationDetails {
  medicationCode?: string;
  medicationReference?: string;
  courseOfTherapyType?: string;
  dosageInstruction?: string;
  initialFill?: string;
  quantity?: number;
  duration?: Period;
}
export interface Medications {
  medicationDetails: {
    medicationCode?: string;
    medicationReference?: string;
    courseOfTherapyType?: string;
    dosageInstruction?: string;
    initialFill?: string;
    quantity?: number;
    duration?: Period;
  };
  refillInfo: {
    dispenseInterval?: Period;
    numberOfRepeatsAllowed?: number;
    quantity?: number;
    expectedSupplyDuration?: number;
  };
  substitutionAllowed: {
    code?: string;
    reason?: string;
  };
}
export default interface IRequest {
  id?: string;
  requestInfo: RequestInfo;
  requestDetails: RequestDetails;
  subject: Subject;
  performer: Performer;
  medicationAdministration: MedicationAdministration;
  fufillment: Fufillment;
  history: History;
  Medications: Medications[];
}
