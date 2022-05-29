import { cornieClient } from "@/plugins/http";
import IAllergy from "@/types/IAllergy";

export async function fetchProgressNote(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/progress-notes/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log("fetch error", error);
  }
  return [];
}

export async function createProgressNote(data: any) {
  try {
    const response = await cornieClient().post("/api/v1/progress-notes", data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as any[];
}

export async function updateProgressNote(patientId: string, data: any) {}

export async function fetchAllergys(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/allergy/findAllByPatient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IAllergy[];
}

export async function deleteAllergy(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/allergy/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
export async function getPractitioners() {
  try {
    const response = await cornieClient().get("/api/v1/practitioner");
    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error fetching practitoners",
      status: "error",
    });
  }
  return {};
}
