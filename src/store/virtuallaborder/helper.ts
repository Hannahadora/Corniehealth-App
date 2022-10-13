import { cornieClient } from "@/plugins/http";
import  IVirtuallaborder  from "@/types/IVirtuallaborder";

export async function fetchVirtualLabOrder(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/lab-order-items/${locationId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IVirtuallaborder[];
}