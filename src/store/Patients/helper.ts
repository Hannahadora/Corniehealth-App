import { cornieClient } from "@/plugins/http";

export async function fetchPatients() {
  try {
    const response = await cornieClient().get("/api/v1/patient");
    return response.data;
  } catch (error) {
    window.notify({ msg: "Failed to get patients", status: "error" });
  }
  return [];
}
