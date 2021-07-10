import { IndexableObject } from "@/lib/http";
import { cornieClient } from "@/plugins/http";
import localstore from "@/plugins/localstore";
import IPayment from "@/types/IPayment";

export async function fetchPayments(): Promise<IPayment[]> {
  try {
    const res = await cornieClient().get("/api/v1/payments/myOrg/getMyOrgPayments");
    return res.data.devices as IPayment[];
  } catch (error) {
    console.log("there was an error");
  }
  return [];
}
