import { cornieClient } from "@/plugins/http";
import IPracticeInformation from "@/types/IPracticeInformation";
import IPracticeHour from "@/types/IPracticeHours";

export async function fetchPracticeInformations() {
  try {
    const response = await cornieClient().get("/api/v1/practice-information");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IPracticeInformation[];
}

export async function fetchPracticeHours() {
  try {
    const response = await cornieClient().get("/api/v1/practice-hour");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IPracticeHour[];
}
