import { cornieClient } from "@/plugins/http";
import IIssues from "@/types/IIssues";

export async function fetchIssues() {
  try {
    const response = await cornieClient().get("/api/v1/detected-issue");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IIssues[];
}
