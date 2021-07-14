import { cornieClient } from "@/plugins/http";
import ILocation from "@/types/ILocation";

export async function fetchLocations() {
  try {
    const response = await cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    if (response.success) return response.data;
  } catch (error) {
    console.log(error);
  }
  return [] as ILocation[];
}
