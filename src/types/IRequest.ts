export interface RefillSection {
  medicationId: string;
  interval: number;
  intervalUnit: string;
  startDate: string;
  quantity: number;
  supplyDuration: number;
  supplyDurationUnit: string;
}
export interface Medications {
  code:string;
  reference:string;
  courseOfTherapy:string;
  dosageInstruction:string;
  durationInDays:string;
  requestId:string;
  refills: RefillSection[];
  substitutionAllowed:boolean;
  substitutionCode?:null;
  reasonForSubstitution?:null;
  reasonAgainstSubstitution?:null;
}
export default interface IRequest {
  id?: string;
  basedOn: string;
  intent: string;
  priority: string;
  category: string;
  requesterId: string;
  patientId: string;
  dispenserId: string;
  supportingInformation: string;
  medications: Medications[];
  status: string;
  reasonCode: string;
  reasonReference: string;
  note: string;
  allergies: string[];
  conditions: string[];
  identifier: string;
  safetyCapRequest: boolean;
  deliveryLocation: string;
  priorPrescription: string;
  detectedIssues: string[];
  priorityShipping: boolean;
  performer: string;
  performerRole: string;
}
