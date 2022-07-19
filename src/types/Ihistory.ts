export interface OnSet {
  range: {
    unit: "",
    min: null,
    max: null
  },
  age: {
    unit: "",
    value: null
  },
  period: {
    start: null,
    end: null
  }
}

export interface Born {
  period: {
    start: null,
    end: null
  }
  dateTime: null;
  year: null;
}
export interface Age {
  estimated: boolean;
  year: null;
  range:  {
    unit: "",
    min: null,
    max: null
  };
  age: {
    unit: "",
    value: null
  };
}
export interface Deceased {
  estimated: boolean;
  year: null;
  range:  {
    unit: "",
    min: null,
    max: null
  };
  age: {
    unit: "",
    value: null
  };
}
export default interface Ihistory {
  id?: string;
  patientId?: string;
  recordedById?: string;
  organizationId?: string;
  identifier?: string;
  name: string;
  relationship: string;
  sex: string;
  status: string;
  born: Born;
  age: Age;
  deceased: boolean;
  deceasedAge: Deceased;
  reasonCode: string;
  reasonReference: string;
  note: string;
  conditionCode: string;
  conditionOutcome: string;
  conditionContributedToDeath: boolean;
  onset: OnSet;
  onsetNote: string;
}
