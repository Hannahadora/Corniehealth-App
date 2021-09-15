import { cornieClient } from "@/plugins/http";
import IRequest from "@/types/IRequest";

export async function fetchRequests() {
  try {
    const response = await cornieClient().get("/api/v1/requests");
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
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
