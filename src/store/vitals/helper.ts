import { cornieClient } from "@/plugins/http";
import IEncounter from "@/types/IEncounter";
import IEpisode from "@/types/IEpisode";
import IVital from "@/types/IVital";

export async function getVitals(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/vitals/signs/patient/${patientId}`
    );

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching vitals", status: "error" });
  }
  return {};
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

export async function getEpisodes(patientId: string) {
  try {
    // const response = await cornieClient().get(`/api/v1/encounter/episode`);
    const response = await cornieClient().get(
      `/api/v1/encounter/patient/${patientId}`
    );

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching encounters", status: "error" });
  }
  return {};
}

export async function createVital(body: IVital) {
  try {
    const response = await cornieClient().post("/api/v1/vitals/signs", body);

    if (response?.data?.id)
      notify({ msg: "Vitals recorded successfully", status: "success" });
    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Vitals recording failed", status: "error" });
  }
}

export async function createEncounter(body: IEncounter) {
  try {
    const response = await cornieClient().post("/api/v1/encounter", body);
    notify({ msg: "Encounter recorded successfully", status: "success" });

    return response.data;
  } catch (error) {
    notify({ msg: "Operation failed", status: "error" });
  }
}

export async function createEpisode(body: IEpisode) {
  try {
    const response = await cornieClient().post(
      "/api/v1/encounter/episode",
      body
    );
    if (response?.data?.id)
      notify({ msg: "Episode created successfully", status: "success" });
    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Episode creation failed", status: "error" });
  }
}

export async function updateVitalStatus(body: any, vitalId: string) {
  try {
    const response = await cornieClient().put(
      `/api/v1/vitals/signs/status/${vitalId}`,
      body
    );

    notify({ msg: "Vitals status updated successfully", status: "success" });

    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Vitals status updated failed", status: "error" });
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

export async function updateEpisodeStatus(body: any, patientId: string) {
  try {
    const response = await cornieClient().put(
      `/api/v1/encounter/episode/status/${patientId}`,
      body
    );

    notify({ msg: "Episode status updated successfully", status: "success" });

    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Episode status update failed", status: "error" });
  }
}
