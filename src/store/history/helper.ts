import { cornieClient } from "@/plugins/http";
import Ihistory from "@/types/Ihistory";

export async function fetchHistorys(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/family-history/get-for-patient/${"1ca76818-8586-4e00-bae8-7f4619f2b581"}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as Ihistory[];
}

export async function deleteHistory(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/family-history/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
