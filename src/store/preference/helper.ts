import IPrefrence  from "@/types/IPrefrence";
import { cornieClient } from "@/plugins/http";

export async function fetchPreferences() {
  try {
    const response = await cornieClient().get("/api/v1/prefrences/findForUser/me");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return {} as IPrefrence;
}
