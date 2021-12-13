import IDevice from './IDevice'
import IHealthCareService from './IHealthcare'
import IPractitioner from './IPractitioner'

export default interface ISchedule {
  id: string;
  name: string;
  description: string;
  scheduleType: string;
  days: string[];
  locationId: string;
  serviceCategory: string;
  serviceType: string;
  specialty: string;
  status: string;
  organizationId: string;
  slots: any[];
  practitioners: IPractitioner[];
  healthcareServices: IHealthCareService[];
  devices: IDevice[];
  startDate: string | Date;
  endDate: string | Date;
  startTime: string;
  endTime: string;
  slotSize: number;
  comments: string;
  breaks: Break[];
}

export interface Slot {
  startTime?: string;
  endTime?: string;
  id?: string;
  scheduleId?: string;
  description?: string;
  status?: string;
  active?: true;
  capacity?: 0;
  hasWaitList?: true;
  comments?: string;
  repeat?: Repeat;
}

export interface Repeat {
  year: number;
  month: number;
  week: number;
  everyDayOfSchedule: boolean;
}

export interface Break {
  id: string;
  type: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
}
