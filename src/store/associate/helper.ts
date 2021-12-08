import { cornieClient } from "@/plugins/http";
import IAssociate from "@/types/IAssociate";

export async function fetchAssociations(orgId:string) {
  try {
    const response = await cornieClient().get(`/api/v1/collection/associations/getAllByOrg/${orgId}`);
    return response.data as IAssociate[];
  } catch (error) {
    notify({ msg: "There was an error fetching collection associations", status: "error" });
  }
  return [];
}

export async function deleteAssociation(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/collection/associations/${id}`);
    return response.data as IAssociate[];
  } catch (error) {
    notify({
      msg: "There was an error deleting this collection associations",
      status: "error",
    });
  }
}
