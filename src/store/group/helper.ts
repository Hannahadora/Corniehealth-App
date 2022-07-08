import { cornieClient } from "@/plugins/http";
import IGroup from "@/types/IGroup";
import IGroupMembers from "@/types/IGroupMembers";

export async function fetchGroups() {
  try {
    const response = await cornieClient().get("/api/v1/group");
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IGroup[]
  }
}
export async function fetchGroupMembers(groupId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/groupMembers/groupMembers/${groupId}`
    );
    if (response.success) {
      return response.data.result.filter((c:any) => c !== null);
    }
  } catch (error) {}
  return [] as IGroupMembers[];
}


export async function deleteGroup(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/group/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

export async function deleteGroupMembers(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/groupMembers/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
