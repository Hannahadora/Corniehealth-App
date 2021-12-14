import { cornieClient } from "@/plugins/http"
import IPracticeInformation from "@/types/IPracticeInformation"

export async function fetchPracticeInformation() {
    try {
        const response = await cornieClient().get("/api/v1/practice-information")
        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as IPracticeInformation[]
}

export async function fetchPracticeHour() {
    try {
        alert("helloworld")
        const response = await cornieClient().get("/api/v1/practice-hour")
        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    // return [] as IPracticeInformation[];
}
