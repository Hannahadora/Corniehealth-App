import Period from "./IPeriod";

export default interface IAllergy {
  id?: string;
  clinicalStatus: string;
  verificationStatus: string;
  type: string;
  category: string;
  criticality: string;
  code: string;
  onSet: OnSet;
  reaction: Reaction;
}
export interface OnSet{
    onsetDateTime: string,
    onsetAge: string,
    onsetPeriod: Period;
    onsetRange: [number,number],
    onsetString: string,
    recordedDate: string,
    recorder: string,
    asserter: string,
    lastOccurence: string,
    note: string,

  }
  export interface Reaction{
    substance: string,
    manifestation: string,
    description: string;
    onset: string,
    severity: string,
    exposureRoute: string,
    note: string,
  }
