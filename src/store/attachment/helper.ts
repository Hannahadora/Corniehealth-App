import { cornieClient } from "@/plugins/http"
import IAttachment from "@/types/IAttachment"

export async function fetchAttachment(patientId: string) {
    try {
        const response = await cornieClient().get(
            `/api/v1/attachment/patient/${patientId}`
        )
        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as IAttachment[]
}
