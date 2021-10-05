import { cornieClient } from "@/plugins/http";
import IEpisode from "@/types/IEpisode";
import IVital, { IEncounter } from "@/types/IVital";

export async function getVitals(patientId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/vitals/patient/${patientId}`);

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching vitals", status: "error" });
  }
  return {};
}

export async function getEncounters(patientId: string) {
  try {
    const response = await cornieClient().get(`/api/v1/encounter/patient/${patientId}`);

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching encounters", status: "error" });
  }
  return {};
}

export async function createVital(body: IVital) {
  try {
    const response = await cornieClient().post(`/api/v1/vitals`, body);
    
    if (response?.data?.id) notify({ msg: "Vitals recorded successfully", status: "success" });
    return response.data as boolean;
  } catch (error) {
    notify({ msg: "Vitals recording failed", status: "error" });
    console.log(error);
  }
}

export async function createEncounter(body: IEncounter) {
  try {
    const response = await cornieClient().post(`/api/v1/encounter`, body);

    return response.data as boolean;
  } catch (error) {
    console.log(error);
  }
}

export async function createEpisode(body: IEpisode) {
  try {
    const response = await cornieClient().post(`/api/v1/encounter/episode`, body);
    if (response?.data?.id) notify({ msg: "Episode created successfully", status: "success" });
    return response.data as boolean;
  } catch (error) {
    console.log(error);
    notify({ msg: "Episode creation failed", status: "error" });
  }
}

export async function updateVitalStatus(body: any, vitalId: string) {
  try {
    const response = await cornieClient().put(`/api/v1/vitals/status/${vitalId}`, body);
    
    notify({ msg: "Vitals status updated successfully", status: "success" });

    return response.data as boolean;
  } catch (error) {
    console.log(error);
    notify({ msg: "Vitals status updated failed", status: "error" });
  }
}
