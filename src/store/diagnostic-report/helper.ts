import { cornieClient } from "@/plugins/http";

export async function createReport(data: any) {
  try {
    const response = await cornieClient().post("/api/v1/diagnostic/report", data);
    return response.data;
  } catch (error) {

  }
}

export async function getReports() {
  try {
    const response = await cornieClient().get("/api/v1/diagnostics/report",);
    return response.data;
  } catch (error) {

  }
}

export async function updateReport(payload: any) {
  const { id, data } = payload
  try {
    const response = await cornieClient().put(`/api/v1/diagnostics/report/${id}`, data);
    return response.data;
  } catch (error) {

  }
}

export async function deleteReport(payload: any) {
  const { id, } = payload
  try {
    const response = await cornieClient().delete(`/api/v1/diagnostics/report/${id}`);
    return response.data;
  } catch (error) {

  }
}

export async function updateReportStatus(payload: any) {
  const { id, data } = payload
  try {
    const response = await cornieClient().put(`/api/v1/diagnostics/report/${id}`, data);
    return response.data;
  } catch (error) {

  }
}