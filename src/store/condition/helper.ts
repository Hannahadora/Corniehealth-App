import { cornieClient } from "@/plugins/http";
import { ICondition } from "@/types/ICondition";

export async function fetchPatientConditions(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/condition/patient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    // window.notify({
    //   status: "error",
    //   msg: "Failed to fetch patient conditions",
    // });
  }
  return [] as ICondition[];
}
export async function deleteCondition(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/condition/${id}`);
    return response.data as ICondition[];
  } catch (error) {
    notify({
      msg: "There was an error deleting this condition",
      status: "error",
    });
  }
}

