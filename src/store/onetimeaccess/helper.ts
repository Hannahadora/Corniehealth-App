import { cornieClient } from "@/plugins/http";
import IOnetimeaccess from "@/types/IOnetimeaccess";
import IPatientrecords from "@/types/IPatientrecords";

export async function fetchOnetimeaccess() {
  try {
    const response = await cornieClient().get(
      "/api/v1/patient-portal/one-time-access"
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IOnetimeaccess[];
}
export async function fetchPatientrecords() {
  try {
    const response = await cornieClient().get(
      "/api/v1/patient-portal/health-record"
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IPatientrecords[];
}
  
export async function fetchOnetimeaccessHistory(accessId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/patient-portal/one-time-access/history/${accessId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IOnetimeaccess[];
}

export async function fetchOnetimeaccessComments(accessId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/patient-portal/one-time-access/comments/${accessId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IOnetimeaccess[];
}
  

