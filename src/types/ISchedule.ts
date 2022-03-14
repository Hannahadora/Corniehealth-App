import IDevice from "./IDevice";
import IPractitioner from "./IPractitioner";
import ICatalogueService from "./ICatalogue";
import ILocation from "./ILocation";

export default interface ISchedule {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  subspecialties: string[];
  repeat:Repeat;
  availableForOnlineBooking: boolean;
  services : ICatalogueService[];
  locationId: string;
  serviceCategory: string;
  status: string;
  organizationId: string;
  slots: any[];
  participatingDevices: string[];
  participatingLocations: [];
  participatingealthCareServices:[];
  bookedPatients:[];
  waitListedPatients:[];
  practitioners: IPractitioner[];
  devices: IDevice[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  slotSize: number;
  comments: string;
  breaks: Break[];
  serviceType:string;

 

}

export interface Slot {
  date:string;
  id?: string;
  scheduleId: string;
  description: string;
  status: string;
  active: true;
  capacity: number;
  hasWaitList: true;
  comments: string;
  repeat:Repeat;
  type: string;
  name: string;
  locationId: string;
  location: ILocation[];
  meetingLink: null;
  specialties: string[];
  subspecialties: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  participatingPractitioners: IPractitioner[];
  specialtyId: string;
  waitListCapacity: number;
}

export interface Break {
  id: string;
  type: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface Repeat {
  interval: number;
  intervalUnit: string;
  days: string[];
  end: {
    type: string;
    value: string;
  };
}


