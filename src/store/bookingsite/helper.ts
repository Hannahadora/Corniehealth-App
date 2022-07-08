import { cornieClient } from "@/plugins/http";
import IBookingsite from "@/types/IBookingsite";

export async function fetchBookingsite() {
  try {
    const response = await cornieClient().get("/api/v1/booking-site");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IBookingsite[];
}
export async function deleteBookingsite(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/booking-site/${id}`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
