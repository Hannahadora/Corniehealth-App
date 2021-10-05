import IDevice from "@/types/IDevice"
import IGroup from "./IGroup";
import ILocation from "./ILocation";
import { IPatient } from "./IPatient";
import IPractitioner from "./IPractitioner";

export default interface IProcedure {
    id: string,
    identifier: string,
    canonicalReference: string,
    customReference: string,
    basedOn: {
      type: string,
      id: string
    },
    partOf: {
      type: string,
      id: string
    },
    code: string,
    statusReason: string,
    category: string,
    patientId: string,
    groupId: string,
    encounterId: string,
    performedDate: string,
    performedPeriod: {
      start: string,
      end: string
    },
    performedRange: string,
    performedAge: 0,
    performedString: string,
    recorderId: string,
    asserterId: string,
    actorId: string,
    onBehalfOf: string,
    locationId: string,
    reasonCode: string,
    reasonReference: string,
    bodySite: string,
    outcome: string,
    report: string,
    status: string,
    complication: string,
    complicationDetail: string,
    followUp: string,
    note: string,
    deviceAction: string,
    deviceId: string,
    deviceManipulated: IDevice,
    deviceUsedReference: string,
    deviceUsedCode: string,
    organizationId: string,
    location: ILocation,
    asserter: IPractitioner,
    actor: IPractitioner,
    recorder: IPractitioner,
    patient: IPatient,
    group: IGroup,
  }