import IPhone from "./IPhone";

export default interface IKycref {
    id?: string;
    name: string;
    email: string;
    phone: IPhone;
    notified: boolean;
  }
