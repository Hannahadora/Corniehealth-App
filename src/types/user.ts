import EPracticeType from "./practice-type";

export default interface User {
  id: string;
  isActive: boolean;
  hasAccount: boolean;
  isOrg: boolean;
  fname: string;
  lname: string;
  phoneNo: string;
  mname: string;
  title: string;
  email: string;
  photo: string;
  [x: string]: any;
}

export interface CornieUser {
  id: string;
  firstName: string;
  email: string;
  middleName?: string;
  lastName: string;
  organizationId: string;
  image: string;
  mrn:string;
  accountType: "provider" | "patient";
  roleId: string;
  phone: {
    number: string;
    dialCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AccountMeta {
  organizationType: string;
  accountType: string;
  practiceType: EPracticeType;
  practiceSubType: string;
}
