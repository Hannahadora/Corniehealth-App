import { cornieClient } from "@/plugins/http"
import IImpression from "@/types/IImpression"

export async function fetchImpressions(patientId: string) {
    try {
        const response = await cornieClient().get(
            `/api/v1/clinical-impressions/findAllByPatient/${patientId}`
        )
        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as IImpression[]
}

export async function deleteImpression(id: string) {
    try {
        const response = await cornieClient().delete(
            `/api/v1/clinical-impressions/${id}`
        )
        if (response.success) {
            return true
        }
    } catch (error) {
        return false
    }
    return false
}
