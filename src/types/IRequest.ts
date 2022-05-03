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
  genericCode:null;
  genericName:string;
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
  intent: null;
  priority: string;
  category: string;
  requesterId: string;
  patientId: string;
  dispenserId: string;
  supportingInformation: string;
  medications: Medications[];
  status: string;
  reasonCode: null;
  reasonReference: null;
  note: null;
  allergies?: string[] ;
  conditions: string[];
  identifier: string;
  safetyCapRequest: boolean;
  deliveryLocation: string;
  priorPrescription: null;
  detectedIssues?: string[];
  priorityShipping: boolean;
  performer: null;
  performerRole: null;
}
