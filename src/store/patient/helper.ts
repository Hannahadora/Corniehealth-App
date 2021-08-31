import { cornieClient } from "@/plugins/http";

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
    const response = await cornieClient().delete(`/api/v1/patient/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}
