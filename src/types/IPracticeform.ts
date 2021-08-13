export default interface IPracticeform{
    id?: string;
    organizationId: string;
    createdBy:createdBy[];
    updatedBy:updatedBy[];
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

  export interface HoursOfOperation {
    day: string;
    openTime: string;
    closeTime: string;
  }
  export interface createdBy {
      id?: string;
      firstName: string;
      lastName: string;
      email: string;
      activeState: string;
      gender: string;
      phone: {
        number: string,
        dialCode: string
      };
      address: string;
      dateOfBirth: string;
      image: string;
      jobDesignation: string;
      department: string;
      accessRole: string;
      qualificationIdentifier: string;
      qualificationIssuer: string;
      licenseNumber: string;
      communicationLanguage: string;
      availabilityExceptions: string;
      consultationChannel: string;
      hoursOfOperation: HoursOfOperation[];
      organizationId: string;
  }
  export interface updatedBy {
      id?: string;
      firstName: string;
      lastName: string;
      email: string;
      activeState: string;
      gender: string;
      phone: {
        number: string,
        dialCode: string
      };
      address: string;
      dateOfBirth: string;
      image: string;
      jobDesignation: string;
      department: string;
      accessRole: string;
      qualificationIdentifier: string;
      qualificationIssuer: string;
      licenseNumber: string;
      communicationLanguage: string;
      availabilityExceptions: string;
      consultationChannel: string;
      hoursOfOperation: HoursOfOperation[];
      organizationId: string;
  }

export interface Question{
      id?: string;
      question:string;
      name:string;
      answerType:string;
      answerOptions:string[];
}