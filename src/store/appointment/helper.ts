import { cornieClient } from "@/plugins/http";
import IAppointment from "@/types/IAppointment";

export async function fetchAppointments(page = 1, limit?: number) {
  limit = limit ?? 10;
  try {
    const response = await cornieClient().get("/api/v1/appointment", {
      page,
      limit,
    });
    if (response.success) {
      const { currentPage, nextPage, numberOfPages, previousPage } = response;
      const pageInfo = { currentPage, nextPage, numberOfPages, previousPage };
      return { data: response.data, pageInfo };
    }
  } catch (error) {}
  return { data: [], pageInfo: {} };
}
export async function fetchByIdAppointments(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/appointment/getAllByPatient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IAppointment[];
}
export async function deleteAppointment(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/appointment/${id}`);
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
