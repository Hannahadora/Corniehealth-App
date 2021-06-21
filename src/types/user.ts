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
