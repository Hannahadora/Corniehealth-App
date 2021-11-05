
import Period from "./IPeriod";
import IAllergy from "./IAllergy"
import Phone from "./IPhone";

export default interface IProgressnote {
  id?: string;
  conditionId?: string;
  patientId?: string;
  organizationId?: string;
  practitionerId?: string;
  painScale?: {
    value: number;
    min: number;
    max: number
  };
  general?: {
    note?:  string;
    value?: string;
  };
  heent?: {
    note?:  string;
    value?: string;
  };
  skin?: {
    note?:  string;
    value?: string;
  };
  neck?: {
    note?:  string;
    value?: string;
  };
  extremities?: {
    note?:   string;
    value?:  string;
  };
  planComment?: string;
  allergies?: allergies[];
  clinicalImpressions?: clinicalImpressions[];
  diagnosticRequests?: diagnosticRequests[];
  medicationRequests?: [];
  referralRequests?: [];
  hospitalizations?: [];
  medications?: [];
}


export interface allergies {
      clinicalStatus?: string;
      verificationStatus?: string;
      patientId?: string;
      type?: string;
      category?: string;
      criticality?: string;
      code?: string;
      onSet?: {
        onsetDateTime?: string;
        onsetAge?: string;
        onsetPeriod?: {
          start?: string;
          end?: string;
        };
        onsetRange?: []
        onsetString?: string;
        recordedDate?: string;
        recorder?: string;
        asserter?: string;
        lastOccurence?: string;
        note?: string;
      };
      reaction?: {
        substance?: string;
        manifestation?: string;
        description?: string;
        onset?: string;
        severity?: string;
        exposureRoute?: string;
        note?: string;
      }
    }


     export interface clinicalImpressions {
      status?:        string;
      statusReason?:  string;
      patientId?:     string;
      code?: string;
      description?: string;
      subject?: string;
      encounter?: string;
      effective?: {
        effectiveDate?: string;
        effectivePeriod?: {
          start?: string;
          end?: string;
        };
        date?: string;
        assessor?: string;
        previous?: string;
        problem?: string;
      };
      investigation?: {},
      findings?: {}
    }

    export interface diagnosticRequests {
        basicInfo?: {
        activityDefinition?: string;
        basedOn?: string;
        replaces?: string;
        intent?: string;
        category?: string;
        priority?: string;
        doNotPerform?: string;
      };
      requestInfo?: {
        requester?: string;
        encounter?: string;
      };
      subject?: {
        subject?: string;
        paymentOption?: string;
      };
      performer?: {
        performerType?: string;
        performer?: string;
        locationCode?: string;
        location?: string;
      };
      forms?: {
        linkForms?: string;
      };
      request?: {
        requestCode?: string;
        orderDetail?: string;
        preCondition?: string;
        preconditionCode?: string;
        reasonCode?: string;
        requestReference?: string;
        supportingInfo?: string;
        specimen?: string;
        bodySite?: string;
        quantity?: string;
        ratio?: string;
        range: [];
        occurenceDate?: string;
        occurencePeriod?: {
          start?: string;
          end?: string;
        };
        occurenceTiming?: string;
        note?: string;
        patientInstructions?: string;
      }
    
    }
