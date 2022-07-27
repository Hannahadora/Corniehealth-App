import { cornieClient } from "@/plugins/http";
import ICollectionCenters from "@/types/ICollectionCenters";

export async function fetchCollectionCenters() {
  try {
    const response = await cornieClient().get("/api/v1/collection-centres/setting");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as ICollectionCenters[];
}

