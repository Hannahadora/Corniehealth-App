import ILocation from "./ILocation"
import { IOrganization } from "./IOrganization"
import IPractitioner from "./IPractitioner"

export default interface IEncounter {
    id: string,
    identifier: string,
    status: string,
    type: string,
    class: string,
    priority: string,
    serviceType: string,
    appointmentId: string,
    episodeId: string,
    organizationId: string,
    patientId: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    preAdmissionIdentifier: string,
    origin: string,
    admitSource: string,
    readmission: string,
    dietPreference: string,
    locationId: string,
    specialCourtesy: string,
    practitionerId: string,
    practitioner: IPractitioner,
    organization: IOrganization,
    location: ILocation,
    episode: {
      id: string,
      name: string,
      start: string,
      end: string,
      patientId: string
    }
  }