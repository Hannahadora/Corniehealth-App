import { cornieClient } from "@/plugins/http";
import IAllergy from "@/types/IAllergy";
import { string } from "yup/lib/locale";
import IAppointmentRoom from "@/types/IAppointmentRoom";

export async function fetchAllAllergys() {
  try {
    const response = await cornieClient().get("/api/v1/allergy");
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [] as IAllergy[];
}
export async function fetchAllergys(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/allergy/findAllByPatient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [] as IAllergy[];
}

export async function fetchAppointmentrooms() {
  console.log("response");
  try {
    const response = await cornieClient().get(`/api/v1/appointment-rooms`);
    if (response.success) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
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
