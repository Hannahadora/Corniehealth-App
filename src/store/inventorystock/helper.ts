import { cornieClient } from "@/plugins/http";
import IInventroyStock from "@/types/IInventroyStock";

export async function fetchInventorystocks(locaitonId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/inventory/stock/${locaitonId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IInventroyStock[];
}
