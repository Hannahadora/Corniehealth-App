import { cornieClient } from "@/plugins/http";
import IDiagnostic from "@/types/IDiagnostic";

export async function fetchDiagnostic() {
  try {
    const response = await cornieClient().get("/api/v1/diagnostic-requests");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IDiagnostic[];
}
export async function fetchDiagnosticById(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/diagnostic-requests/patient/${patientId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IDiagnostic[];
}

