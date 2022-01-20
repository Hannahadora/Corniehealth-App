import { cornieClient } from "@/plugins/http";
import IAppointmentTypes from "@/types/IAppointmentTypes";

export async function fetchappointmentTypes() {
  try {
    const response = await cornieClient().get("/api/v1/appointment-types");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IAppointmentTypes[];
}
export async function deleteAppointmentType(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/appointment-types/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
