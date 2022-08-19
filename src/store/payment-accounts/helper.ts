import { cornieClient } from "@/plugins/http";
import IPayment from "@/types/IPayment";

export async function fetchPayments(patientid: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/patient/payment-account/patient/${patientid}`
    );
    if (response.success) return response.data;
  } catch (error) { }
  return [] as IPayment[];
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
