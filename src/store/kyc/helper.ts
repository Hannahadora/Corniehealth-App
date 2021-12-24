import { cornieClient } from "@/plugins/http";
import IKyc from "@/types/IKyc";

export async function fetchKycs() {
    try {
        const response = await cornieClient().get("/api/v1/kyc");
        if (response.success) {
            return response.data;
        }
    } catch (error) {}
    return [] as IKyc[];
}
