import { cornieClient2 } from "@/plugins/http";
import IDispense from "@/types/IDispense";
import IMedicationReq from "@/types/ImedicationReq";


export async function fetchMedReq() {
  try {
    const response = await cornieClient2().get(
      "/api/v1/medication-requests/"
    );
    if (response.success) return response.data;
  } catch (error) {}
  return [] as IMedicationReq[];
}

export async function dispenseARequest(patientId?: string) {
  try {
    const response = await cornieClient2().get(
      `/api/v1/medication-requests/dispenser?patientId=${patientId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return {} as IDispense;
}

export async function viewDispense(locationId: string, requestId: string) {
  try {
    const response = await cornieClient2().get(
      `/api/v1/pharmacy/dispense-view/${locationId}/${requestId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return {} as IDispense;
}