import { cornieClient } from "@/plugins/http";
import ICurrency from "@/types/ICurrency";

export async function fetchPayments() {
  try {
    const response = await cornieClient().get(
      "/api/v1/currency/myOrg/conversions"
    );
    if (response.success) return response.data;
  } catch (error) {
    console.log(error);
  }
  return [] as ICurrency[];
}
export async function deletePayment(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/payments/${id}`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
