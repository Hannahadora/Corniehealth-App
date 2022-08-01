import { cornieClient } from "@/plugins/http";
import IAppointmentRoom from "@/types/IAppointmentRoom";

export async function fetchAppointmentrooms(page = 1, limit?: number) {
  limit = limit ?? 10;
  try {
    const response = await cornieClient().get("/api/v1/appointment-rooms", {page, limit});
    const { currentPage, nextPage, numberOfPages, previousPage} = response;
    const pageInfo = {currentPage, nextPage, numberOfPages, previousPage }
    return {data: response.data, pageInfo};
  } catch (error) {
    notify({ msg: "There was an error fetching schedules", status: "error" });
  }
  return {data:[], pageInfo:{}};
}
export async function fetchByIdAppointmentsRooms(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/appointment-rooms/findAllByLocationId/${locationId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IAppointmentRoom[];
}
export async function deleteAppointmentroom(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/appointment-rooms/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
