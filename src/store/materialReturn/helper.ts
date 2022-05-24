import { cornieClient } from "@/plugins/http";
import IMaterialReturn from "@/types/IMaterialReturn";

export async function fetchMaterialReturnIncoming(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/material-return/${locationId}`);
    if (response.success) {
      return response.data.incoming;
    }
  } catch (error) {

    return [] as IMaterialReturn[]
  }
}

export async function fetchMaterialReturnOutgoing(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/material-return/${locationId}`);
    if (response.success) {
      return response.data.outgoing;
    }
  } catch (error) {
  
    return [] as IMaterialReturn[]
  }
}
  

