import { cornieClient } from "@/plugins/http";
import IMaterialRequest from "@/types/IMaterialRequest";

export async function fetchMaterialRequests(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/material-request/${locationId}`);
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IMaterialRequest[]
  }
}

