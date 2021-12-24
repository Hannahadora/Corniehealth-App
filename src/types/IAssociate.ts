export default interface IAssociate {
  id?: string;
  location: string;
  paymentCategories: [];
  accounts: [];
  associatedAccounts:[];
  defaultAccount: string;
}
