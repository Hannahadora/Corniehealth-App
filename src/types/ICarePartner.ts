import IEmail from "./IEmail"
import IPhone from "./IPhone"

export default interface ICarePartner {
  id?: string;
  name: string;
  organisationType: string;
  email: string | IEmail;
  phone?: IPhone;
  address?: string;
  alias?: string;
  incorporationType?: string;
  domainName?: string;
  registrationNumber?: string;
  website?: string;
  providerProfile?: string;
  identifier?: string;
  image?: string;
}