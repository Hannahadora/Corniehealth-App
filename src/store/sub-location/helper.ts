import { cornieClient } from "@/plugins/http";
import ILocation from "@/types/ILocation";

export async function fetchLocation(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/location/sublocations/${id}`,
    );
    if (response.success) return response.data;
  } catch (error) { }
  return [] as ILocation[];
}

export async function fetchSubLocations(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/location/${id}`
    );
    if (response.success) return response.data;
  } catch (error) { }
  return [] as ILocation[];
}

export async function deleteLocation(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/location/sublocations/${id}`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
