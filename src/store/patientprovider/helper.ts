import { cornieClient } from "@/plugins/http";
import { IPatientProvider } from "@/types/IPatientProvider";

export async function fetchPatientProvider() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/provider/get-all-providers");
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IPatientProvider[]
  }
}

export async function fetchPrimaryDoctors() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/practitioner/default-doctor");
    if (response.success) {
      return response.data;
    }
  } catch (error) {
  
    return {}
  }
}

export async function deletePatientProvider(providerId: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/patient-portal/provider/remove/${providerId}`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
  

