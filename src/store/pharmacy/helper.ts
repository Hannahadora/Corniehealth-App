import { cornieClient } from "@/plugins/http";
import IDispense from "@/types/IDispense";

export async function fetchDispenses(locationId: string, requestId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/pharmacy/dispense-view/${locationId}/${requestId}`
    );
    if (response.success) return response.data;
  } catch (error) {}
  return [] as IDispense[];
}
