import { cornieClient } from "@/plugins/http";
import IBillingCenters from "@/types/IBillingCenters";

export async function fetchBillingcenters() {
  try {
    const response = await cornieClient().get("/api/v1/billing-centres/setting");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IBillingCenters[];
}

