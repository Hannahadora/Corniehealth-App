import { IOrigin } from "./IEpisode";
import ILocation from "./ILocation";
import { IOrganization } from "./IOrganization";
import IPractitioner from "./IPractitioner";

export default interface IEncounter {
  id: string;
  identifier: string;
  status: string;
  type: string;
  class: string;
  priority: string;
  serviceType: string;
  appointmentId: string;
  episodeId: string;
  organizationId: string;
  patientId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  preAdmissionIdentifier: string;
  origin: IOrigin;
  destination: IOrigin;
  admitSource: IOrigin;
  readmission: string;
  dietPreference: string;
  locationId: string;
  specialCourtesy: string;
  practitionerId: string;
  practitioner: IPractitioner;
  location: ILocation;
  providerStatus: string;
  providerStartDate: string;
  providerEndDate: string;
  dischargeDisposition: string;
  episode: {
    id: string;
    name: string;
    start: string;
    end: string;
    patientId: string;
  };
  createdAt: string;
  organization: IOrganization;
}
