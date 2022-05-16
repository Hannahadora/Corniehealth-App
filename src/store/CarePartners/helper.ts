import { cornieClient } from "@/plugins/http";
import ICarePartner from "@/types/ICarePartner";

export async function fetchCarePartners() {
  try {
    const response = await cornieClient().get("/api/v1/care-partners/");
    return response.data as ICarePartner[];
  } catch (error) {
    notify({ msg: "There was an error fetching care partners", status: "error" });
  }
  return [];
}

export async function search(payload: { q: string }) {
  try {
    const response = await cornieClient().get("/api/v1/care-partners/search",payload);
    if (response.success) return response.data as ICarePartner[];
    return [];
  } catch (error) {
    notify({ msg: "There was an error searching care partners", status: "error" });
  }
  return [];
}

export async function deleteCarepartner(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/care-partners/${id}`);
    return response.data as ICarePartner[];
  } catch (error) {
    notify({
      msg: "There was an error deleting this care partner",
      status: "error",
    });
  }
}


