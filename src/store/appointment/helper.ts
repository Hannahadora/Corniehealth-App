import { cornieClient } from "@/plugins/http";
import IAppointment from "@/types/IAppointment";

export async function fetchAppointments() {
  try {
    const response = await cornieClient().get(
      "/api/v1/appointment"
    );
    if (response.success){
      
      return response.data;

    } 
  } catch (error) {
    console.log(error);
  }
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
