import Period from "./IPeriod"

interface Range {
  unit: string;
  min: string;
  max: string;
}

export interface Timeable {
  id?: string;
  dateTime?: string;
  age?: string;
  period?: Period;
  range?: Range;
  string?: string;
  [state: string]: any;
}
