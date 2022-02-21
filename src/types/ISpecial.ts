import IPractitioner from "./IPractitioner";
import ILocation from "./ILocation";
import IHealthCareService from "./IHealthcare";

export default interface ISpecial {
  id: string;
  name: string;
  status: string;
  locations: ILocation[];
  practitioners: IPractitioner[];
  services: IHealthCareService[];

}

