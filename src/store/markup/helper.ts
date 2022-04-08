import { cornieClient } from "@/plugins/http";
import IMarkup from "@/types/IMarkup";

export async function fetchMarkups() {
  try {
    const response = await cornieClient().get(
      "/api/v1/markup-discount"
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IMarkup[];
}
export async function fetchMarkupId(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/markup-discount/location/${locationId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IMarkup[];
}
