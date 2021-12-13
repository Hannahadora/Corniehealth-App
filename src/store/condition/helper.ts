import { cornieClient } from "@/plugins/http"

export async function fetchPatientConditions(patientId: string) {
    try {
        const { data } = await cornieClient().get(
            `/api/v1/condition/patient/${patientId}`
        )
        return data
    } catch (error) {
        window.notify({
            status: "error",
            msg: "Failed to fetch patient conditions",
        })
        return []
    }
}
