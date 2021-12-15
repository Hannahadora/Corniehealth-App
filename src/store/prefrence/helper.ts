import { cornieClient } from "@/plugins/http";
import IPrefrence from "@/types/IPrefrence";

export async function fetchPrefrences() {
    try {
        const response = await cornieClient().get(
            "/api/v1/prefrences/findForUser/me"
        )

        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as IPrefrence[]
}


