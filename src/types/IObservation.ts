import { IObservationBasicInfo } from "./IObservationBasicInfo"
import { IObservationValue } from "./IObservationValue"

export interface IObservation  {
   id: string,
   organizationId: string,
   patientId: string,
   practitionerId: string,
   encounterId: string,
   status: string,
   statusHistory: [
      {
       value:string,
       start: string,
       end: string,
       practitionerId: string,
       practitionerName:string,
       current: boolean,
       priorPrescription:string,
       detectedIssue:string,
       eventHistory:string
      }
    ],
   basicInfo: IObservationBasicInfo,
   effective: {
     effectiveDate: string,
     effectivePeriod: {
       start: string,
       end: string,
       startTime: string,
       endTime: string
      },
     date: string,
     assessor:string,
     previous:string,
     problem:string,
     period: {
       start: string,
       end: string,
       startTime: string,
       endTime: string
      },
     dateTime:string,
     instant: {
       dateTime:string,
       timeZone:string
      }
    },
   issueInfo: {
     issued:string,
     performer:string,
     resultInterpreter:string,
     dateTime:string
    },
   value: IObservationValue,
   reasonInfo: {
     dateAbsentReason:string,
     note:string,
     method:string,
     device:string,
     interpretation:string,
     bodysite:string,
     specimen:string
    },
   referenceRange: {
     low:string,
     high:string,
     type:string,
     age:string,
     appliesTo:string,
     text:string
    },
   member: {
     hasMemer:string,
     derivedFrom:string
    }
  }