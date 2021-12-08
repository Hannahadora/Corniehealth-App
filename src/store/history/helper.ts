import { cornieClient } from "@/plugins/http";
import Ihistory from "@/types/Ihistory";

export async function fetchHistorys(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/family-history/findAllByPatient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
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
