import { cornieClient } from "@/plugins/http";
import { IPatientAssociation } from "@/types/IPatientAssociation";

export async function fetchFamilyAssociations() {
  try {
    const response = await cornieClient().get("/api/v1/patient-portal/family/associations");
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IPatientAssociation[]
  }
}
export async function fetchFamilyMember(familyId:string) {
  try {
    const response = await cornieClient().get(`/api/v1/patient-portal/family/member/${familyId}`);
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IPatientAssociation[]
  }
}

export async function deleteFamilyMember(associateId:string) {
  try {
    const response = await cornieClient().delete(`/api/v1/patient-portal/family/member/${associateId}/revoke`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
  

