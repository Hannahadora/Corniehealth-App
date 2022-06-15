import { cornieClient } from "@/plugins/http";

export async function createEncounter(data: any) {
  return await cornieClient().post("/api/v1/encounter", data);
}

export async function getEncounters(patientId: string) {
  // try {
  //   const response =
  //   return response.data;
  // } catch (error) {
  //    notify({ msg: "There was an error fetching encounters", status: "error" });
  // }
  return await cornieClient().get(`/api/v1/encounter/patient/${patientId}`);
}

export async function updateEncounter(body: any, Id: string) {
  return await cornieClient().put(`/api/v1/encounter/${Id}`, body);
}

export async function updateEncounterStatus(body: any, patientId: string) {
  return await cornieClient().patch(
    `/api/v1/encounter/status/${patientId}`,
    body
  );
}
