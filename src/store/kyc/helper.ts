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
export async function deleteRefree(id: string) {
    try {
        const response = await cornieClient().delete(
            `/api/v1/kyc/referee/${id}`
        );
        if (response.success) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}
