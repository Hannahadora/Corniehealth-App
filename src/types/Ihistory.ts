import Period from "./IPeriod";

export interface OnSet {
  onsetPeriodAge: string;
  startAndEndDateTime: Period;
  onsetRangeString: string;
  unitOfMesurement: string;
  onsetRangeMin: number;
  onsetRangeMax: number;
}

export interface BasicInfo {
  instantiatesCanonical: string;
  instantiatesUri: string;
  status: string;
  patientId: string;
  dataAbsentReason: string;
  date: string;
  relationship: string;
  sex: string;
}

export interface ConditionRelatedPerson {
  code: string;
  outcome: string;
  contributedToDeath: string;
}
export interface Born {
  bornDateTimePeriod: string;
  bornDateTime: string;
  bornString: string;
}
export interface Age {
  age: number;
  estimatedAge: number;
  ageRangeString: String;
  unitOfMesurement: string;
  ageRangeMin: 0;
  ageRangeMax: 0;
}
export interface Deceased {
  deceased: boolean;
  deceasedDateAge: string;
  deceasedDate: string;
  deceasedRangeString: string;
  unitOfMesurement: string;
  deceasedRangeMin: number;
  deceasedRangeMax: number;
  reasonCode: string;
  reasonReference: string;
  note: string;
}
export default interface Ihistory {
  id?: string;
  patientId?: string;
  basicInfo: BasicInfo;
  conditionRelatedPerson: ConditionRelatedPerson;
  born: Born;
  age: Age;
  deceased: Deceased;
  onset: OnSet;
  practitionerId: string;
}
