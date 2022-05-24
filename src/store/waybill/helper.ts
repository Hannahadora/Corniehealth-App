import { cornieClient } from "@/plugins/http";
import IWaybill from "@/types/IWaybill";

export async function fetchWaybillIncoming(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/waybill/${locationId}`);
    if (response.success) {
      return response.data.incoming;
    }
  } catch (error) {

    return [] as IWaybill[]
  }
}

export async function fetchWaybillOutgoing(locationId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/inventory/waybill/${locationId}`);
    if (response.success) {
      return response.data.outgoing;
    }
  } catch (error) {
  
    return [] as IWaybill[]
  }
}
  

