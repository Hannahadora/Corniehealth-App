import { cornieClient } from "@/plugins/http";
import IOtherrequest from "@/types/IOtherrequest";

export async function fetchOtherrequests() {
  try {
    const response = await cornieClient().get("/api/v1/other-requests");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IOtherrequest[];
}
export async function fetchOtherrequestsById(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/other-requests/findByPatientSubject/all/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IOtherrequest[];
}

export async function deleteOtherrequest(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/other-requests/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
export async function getPatients() {
  try {
    const response = await cornieClient().get("/api/v1/patient");
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching patients", status: "error" });
  }
  return {};
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
