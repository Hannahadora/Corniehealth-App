import { cornieClient } from "@/plugins/http";
import ISpecial from "@/types/ISpecial";

export async function fetchSpecials() {
  try {
    const response = await cornieClient().get("/api/v1/specialty");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as ISpecial[];
}

export async function fetchSpecialNames() {
  try {
    const response = await cornieClient().get("/api/v1/specialty/names");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as ISpecial[];
}

export async function deleteSpecial(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/specialty/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

export async function deletePractitioner(specialtyId: string,practitionerId: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/specialty/practitioner/${specialtyId}/${practitionerId}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

export async function deleteLocation(specialtyId: string, locationId: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/specialty/location/${specialtyId}/${locationId}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

