import IPractitioner from "@/types/IPractitioner";
import Ihistory from "./Ihistory";
export default interface pendingBills {
  id: string;
  encounterId: string;
  subject: string;
  childrenCount: number;
  billables: pendingBillsBillable[];
  status: string
  patientId: string
  createdBy: IPractitioner
  statusHistory: Ihistory
  paidAt: string
  total: number
  createdAt: Date
}

export interface pendingBillsBillable {
  id: string;
  quantity: number;
  serviceId: string;
  billId: string;
  catalogueService: pendingBillsBillableCatalogue[];

}

export interface pendingBillsBillableCatalogue {
  id: string;
  image: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  itemCode: string;
  serviceUOM: string;
  quantity: number;
  cost: string;
  markup: number;
  discountLimit: number;
  applyVat: boolean;
  status: "active" | "inactive" | "entered-in-error";
  organizationId: string;
  specialty: string;
  type: string;
  coverageArea: string;
  providedBy: string;
  priced: boolean;
  referralMethod: string;
  requiresAppointment: boolean;
  telecom: string;
  channelOfService: string;
  locationAvailabilities: locationAvailabilitiesOptions;
  availabilityExceptions: string
}

export interface locationAvailabilitiesOptions {
  id: string;
  locationId: string;
  serviceId: string;
  days: "mon" | "tue" | "wed" | "thu" | "fri";
}
