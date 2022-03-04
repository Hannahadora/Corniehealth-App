import IPhone from "./IPhone";

export default interface IContact {
  fname: string;
  lname: string;
  purpose: string;
  gender: string;
  image: string;
  country: string;
  state: string;
  city: string;
  phone: IPhone;
  email: string;
  address: string;
  id?: string;
}
