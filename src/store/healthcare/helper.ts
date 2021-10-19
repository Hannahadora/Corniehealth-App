import { cornieClient } from "@/plugins/http";
import IHealthcare from "@/types/IHealthcare";

export async function fetchHealthcares() {
  try {
    const response = await cornieClient().get(
      "/api/v1/HealthCareService/myOrg/getMyOrgHealthCareServices"
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [] as IHealthcare[];
}
export async function deleteHealthcare(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/healthCareService/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
