import { cornieClient } from "@/plugins/http";

export async function fetchSpecialistRefferal() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/specialist-referral");

    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching specialist refferal", status: "error" });
  }
  return {};
}
