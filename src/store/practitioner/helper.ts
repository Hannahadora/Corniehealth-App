import { cornieClient } from "@/plugins/http";
import IPractitioner from "@/types/IPractitioner";

export async function fetchPractitioners() {
    try {
        const response = await cornieClient().get("/api/v1/practitioner");
        if (response.success) return response.data;
    } catch (error) {}
    return [] as IPractitioner[];
}

export async function deletePractitioner(id: string) {
    try {
        const response = await cornieClient().delete(`/api/v1/practitioner/${id}`);
        if (response.success) return true;
    } catch (error) {
        return false;
    }
    return false;
}
