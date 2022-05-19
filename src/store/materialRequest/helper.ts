import { cornieClient } from "@/plugins/http";
import IMaterialRequest from "@/types/IMaterialRequest";

export async function fetchMaterialRequestsIncoming(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/material-request/${locationId}`);
    if (response.success) {
      return response.data.incoming;
    }
  } catch (error) {

    return [] as IMaterialRequest[]
  }
}

export async function fetchMaterialRequestsOutgoing(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/material-request/${locationId}`);
    if (response.success) {
      return response.data.outgoing;
    }
  } catch (error) {
  
    return [] as IMaterialRequest[]
  }
}
  

