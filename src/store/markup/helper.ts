import { cornieClient } from "@/plugins/http";
import IMarkup from "@/types/IMarkup";

export async function fetchMarkups(practitionerId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/markup-discount/findAllByOrgId/${practitionerId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IMarkup[];
}

