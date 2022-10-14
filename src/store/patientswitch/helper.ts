import { cornieClient } from "@/plugins/http";
import  IPatientSwtich  from "@/types/IPatientSwtich";

export async function fetchDependaantsAccount() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/security/dependents");
    if (response.success) {
      return response.data;
    }
  } catch (error) {
  
    return [] as IPatientSwtich[]
  }
}