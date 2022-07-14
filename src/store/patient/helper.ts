import { cornieClient } from "@/plugins/http";
import IEncounter from "@/types/IEncounter";

export async function fetchPatients() {
  try {
    const response = await cornieClient().get("/api/v1/patient");
    return response.data;
  } catch (error) {
    window.notify({ msg: "Failed to get patients", status: "error" });
  }
  return [];
}

export async function deletePatient(id: string): Promise<boolean> {
  try {
    const response = await cornieClient().post(
      `/api/v1/patient/dissociate/${id}`,
      {}
    );
    return response.success;
  } catch (error) {
    return false;
  }
}

export async function deleteProvider(patientId: string, providerId: string): Promise<boolean> {
  try {
    const response = await cornieClient().delete(
      `/api/v1/patient/provider/${patientId}/${providerId}`
    );
    return response.success;
  } catch (error) {
    return false;
  }
}

export async function fetchPatientsEncounter(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/encounter/active-encounters/location/${locationId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IEncounter[];
}

export async function deletePatientEncounter(id: string, data:any) {
  try {
    const response = await cornieClient().patch(`/api/v1/encounter/end/${id}`, data);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
