import { cornieClient } from "@/plugins/http";

export async function fetchPatientvisits() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/visit");

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching visits", status: "error" });
  }
  return {};
}
