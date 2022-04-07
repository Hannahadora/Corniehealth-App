import { cornieClient } from "@/plugins/http";
import IRefferal from "@/types/IRefferal";

export async function fetchRefferal() {
  try {
    const response = await cornieClient().get("/api/v1/referral-requests");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IRefferal[];
}
export async function fetchRefferalById(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/referral-requests/patient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IRefferal[];
}

