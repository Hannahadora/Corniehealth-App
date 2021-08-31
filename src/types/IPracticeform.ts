import IPractitioner from "./IPractitioner";

export default interface IPracticeform {
  id?: string;
  organizationId: string;
  createdBy: IPractitioner;
  updatedBy: IPractitioner;
  formType: string;
  links: [string];
  formTitle: string;
  displayTitle: string;
  description: string;
  isTemplate: boolean;
  questions: Question[];
}
export interface Question {
  id?: string;
  question: string;
  name: string;
  answerType: string;
  answerOptions: string[];
  validation: {};
}
