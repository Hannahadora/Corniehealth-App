import { cornieClient } from "@/plugins/http";
import IUserrefferal from "@/types/IUserrefferal";

export async function fetchUserrefferral() {
  try {
    const response = await cornieClient().get("/api/v1/general/referrals");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IUserrefferal[];
}