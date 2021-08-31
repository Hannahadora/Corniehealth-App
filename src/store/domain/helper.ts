import { cornieClient } from "@/plugins/http";
import IDomain from "@/types/IDomain";

export async function fetchDomains() {
  try {
    const response = await cornieClient().get(
      "/api/v1/domain/myOrg/getMyOrgdomains"
    );
    console.log(response);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [] as IDomain[];
}

export async function deleteDomain(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/domain/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
