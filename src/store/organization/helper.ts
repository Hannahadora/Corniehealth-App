import { cornieClient } from "@/plugins/http";
import { IOrganization } from "@/types/IOrganization";

export async function fetchOrganization(): Promise<IOrganization | void> {
  try {
    const response = await cornieClient().get("/api/v1/organization/myOrg/get");
    return response.data as IOrganization;
  } catch (error) {
    window.notify({ msg: "Could not fetch organization", status: "error" });
  }
}
