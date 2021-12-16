import { cornieClient } from "@/plugins/http";
import ICancel from "@/types/ICancel";

export async function fetchCancels() {
    try {
        const response = await cornieClient().get(
            "/api/v1/cancellations/findForUser/me"
        );

        if (response.success) {
            return response.data;
        }
    } catch (error) {}
    return [] as ICancel[];
}
