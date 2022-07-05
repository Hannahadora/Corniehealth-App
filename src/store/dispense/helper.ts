import { cornieClient } from "@/plugins/http";
import IDispenseInfo from "../../types/IDispenseInfo";
import IMedicationReq from "@/types/ImedicationReq";


export async function fetchMedReq(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/pharmacy/dispensed-medication/${locationId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return [] as IMedicationReq[];
}

export async function dispenseARequest(patientId?: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/medication-requests/dispenser?patientId=${patientId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return {} as IDispenseInfo;
}

export async function viewDispense(locationId: string, requestId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/pharmacy/dispense-view/${locationId}/${requestId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return {} as IDispenseInfo;
}