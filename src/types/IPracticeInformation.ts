import IPhone from "./IPhone";

export default interface IPracticeInformation {
  id?: string;
  email: string;
  website: string;
  contactNumbers: [IPhone];
  address: string;
  siteMessage: string;
}
