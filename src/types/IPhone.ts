export default interface IPhone {
  id?: string;
  organizationId?: string;
  number: string;
  dialCode: string;
  verified?: boolean;
  createdAt?: string | Date;
  updateAt?: string | Date;
}
