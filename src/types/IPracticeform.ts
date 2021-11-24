import Period from "./IPeriod";
import Practitioner from "./IPractitioner";

export default interface IPracticeform {
  id?: string;
  identifier?: string;
  name: string;
  status: string;
  type: FormType;
  experimental: boolean;
  subjectType: string;
  purpose: string;
  copyright: { name: string; year: number };
  approvalDate: string;
  effectivePeriod: Period;
  code: string;
  organizationId: string;
  createdById: string;
  updatedById?: string;
  approverId?: string;
  sections: Section[];
  archivedAt?: string;

  createdBy?: Practitioner;
  approvedBy?: Practitioner;
  updatedBy?: Practitioner;
}

// export interface items {
//   question:string;
//   name:string;
//   answerType:string;
//   answerOptions:[string];
//   prefix:string;

//  }
 export type AnswerType =
  | "boolean"
  | "decimal"
  | "integer"
  | "date"
  | "datetime"
  | "time"
  | "string"
  | "text"
  | "url"
  | "Choice"
  | "openChoice"
  | "attachment"
  | "reference"
  | "quantity";

 export interface Question {
  id?: string;
  question: string;
  answerType: AnswerType;
  answerOptions?: Array<string>;
  name: string;
  prefix: string;
}

export interface Questionmain {
  id?: string;
  question: string;
  answerType: AnswerType;
  answerOptions?: Array<string>;
  name: string;
  prefix: string;
}
export interface QuestionGroup {
  name: string;
  prefix: string;
  text: string;
  items: Array<Questionmain | Displaymain>;
}

export type Display = string;

export type Displaymain = string; 

export interface Section {
  items: Array<QuestionGroup | Question | Display>;
}

export type FormType = "questionnaire" | "survey";