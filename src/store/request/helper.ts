import { cornieClient } from "@/plugins/http";
import IRequest from "@/types/IRequest";

export async function fetchRequests() {
  try {
    const response = await cornieClient().get("/api/v1/medication-requests");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IRequest[];
}
export async function fetchrequestsById(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/medication-requests/patient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IRequest[];
}

export async function deleteRequest(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/requests/${id}`);
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
