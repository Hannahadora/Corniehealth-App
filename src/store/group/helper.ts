import { cornieClient } from "@/plugins/http"
import IGroup from "@/types/IGroup"

export async function fetchGroups() {
    try {
        const response = await cornieClient().get("/api/v1/group")
        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as IGroup[]
}

export async function deleteGroup(id: string) {
    try {
        const response = await cornieClient().delete(`/api/v1/group/${id}`)
        if (response.success) {
            return true
        }
    } catch (error) {
        return false
    }
    return false
}
