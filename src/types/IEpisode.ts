import IPractitioner from "./IPractitioner";

export default interface IEpisode {
    id:	string,
    name: string,
    status:	string,
    type:	string,
    condition:	string,
    role:	string,
    start:	string,
    end:	string,
    patientId:	string,
    practitionerId:	string,
    updatedById:	string,
    updatedBy: IPractitioner,
    careManager: IPractitioner,
    careManagerId: string,
    createdAt: string,
}

export interface IOrigin {
    type: string,
    id: string,
}