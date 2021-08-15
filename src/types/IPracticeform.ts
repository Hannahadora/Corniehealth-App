import {IPractioner} from "./IPractioner";

export default interface IPracticeform{
    id?: string;
    organizationId: string;
    createdBy:IPractioner;
    updatedBy:IPractioner;
    formType:string;
    links:[
        string
    ]
    formTitle:string;
    displayTitle:string;
    description:string;
    isTemplate:boolean;
    questions:Question[];

  }
export interface Question{
      id?: string;
      question:string;
      name:string;
      answerType:string;
      answerOptions:string[];
}