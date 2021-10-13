import Period from "./IPeriod";

interface Range {
    min: string;
    max: string;
  }
  
  export interface OnSet {
    onsetAge: number;
    startAndEndDateTime: Period;
    onsetRange: Range;
    note: string;
    onsetString: string;
  }

  
 export interface BasicInfo {
    instantiatesCanonical: string;
    instantiatesUri: Period;
    status: string;
    dataAbsentReason: string;
    date: string;
    name: string;
    relationship: string;
    sex: string;
  }
 export interface Born {
    startAndEndDateTime: Period;
    bornDateTime: string;
    bornString: number;
  }
  export interface Age {
    age: number;
    ageRange: Range;
    ageString: string;
    estimatedAge: number;
  }
  export interface Deceased {
    diseasedBoolean: boolean;
    deceasedAge: number;
    deceasedRange: Range;
    deceasedDate: string;
    deceasedString: string;
    reasonCode: string;
    reasonReference: string;
    note: string;
    condition: string;
    code: string;
    outcome: string;
    contributedToDeath: string;
  }
  export default interface IImpression {
    id?: string;
    patientId?:string,
    basicInfo:BasicInfo,
    born: Born;
    age: Age;
    deceased: Deceased;
    onset: OnSet;

  }
  