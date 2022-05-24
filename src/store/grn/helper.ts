import { cornieClient } from "@/plugins/http";
import IGrn from "@/types/IGrn";

export async function fetchGrns() {
  try {
    const response = await cornieClient().get("/api/v1/inventory/grn");
    if (response.success) {
      return response.data;
    }
  } catch (error) {

    return [] as IGrn[]
  }
}

