import { cornieClient } from "@/plugins/http";

export async function createEncounter(data: any) {
  try {
    const response = await cornieClient().post("/api/v1/encounter", data);
    if (response.success) {
      notify({ msg: "Encounter recorded successfully", status: "success" });

      return response.data;
    }
  } catch (error) {
    console.log("error", error);
  }
}

export async function getEncounters(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/encounter/patient/${patientId}`
    );

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching encounters", status: "error" });
  }
  return {};
}

export async function updateEncounter(body: any, Id: string) {
  try {
    const response = await cornieClient().put(`/api/v1/encounter/${Id}`, body);

    notify({ msg: "Encounter updated successfully", status: "success" });

    return response.data as any;
  } catch (error) {
    notify({ msg: "Encounter update failed", status: "error" });
  }
}

export async function updateEncounterStatus(body: any, patientId: string) {
  try {
    const response = await cornieClient().patch(
      `/api/v1/encounter/status/${patientId}`,
      body
    );

    notify({ msg: "Encounter status updated successfully", status: "success" });

    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Encounter status update failed", status: "error" });
  }
}
